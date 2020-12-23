import {IPluginContext} from '../src/types/@tarojs/service/types'
import plugin from '../src/index';
import { CopyComponent } from '../src/types/CopyComponent'
import { getRootPath } from '../src/FileUtil'
let ctx:IPluginContext = {
    paths:{
        sourcePath:getRootPath("../demoDist"),
        appPath:"",
        configPath:"",
        outputPath:"",
        nodeModulesPath:""
    },
    runOpts:{
        componentsPath:getRootPath("../demo")
    },
    initialConfig:{},
    register:()=>{},
    registerCommand:()=>{},
    registerMethod:()=>{},
    registerPlatform:()=>{},
    addPluginOptsSchema:()=>{},
    onBuildStart:(fn:Function)=>{fn.apply(this)},
    onBuildFinish:()=>{},
    modifyBuildAssets:()=>{},
    modifyBuildTempFileContent:()=>{},
    modifyWebpackChain:()=>{},
}

test('copyComponent',()=>{
    plugin(ctx,<CopyComponent.Option>ctx.runOpts)
    expect(true).toEqual(true)
})