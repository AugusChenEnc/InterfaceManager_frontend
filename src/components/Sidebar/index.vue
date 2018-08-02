<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu 
            :default-active="$route.meta.title" 
            :collapse="isCollapse" 
            class="el-menu-vertical" 
            show-timeout="300" 
            hide-timeout="300">
            
            <sidebar-item :list="list" :basepaths="basepaths" :class="{'au-menu-wrapper': isCollapse}" class="au-sidebar-item"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
import SidebarItem from './SubmenuItem.vue'

export default {
    name: 'sidebar',
    data() {
        return {
            basepaths: "/"
        }
    },
    components: { SidebarItem },
    props: {
        list: {
            type: Array,
            required: true
        },
        isCollapse: {
            type: Boolean,
            required: true
        },
        primaryColor: {
            type: String
        }
    }
    
}
</script>

<style scoped lang="stylus">
    .el-menu
        border 0
    .el-menu-vertical
        height calc(100vh - 4.6rem)
    .el-menu-vertical:not(.el-menu--collapse)
        width: 25rem;
        min-height: 40rem;
    .au-sidebar-item
        margin-bottom 2rem;
</style>