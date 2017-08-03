var Vue = require('./node_modules/vue/dist/vue.js');
var App = require('./app.vue');

Vue.component('my-app', require('./app.vue'));
Vue.component('my-app2', require('./app2.vue'));

new Vue({
  el: '#app',
  data: {
  }
})