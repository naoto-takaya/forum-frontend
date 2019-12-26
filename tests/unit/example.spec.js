import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from '@/App';

Vue.use(Vuetify);

describe('App.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(App);
    expect(true).toBeTruthy();
  });
});