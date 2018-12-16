import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

import router from '@src/router';

import '@common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.use(VueResource);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
