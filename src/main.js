import Vue from 'vue';
import axios from 'axios';
import router from '@src/router';

import '@src/api/config';
import App from './App.vue';
import '@common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
