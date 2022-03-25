// postcss.config.js
module.exports = {
  // 配置需要使用的postcss插件
  plugins: {
    // 配置postcss-pxtorem插件 把px转化为rem
    'postcss-pxtorem': {
      // rootValue应该设置为设计稿的十分之一
      // 但是vant是根据37.5设置的，所以必须设置为37.5
      // 问题：设计稿宽度为750，van是根据37.5设置，俩者怎么动态设置兼容
      // 通过查看文档可以发现rootValue有俩种方式
      // 1.number 2.function
      // 解决方法：function
      // postCSS处理每个css文件都会来调用这个函数
      // 通过结构赋值直接获取file(css文件的具体位置 字符串类型)
      // 判断是不是vant文件 查询字符串是否有vant这个字符，有就返回索引值，没有就返回-1
      rootValue ({ file }) {
        // console.log(file);
        // 因为设计稿是75，vant是37.5，所以设计稿600px，在页面显示的是300，是vant组件库的一半
        return file.indexOf('vant') === -1 ? 75 : 37.5
      },
      // 配置需要转化的css属性
      // "*"表示所有 ['height']
      propList: ['*'],
      // 配置不需要的文件 字符串只能配置一个
      exclude: 'github-markdown'
    }
  }
}
