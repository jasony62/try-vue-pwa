<template>
  <div id="app">
    <h1>这个是应用的框架</h1>
    <div>
      <h2>全局操作</h2>
      <div>
        <button>不需要等待状态数据的全局操作</button>
        <button disabled>需要等待状态数据的全局操作</button>
      </div>
    </div>
    <div>
      <h2>业务数据</h2>
      <div id="content"></div>
    </div>
    <div>
      <h2>业务数据（按需加载模板）</h2>
      <div id="content2"></div>
    </div>
    <div>
      <h2>业务数据（后端生成模版）</h2>
      <div id="content3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
