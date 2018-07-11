# InterfaceManager_frontend

## 项目描述
>&nbsp;&nbsp;&nbsp;&nbsp;这个项目主要是用管理项目接口，在目前前后端分离的项目开始越来越多， 我们需要有一个平台去让程序员管理项目的接口。也让前端可以方便的进行接口查询，进行对接。


## 路由命名规则

``` 
    path            -- 访问地址
    name            -- 路由名称
    component       -- 访问加载模块（如果是加载子模块内容可以写为 
                    -- { template: '<router-view></router-view>' } )
    hidden          -- 设定路由是否在Sidebar中渲染(既侧边栏)true是不渲染,false反之
    meta            -- 设定参数
        bthidden    -- 设定是否在 Breadcrumb 和 Tags 中隐藏  true: true, false:否
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
    hidden: true,
    component:{ template: '<router-view></router-view>' },
    meta: { bthidden: true, title: 'menu.appointment', icon: 'fa fa-car' },
    children:[{
    	path: 'Tabs',
        name: 'Tabs',
        component: Tabs,
        meta: { title: 'menu.localCar' }
     }]
```

