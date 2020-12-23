export namespace CopyComponent {

    /**
     * 复制组件参数
     */
    export interface Option {

        /**
         * 源组件路径
         */
        componentsPath: string
    }

    /**
     * 组件配置
     */
    export interface ComponentConfig{

        /**
         * 源路径
         */
        from:string

        /**
         * 目标路径
         */
        to:string
    }
}