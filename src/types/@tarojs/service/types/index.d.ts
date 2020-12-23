export interface IPaths {
  /**
   * 当前命令执行的目录，如果是 build 命令则为当前项目路径
   */
  appPath: string
  /**
   * 当前项目配置目录，如果 init 命令，则没有此路径
   */
  configPath: string
  /**
   * 当前项目源码路径
   */
  sourcePath: string
  /**
   * 当前项目输出代码路径
   */
  outputPath: string
  /**
   * 当前项目所用的 node_modules 路径
   */
  nodeModulesPath: string
}

export declare interface IPluginContext {
  /**
   * 包含当前执行命令的相关路径集合
   */
  paths: IPaths
  /**
   * 获取当前执行命令所带的参数
   */
  runOpts: Object
  /**
   * 向 ctx 上挂载一个方法可供其他插件直接调用
   */
  registerMethod: (arg: (string | { name: string, fn?: Function }), fn?: Function) => void,
  /**
   * 编译开始
   */
  onBuildStart: (fn: Function) => void
  /**
   * 编译结束
   */
  onBuildFinish: (fn: Function) => void
  /**
   * 编译中修改 webpack 配置，在这个钩子中，你可以对 webpackChain 作出想要的调整，等同于配置 [`webpackChain`](./config-detail.md#miniwebpackchain)
   */
  modifyWebpackChain: (fn: (args: { chain: any }) => void) => void
  /**
   * 修改编译后的结果
   */
  modifyBuildAssets: (fn: (args: { assets: any }) => void) => void
  /**
   * 修改编译过程中的中间文件，例如修改 app 或页面的 config 配置
   */
  modifyBuildTempFileContent: (fn: (args: { tempFiles: any }) => void) => void

  [key: string]: any
}
