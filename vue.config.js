module.exports = {
    // 基本路径
    publicPath: "/views/default",

    // 输出文件目录
    outputDir: "server/views/default",

    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'TRY-VUE主页',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // 配置js、css等文件夹的二级目录位置，不设置则会在dist下生成4个文件夹
    //assetsDir: "static",

    // use the full build with in-browser compiler?

    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: true,

    // webpack配置

    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},

    configureWebpack: () => {},

    // vue-loader 配置项

    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},

    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,

        // 开启 CSS source maps?
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {},

        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },

    // use thread-loader for babel & TS in production build

    // enabled by default if the machine has more than 1 cores
    parallel: require("os").cpus().length > 1,
};