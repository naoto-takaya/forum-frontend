<template>
  <div class="reply">
    <v-form id="reply-form" @submit.prevent="submitReply">
      <div class="content">
        <v-textarea name="input-7-1" hint="Hint text" class="text-field" v-model="content"></v-textarea>
      </div>
      <div class="image">
        <v-file-input id="file-input"  label="画像を添付" accept="image/*" @change="postRekognition"></v-file-input>
      </div>
      <div class="under-area">
        <div class="underline"></div>
        <v-btn
          depressed
          id="submit-button"
          color="primary"
          type="submit"
          class="button"
          :disabled="!activeSubmit"
        >送信
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
  export default {
    name: "Reply",
    data: () => ({
      content: "",
      preview: '',
      imageUploading: false,
    }),
    props: {
      response: {
        type: Object
      },
      forum:{
        type:Object
      }
    },
    computed: {
      activeSubmit() {
        const content_string = this.content.trim();
        return content_string.length > 0;
      },
      responseId(){
        return this.response ? this.response.id: null;
      }
    },
    methods: {
      submitReply: async function () {
        this.$emit("replied");
        await this.axios
          .post("/responses",
            {content: this.content, forum_id: this.forum.id, response_id: this.responseId})
          .then(response => {
            this.responses = response.data;
          });
        this.content = "";
        this.$emit("responded");
      },


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
          .post("/responses/rekognition", formData, config)
          .then(response => {
            this.level = response.data.level
          }).catch(e => {
            this.leve = null
          });
        this.imageUploading = false;
      },
    }
  };
</script>
<style scoped>
  .reply {
    margin: 1rem;
    border: 0.08rem solid grey;
    border-radius: 0.4rem;
    width: 100%;
    overflow: hidden;
  }

  .reply .content {
    margin: 1.5rem;
  }

  .reply .under-area {
    background-color: #efebeb;
    text-align: right;
  }

  .reply .under-area .button {
    margin-bottom: 0.4rem;
    margin-right: 0.4rem;
  }

  .reply .underline {
    border-top: 0.05rem solid grey;
    margin-bottom: 0.4rem;
  }

  .text-field {
  }
</style>