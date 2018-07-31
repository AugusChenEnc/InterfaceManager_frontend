<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="rule-form">
            <h3 class="title">{{$t('login.title')}}</h3>
            <lang-select class="lang-select"></lang-select>

            <el-form-item prop="account">
              <el-input type="text" v-model="loginForm.account" auto-complete="off" :placeholder="$t('login.username')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" auto-complete="off" :placeholder="$t('login.password')"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">{{$t('login.rememberThePwd')}}</el-checkbox>

            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click.native.prevent="loginSubmit" :loading="logining">{{$t('login.logIn')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import { fetchPost } from '@/utils/api'

export default {
    name: 'login',
    components: { LangSelect },
    data() {
        return {
            logining: false,
            loginForm: {
              account: 'admin',
              password: '123456'
            },
            rules2: {
              account: [{ required: true, message: this.$t('login.enterUsername'), trigger: 'blur' }],
              password: [{ required: true, message: this.$t('login.enterPassword') , trigger: 'blur' }]
            },
            checked: true,
            thmemOptions: [{
              value: '2A598B',
              label: '蓝色'
            }, {
              value: 'E48731',
              label: '橙色'
            }, {
              value: '78235B',
              label: '紫色'
            }, {
              value: 'E150DF',
              label: '粉色'
            }],
            thmem: localStorage.themeValue? localStorage.themeValue : '2A598B'
        }
    },
    methods: {
        loginSubmit() {
            var _this = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    fetchPost({
                        url: '/login',
                        params: this.loginForm
                    }).then(response => {
                        this.logining = false;
                        const { meta, data } = response;
                        let dataJson = JSON.parse(data);
                        localStorage.token = dataJson.token;
                        
                        this.$router.push({ path: '/' });
                    }).catch(error => {
                        this.$message.error('登录失败，请检查账号密码');
                        console.log(error)
                    })
                } else {
                   this.$message.error('请正确填写账号密码');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped lang="stylus">
    .login-container 
        width 100%
        height 100%
        background url('~assets/images/login_background.jpg') no-repeat
        background-size cover
        overflow hidden
    .rule-form 
        border-radius(5px)
        background-clip padding-box
        margin 18rem auto
        width 35rem
        padding 3.5rem 3.5rem 1.5rem 3.5rem
        background #fff
        border 0.1rem solid #eaeaea
        box-shadow 0 0 2.5rem #cac6c6
        .title 
            font-size 2rem
            margin 0 auto 4rem auto
            text-align center
            color #505458
    h3
        width 92%
        float left
</style>