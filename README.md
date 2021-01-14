# taro-plugin-copy-component

> Taro复制组件插件

## 安装

在 Taro 项目根目录下安装

```bash
yarn add taro-plugin-copy-component -D
# OR
$ npm install taro-plugin-copy-component --save
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro 2/3 的最新版本。

修改项目 `config/index.js` 中的 plugins 配置为如下

```js
const config = {
  ...
  plugins: [
    ['taro-plugin-copy-component', {
      componentsPath: path.resolve(__dirname, '../node_modules/taro-yui-vue/src/components')
    }]
  ]
  ...
}
```

### 参数

copy-component 插件可以接受如下参数：

```typescript
/**
 * 复制组件参数
 */
export interface Option {

    /**
     * 源组件路径
     */
    componentsPath: string
}
```
### 使用方法

在需要复制的目录新增 `components.json` 文件，文件格式如下：

```typescript
/**
 * 组件配置
 */
export interface ComponentConfig{

    /**
     * 源路径
     */
    from:string

    /**
     * 目标路径，相对于components.json文件的路径
     */
    to:string
}
```

例：

```json
[
	{
		"from": "/componentA",
		"to": "/components"
	},
	{
		"from": "/componentB",
		"to": "/components"
	}
]
```

这样在 `taro build` 编译完后就会将 Option.componentsPath 目录下的组件，根据配置复制到 `components.json` 下的目录。