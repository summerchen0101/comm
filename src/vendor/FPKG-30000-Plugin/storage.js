import Vue from 'vue';
import storage from 'store2'
Object.defineProperty(Vue.prototype, '$storage', { value: storage });
