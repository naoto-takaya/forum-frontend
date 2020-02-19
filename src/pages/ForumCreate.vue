<template>
  <div>
    <v-card color="white" class="forum-card">
      <h1>フォーラムを新しく作成する</h1>
      <div class="forum-content">
        <v-form @submit.prevent="submitForum" ref="form">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            counter="50"
            label="フォーラムタイトル"
            outlined
            autocomplete="off"
            class="form-title"
          ></v-text-field>

          <div class="image">
            <v-file-input id="file-input" label="画像を添付" accept="image/*" @change="postRekognition"></v-file-input>
          </div>
          <p class="image-description">添付される画像はAIによって解析されます。<br>
            投稿に相応しくないと判断された場合、画像は投稿できません。
          </p>
          <div class="image-upload">
            <v-img
              :src="preview"
              aspect-ratio="1"
              class="preview"
              v-if="preview"
            >
              <div v-show="imageUploading">
                <v-progress-circular indeterminate loading></v-progress-circular>
                <span class="upload-text">画像を解析中です...</span>
              </div>
            </v-img>
            <p class="level-result">{{levelResult}}</p>
            <div class="form-post">
              <v-btn
                depressed
                color="primary"
                type="submit"
                :disabled="disableSubmit"
                width="150"
              >投稿
              </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>
<script>
  export default {
    name: "ForumCreate",
    data: () => ({
      title: "",
      level: null,
      preview: '',
      levelResult: '',
      imageUploading: false,
      titleRules: [
        v => !!v.trim() || "タイトルは必須です",
        v => v.length <= 50 || "タイトルは50文字以下にしてください"
      ],
      disableSubmit: true,
    }),
    mounted() {
      this.axios.delete("/rekognition");
    },
    updated() {
      this.disableSubmit = !(this.$refs.form.validate() && !this.imageUploading && this.level !== 0);
    },
    methods: {
      /**
       * フォーラムを投稿する
       * @returns {Promise<void>}
       */
      submitForum: async function () {
        await this.axios
          .post("/forums", {title: this.title})
          .then(response => {
            this.responses = response.data;
          });
        this.content = "";
        //TODO: 画面遷移
        this.$router.push('/');
      },

      /**
       * Rekognitionで画像解析を行う
       * @param file
       * @returns {Promise<void>}
       */
      postRekognition: async function (file) {
        // 画像の削除処理を呼び出す
        if (file == null) {
          // imageを削除するAPIにアクセス
          this.axios.delete("/rekognition");
          this.levelResult = '';
          this.preview = '';
          this.level = null;
          return
        }

        // プレビュー画像の作成
        this.imageUploading = true;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.preview = event.target.result;
          document.getElementById("file-input").files = event.target.result;
        };
        reader.readAsDataURL(file);

        // サーバーサイド処理の呼び出し
        const formData = new FormData();
        formData.append('image', file);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        await this.axios
          .post("/forums/rekognition", formData, config)
          .then(response => {
            this.level = response.data.level
          }).catch(e => {
            this.leve = null
          });

        switch (true) {
          case this.level == null:
            this.levelResult = '画像解析に失敗しました。時間をおいてお試しいただくか別の画像を使用してください';
            break;
          case this.level === 0:
            this.levelResult = 'この画像はセンシティブな内容を含んでいるため、投稿できません';
            break;
          default:
            this.levelResult = '解析が完了しました。投稿可能です。';
            break;
        }
        this.imageUploading = false;
      },
    }
  };
</script>
<style scoped>
  h1 {
    font-size: 1.5rem;
    color: #455a64;
  }

  .image-description {
    font-size: 0.8rem;
    color: #90a4ae;
  }

  .image-upload {
    color: #eceff1;
    margin: 0 auto;
  }

  .upload-text {
    color: #eceff1;
    font-size: small;
  }

  .preview {
    border: 0.08rem solid grey;
    width: 10rem;
    height: 10rem;
    margin: 0 auto;
    background-color: #00acc1;
  }

  .form-post {
    text-align: center;
  }

  .form-title {
    height: 4rem;
    margin: 2rem 0;
  }

  .level-result {
    color: #ef5350;
    text-align: center;
    margin: 2rem auto;
  }

  .forum-card {
    padding: 2rem 3rem 3rem;
  }


</style>