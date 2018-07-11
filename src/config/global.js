import themeArray from './themeArray';
import config from '../../config'

export const global = {


	staticPath: process.env.NODE_ENV !== 'development' ?  config.build.assetsSubDirectory: config.dev.assetsSubDirectory,//静态资源路径

	/**
     * 切换主题函数
     */
    changeTheme:function(themeValue){

        var that = this;
        //需要移到单独的文件存放
        var cssArray = themeArray;

        for (let i = 0 ,len = cssArray.length; i < len; i++) {

            //进行装换   
            const cssName = cssArray[i].replace(/[A-Z]/g, "-$&").substring(1);
            var itemPath = that.staticPath + '/theme/' + themeValue + '/' + cssName.toLowerCase() + '.css';
            
            loadCss(itemPath)
        };
        
        localStorage.themeValue = themeValue

        function loadCss(path){
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
                link.href = path;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                head.appendChild(link);
          
        }
    }	
}