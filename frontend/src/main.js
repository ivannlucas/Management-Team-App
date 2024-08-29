import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMq from 'vue-mq'
import $ from "jquery";


import PrimeVue from 'primevue/config';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Knob from 'primevue/knob';
import Toast from 'primevue/toast';
import CascadeSelect from 'primevue/cascadeselect';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import ScrollPanel from 'primevue/scrollpanel';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';
import TabMenu from 'primevue/tabmenu';
import MegaMenu from 'primevue/megamenu';

import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"                           //icons

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/es';
import 'dayjs/locale/es';
import { BootstrapVue, IconsPlugin } from  'bootstrap-vue'

 
import  'bootstrap/dist/css/bootstrap.css' 
import  'bootstrap-vue/dist/bootstrap-vue.css'

/* JQUERY */
window.$ = $

/* PrimeVue */
Vue.use(PrimeVue);
Vue.use(ElementUI, { locale });

Vue.component('Button',Button);
Vue.component('DataTable',DataTable);
Vue.component('Column',Column);
Vue.component('Calendar',Calendar);
Vue.component('InputText',InputText);
Vue.component('Card',Card);
Vue.component('Accordion',Accordion);
Vue.component('AccordionTab',AccordionTab);
Vue.component('InputNumber',InputNumber);
Vue.component('Slider',Slider)
Vue.component('DataView',DataView)
Vue.component('DataViewLayoutOptions',DataViewLayoutOptions)
Vue.component('Knob',Knob)
Vue.component('Toast',Toast)
Vue.component('CascadeSelect',CascadeSelect)
Vue.component('Dialog',Dialog)
Vue.component('ProgressSpinner',ProgressSpinner)
Vue.component('Avatar',Avatar)
Vue.component('Badge',Badge)
Vue.component('ScrollPanel',ScrollPanel)
Vue.component('Textarea',Textarea)
Vue.directive('tooltip', Tooltip);
Vue.component('TabMenu',TabMenu)
Vue.component('MegaMenu',MegaMenu)


// Haz que BootstrapVue esté disponible en todo tu proyecto
Vue.use(BootstrapVue)
// Opcionalmente, instale el complemento de componentes de iconos de BootstrapVue 
Vue.use (IconsPlugin)

Vue.use(VueMq,{
  breakpoints: { mobile: 600, tablet: 1200, desktop: Infinity}
  //breakpoints: { mobile: 0, tablet: 500, desktop: 1200}
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
