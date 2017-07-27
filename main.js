var Vue = require('./node_modules/vue/dist/vue.js');
var App = require('./app.vue');

Vue.component('my-app', require('./app.vue'));

new Vue({
  el: '#app',
  data: {
  }
})