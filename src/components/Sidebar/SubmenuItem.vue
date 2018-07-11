<template>
    <div class="au-submenu-item">
        <template v-for="(item,index) in list" v-if="!item.hidden">
            <template v-if="typeof(item.children) != 'undefined' && checkChildren(item.children)">
                <el-submenu :index="basepaths + item.path">
                    <template slot="title">
                        <i :class="item.meta.icon"></i>
                        <span slot="title"> {{$t(item.meta.title)}} </span>
                    </template>
                    <submenu-item :list="item.children" :basepaths="basepaths + item.path + '/'"></submenu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="basepaths + item.path" v-if="!item.hidden" @click="$router.push(basepaths + item.path)">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{$t(item.meta.title)}}</span>
                </el-menu-item>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'SubmenuItem',
    props: {
        list: {
            type: Array,
            required: true
        },
        basepaths:{
            type: String,
            required: true
        }
    },
    methods: {
        checkChildren(props){
            let itemArray = props.filter(item => item.hidden != true);
            return itemArray.length >= 1
        }
    }
}
</script>

<style scoped lang="stylus">
    .fa
        margin-right 5px
        width 24px
        text-align center
        font-size 18px
        vertical-align middle
</style>