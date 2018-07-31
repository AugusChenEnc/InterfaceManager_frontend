<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-row class="au-sidebar">
            <el-row class="au-logo" :style="{ 'background-color': primaryColor }">
                <img src="~assets/images/social_logo_32.ico" alt="element-logo" class="au-header-logo-shrink" v-show="logoShow"/>
                <span v-show="!logoShow"><img src="~assets/images/social_logo.ico" alt="element-logo" class="au-header-logo"/> Augus </span>
            </el-row>
            <sidebar :list="$router.options.routes[0].children" :isCollapse="isCollapse" :primaryColor="primaryColor"></sidebar>
        </el-row>

        <!-- 正文部分 -->
        <el-container>
            <!-- 头部 -->
            <el-header height="60px" :style="{ 'background-color': primaryColor }">
                <div class="menu-collapse"  @click.prevent="collapse"><i :class="shrinkIcon"></i></div>
                <breadcrumb></breadcrumb>
                <div class="au-userinfo">
                    <el-dropdown trigger="hover">
                        <span class="au-userinfo-inner"><img src="~assets/images/timg.jpg"/> Augus </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>{{$t('portrait.message')}}</el-dropdown-item>
                            <el-dropdown-item>{{$t('portrait.setting')}}</el-dropdown-item>
                            <el-dropdown-item @click.native="switcherTheme">{{$t('portrait.switchTheme')}}</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">{{$t('portrait.logOut')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>  
            </el-header>

            <el-main>
                <Tags></Tags>
                <!-- transition 可以set过渡动画效果（等待研究） -->
                <el-scrollbar class="home-content-scrollbar">
                    <div class="home-content">
                        <transition>
                          <router-view></router-view>
                        </transition>
                    </div>
                </el-scrollbar>
            </el-main>
        </el-container>

        <!-- 换肤弹窗 -->
        <el-dialog title="更改主题颜色" :visible.sync="dialogVisible" >
              <el-form class="small-space" label-position="left" label-width="150px" style='width: 50px; margin-left:50px;'>
                <el-form-item label="请选择主题颜色：">
                   <el-radio-group v-model="themeValue">
                        <el-radio label="2A598B">蓝色</el-radio>
                        <el-radio label="E48731">橙色</el-radio>
                        <el-radio label="78235B">紫色</el-radio>
                        <el-radio label="E150DF">粉色</el-radio>
                   </el-radio-group>
                 </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="handleChangeTheme">确 定</el-button>
              </div>
        </el-dialog>
    </el-container>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb'
import Tags from '@/components/Tags'
import { global } from '@/config/global'

export default {
    name: 'home',
    data() {
        return {
            dialogVisible: false,
            isCollapse: false,
            logoShow: false,
            shrinkIcon: 'fa fa-align-justify fa-2x',
            primaryColor: localStorage.themeValue? '#'+ localStorage.themeValue : '#2A598B',
            themeValue: localStorage.themeValue ? localStorage.themeValue : '2A598B',
        }
    },
    components: { Sidebar , Breadcrumb, Tags},
    methods: {
        //折叠导航栏
        collapse:function(){
            const _self = this;
            _self.isCollapse = !_self.isCollapse;
            // 是否关闭  true关闭  false 打开
            if (_self.isCollapse) {
                _self.shrinkIcon = 'fa fa-align-justify fa-2x fa-rotate-90'
                _self.logoShow = _self.isCollapse
            } else {
                _self.shrinkIcon = 'fa fa-align-justify fa-2x'
                setTimeout(function (){
                    _self.logoShow = _self.isCollapse
                }, 200);
            }
        },
        //换肤
        handleChangeTheme(){
            global.changeTheme(this.themeValue);
            this.primaryColor = '#' + this.themeValue;
            this.dialogVisible = false;
        },
        switcherTheme(){
            this.dialogVisible = true;
        },
        logout(){
            this.$router.push({ path: '/login'})
        }
    }
}
</script>

<style lang="stylus">
    .breadcrumb-comp
        float left
        margin 2rem 0
    .el-scrollbar__wrap
        overflow-x: hidden;
</style>

<style scoped lang="stylus" >
.el-header
    padding 0 
    color #fff
    .au-userinfo
        height 6rem
        line-height 6rem
        padding-right 4rem
        float right
        .au-userinfo-inner
            cursor pointer
            color #fff
            img
                width 4rem
                height 4rem
                border-radius: 2rem
                margin 1rem 0 1rem 1rem
                float right
    .menu-collapse
        width 1.4rem
        height 6re
        line-height 6rem
        padding 0 2.4rem
        cursor pointer
        float left
        border-left 0.1rem solid #fff
.el-main
    padding 0
.el-radio-group
    width 30rem
.home-content-scrollbar
    height calc(100vh - 10rem) 
.home-content
    width 98%
    margin 2rem auto
    font-size 1.4rem

.au-sidebar
    border-right: solid 1px #c5c9caf2;
.au-logo
    height 6rem
    font-size 2.5rem
    .au-header-logo
        margin 1.5rem 2rem 1.5rem 4rem
        vertical-align middle
    .au-header-logo-shrink
        margin 2rem 1.5rem
</style>