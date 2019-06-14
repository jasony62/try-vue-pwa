# 目标
为了给用户提供最好的交互体验，可以把一个页面的完整加载过程分为几个用户可感知的阶段。每个加载阶段都应该控制在一定时间内，目标为小于1000毫秒。每个阶段的加载过程应该可视化，能够让用户感知到加载正在进行，而不是已经停止运行。设计加载阶段时应该允许用户尽早进行期望的操作，操作应该的状态变化需要和加载阶段相匹配，例如：更新按钮的状态。图片、音频、视频等资源应该后加载，特别是不在用户可见范围的资源，不应该一次性加载。总之，就是应该通过合理的设计，尽量减少用户的等待时间，尽快给用户响应，尽快允许用户进行操作。

# 加载阶段
## 阶段1，打开AppShell
AppShell是支持用户界面所需的最小的HTML、CSS和JavaScript，如果离线缓存，可确保在用户重复访问时提供即时、可靠的良好性能。这意味着并不是每次用户访问时都要从网络加载AppShell。只需要从网络中加载必要a的内容。它是UI的主干以及让应用成功起步所需的核心组件，但不包含业务数据。

AppShell应该已经包含用户最直接的，不依赖业务数据的操作，例如：导航到其他页面，或者指定优先加载的数据。

## 阶段2，加载控制操作状态数据
从后台获取为满足用户进行操作所需的状态数据，基于这些数据改变操作的状态，例如：需要根据用户的权限控制的操作。

这个阶段是可选的，也可以再细分为多个阶段。

## 阶段3，加载用户浏览数据
从后台获取业务数据，并展现。如果业务数据较多，应该支持分页加载。

这个阶段可以分为多个阶段完成，例如先加载主要业务数据，再加载辅助数据等。

## 阶段4，加载媒体数据
对于业务数据中包含的图片、声音、视频等媒体数据应该作为一个独立的阶段进行加载，并且原则上只有在用户可以范围内才进行加载（特别是当数据较大时）。

这些数据的加载不应该阻碍用户进行已经可以进行的业务操作。

## 阶段5，加载不可见数据
有些数据并不是用户直接可见的，例如：折叠起来的菜单。这类数据的加载过程应该对用户隐藏，但是如果用户需要这些隐藏数据，应用应该支持立即加载。

# 实现方案
基本思路

1. 将每个客户端都需要执行的，而且返回结果固定的操作在服务端提前完成。

2. 在前端或后端进行适当的缓存，减少网络或数据库重复访问。

3. 减小资源尺寸。

4. 将加载过程可视化，给用户提供友好的反馈，降低用户的等待焦虑。

## 动态加载组件
如果把加载过程分为了多个独立的阶段，那么每个阶段都是可以完独立的吗？

## 服务端渲染
按照服务端的逻辑提前生成好页面。
将前端所有需要重复的逻辑在后端进行1次性处理，减少前端不必要的逻辑。
解决AppShell的首次打开。

## 服务端缓存
缓存重复获取的数据，减少数据库访问次数。

## 本地缓存与预加载
利用ServiceWorker实现资源的缓存和预加载。

## 按需加载图片
默认情况下，图片应该在可见范围内才进行加载。

加载图片时应该根据用户终端的情况自动加载尺寸匹配的图片，既减少网络加载时间也减少客户端的压力。服务端应该预先准备好图片的几个尺寸的版本。

## 减小CSS和JS的大小
页面通常会引用库文件，但是只是需要其中的一部分，这样会导致加载了无用的内容，特别是在AppShell页。

一些组件库通过webpack已经支持按需引用和后编译，可以解决这个问题。

参考：

[https://github.com/DDFE/DDFE-blog/issues/23](https://github.com/DDFE/DDFE-blog/issues/23)

[cube-ui](https://didi.github.io/cube-ui/#/zh-CN)

## 加载过程可视化
加载阶段，加载中，加载成功的用户感知。














# 演示功能
1. 打开AppShell。

2. 获得操作状态数据，更新页面操作。

3. 获得用户浏览数据，更新页面内容。
更新页面有3中方式，1、组件打包进AppShell，只是获取业务数据后更新状态；2、组件单独打包，AppShell中根据业务逻辑运行时加载响应的组件；3、组件不打包，后台返回组件的数据，AppShell中创建组件。

## 内嵌组件

AppShell打包时已经包含了组件。

```
import Content from './components/Content.vue';
...
new Vue({
    render: function (createElement) {
    return createElement(Content);
    }
}).$mount('#content');
```

## 按需加载已打包组件

AppShell中不包含内容组件，根据业务需求选择加载指定的组件。这类组件在构建阶段会单独打包。

```
const asyncComp = Vue.component('ContentAsync', () => import('./components/ContentAsync'));
new Vue({
    render: function (createElement) {
    return createElement(asyncComp);
    }
}).$mount('#content2');
```

## 动态生成组件

AppShell中不包含内容组件，根据业务需求后端直接返回模版内容。需要将vue.config.js中runtimeCompiler设置为true。会导致打包文件变大28k左右。

```
Backend.getComponent().then(function (rsp) {
    const backComp = Vue.component('ContentBack', {
        template: rsp.data.data.template
    });
    new Vue({
        render: function (createElement) {
        return createElement(backComp);
        }
    }).$mount('#content3');
});
```

4. 加载页面中的图片。

# 目录和代码
src目录放VUE代码。

src/apis目录放调用后台api的代码。

src/utils目录放业务逻辑工具代码。

src/assets目录放静态资源，例如：图片，公共的CSS。

server目录是项目的发布代码，放PHP代码和VUE的发布代码。

server/views/defaul目录放VUE的发布代码（在vue.config.js中指定了build位置）。

main.js是应用的起始位置。

App.vue是应用框架，只包含启动应用的最小化代码。

# 性能分析
空的页面大概90k。

加上axios大概112k。

打开runtimeCompiler，140k。