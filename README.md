# recp_car_frontend

[TOC]


## 项目描述
> Reception car distribution system

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 路由命名规则

``` bash
	path            -- 访问地址
    name            -- 路由名称
    component       -- 访问加载模块（如果是加载子模块内容可以写为 { template: '<router-view></router-view>' } )
    meta            -- 设定参数
    	title       -- 导航标题
        icon        -- 导航图标
    children        -- 子路由
    	path        -- 子路由地址
        name        -- 子路由名称
        component   -- 子路由访问加载模块
        meta        -- 设定参数

	示例：
	path: 'yuyue',
    name: 'Yuyue',
    component:{ template: '<router-view></router-view>' },
    meta: { title: 'menu.appointment', icon: 'fa fa-car' },
    children:[{
    	path: 'Tabs',
        name: 'Tabs',
        component: Tabs,
        meta: { title: 'menu.localCar' }
     }]
```

