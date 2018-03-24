import Vue from 'vue'
import App from './App.vue'
window.moment = require("moment")
window._ = require("underscore")

new Vue({
  el: '#app',
  render: h => h(App)
})
