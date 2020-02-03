# 中品优购

## 项目介绍

移动端H5商城应用的开发。
react技术栈，主要应用 react + redux 。
UI库，依赖antd-mobile。
编码规范，eslint。

### Install 

```shell
npm instal  #安装项目依赖
npm install -g json-server #全局安装json-server 本地数据请求测试服务器
```

### Start

~~~shell
npm run dev #运行开发代码
~~~

### Build

```sh
npm run test  # 打包测试版本
npm run prod  # 打包生产版本
```
## 目录结构
```
   src  ---------------开发源码目录
    ｜———— assets       // 静态资源————样式，图片， 第三方js库
    ｜———— components   // UI组件————项目组件，其他项目也会通用的组件，eg：加载组件，弹窗组件
    ｜———— configs      // 配置————项目参数配置 eg：请求接口api地址
    ｜———— constants    // 常量定义————项目常量定义 eg: 提示语
    ｜———— http         // http请求————统一数据请求封装
    ｜———— redux        // redux相关
    ｜———— utils        // 公共函数
    ｜———— views        // 视图
        ｜———— common   // 页面公用组件
        ｜———— routes   // 页面
    ｜———— index.ejs    // index.html 文件
    ｜———— main.ejs     // 应用入口js文件

目录命名规范: 小写字母 或者 中划线 eg: input, footer-bar
文件命名规范： 首字母大写+驼峰 eg: FooterBar
```


## 代码规范
### css 命名规范

统一格式： 中划线
  命名思想： BEM，eg: block-element-modifier

1. 变量，函数统一格式：驼峰
     eg: bannerRender

### jsx逻辑规范

1. render函数尽量避免处理逻辑，有需要直接写成方法处理；

2. 变量命名统一要ES6语法；

3. 纯组件不要继承BaseComponent

4. 函数与函数之间空一行

5. 使用ES6的class来定义有状态组件：有请求数据时extends BaseComponent；无请求数据时extends React.PureComponent

6. 将state写在构造函数外面

7. 使用箭头函数创建组件内的方法，不需要使用bind绑定回调函数     [参考](https://react.docschina.org/docs/handling-events.html)

8. 使用函数来定义无状态组件

9. 函数功能是否职责单一

10. 函数不存在副作用，是否是纯函数

11. constructor不是必须的，有需要才构建，一旦有constructor，就必须要有super。

    [参考]: https://segmentfault.com/a/1190000008165717

12. react组件生命周期的函数按顺序写在最前面，然后在业务逻辑的代码

### url规范

1. URl结尾不应包含（/）
2. 正斜杠分隔符（/）必须用来指示层级关系
3. 应使用连字符（ - ）来提高URI的可读性
4. 不得在URI中使用下划线（_）
5. URI路径中全都使用小写字母

### 特殊的注释

**TODO: + 说明**：
如果代码中有该标识，说明在标识处有功能代码待编写，待实现的功能在说明中会简略说明。

**FIXME: + 说明**：（下面中的一种情况）

1、如果代码中有该标识，说明标识处代码虽然实现了功能，但是实现的方法有待商榷，希望将来能改进，要改进的地方会在说明中简略说明。

2、如果代码中有该标识，说明标识处代码需要修正，甚至代码是错误的，不能工作，需要修复，如何修正会在说明中简略说明。  




## 依赖库介绍

### prop-types
prop-types: 属性的验证

### react-router-dom
BrowserRouter: 需要服务端配合前端做一些简单的修改，格式：'com/home/xxx'
HashRouter: 根据不同hashType来改变路由，格式：
            hashType: 'slash'     // 默认
            history.push('/home') // window.location.hash = '#/home'

            hashType: 'noslash'   // 去掉首斜杠
            history.push('/home') // window.location.hash = '#home'
    
            hashType: 'hashbang'  // Google's 旧款 AJAX URL 格式
            history.push('/home') // window.location.hash = '#!/home'

### react-router-redux 保持路由与应用状态（state）同步
本库允许你使用React Router库中的api，使用Redux库像平常一样去管理应用的状态state。
本库只是简单的加强了React Router库中history这个实例，以允许将history中接受到的变化反应到stae中去。

### DefinePlugin
new webpack.DefinePlugin(definitions)
允许你创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
比如,你可能会用一个全局的常量来决定 log 在开发模式触发而不是发布模式。这仅仅是 DefinePlugin 提供的便利的一个场景。
```
new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production': 'development')
    }
})
```

### HtmlWebpackPlugin 
https://www.cnblogs.com/wonyun/p/6030090.html
该插件的两个主要作用:
    1. 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
    2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口                  
                
        
                        
                
               
                
                
                
