import Vue from 'vue';
import EventsHub from '../FPKG-60000-EventsHub/EventsHub';

Object.defineProperty(Vue.prototype, '$hub', { value: EventsHub });