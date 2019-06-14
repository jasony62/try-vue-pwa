import Vue from 'vue';
import Backend from './apis/backend.js';
import App from './App.vue';
import Content from './components/Content.vue';

Vue.config.productionTip = false;

new Vue({
  render: function (createElement) {
    return createElement(App);
  },
  mounted: function () {
    // 模板已经挂载到页面上，启动后续加载
    console.log('AppShell加载完成。');
    Backend.getStatus().then(function () {
      console.log('获得操作状态数据');
      Backend.getContent().then(function () {
        console.log('获得用户浏览内容');
        /**
         * 内嵌组件
         */
        new Vue({
          render: function (createElement) {
            return createElement(Content);
          }
        }).$mount('#content');
        /**
         * 实现异步按需加载组件
         */
        const asyncComp = Vue.component('ContentAsync', () => import('./components/ContentAsync'));
        new Vue({
          render: function (createElement) {
            return createElement(asyncComp);
          }
        }).$mount('#content2');
      });
      /**
       * 动态创建组件，组件没有经过打包
       */
      Backend.getComponent().then(function (rsp) {
        console.log('获得后端指定的组件');
        const backComp = Vue.component('ContentBack', {
          template: rsp.data.data.template
        });
        new Vue({
          render: function (createElement) {
            return createElement(backComp);
          }
        }).$mount('#content3');
      });
    });
  }
}).$mount('#app');