<template>
	<div class="breadcrumb-comp">
		  <el-breadcrumb class="app-breadcrumb" separator="/">
		    <transition-group name="breadcrumb">
		      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if='item.meta.title'>
            <router-link v-if='index == 0' :to="item.path">{{$t(item.meta.title)}}</router-link>
		        <span v-else>{{$t(item.meta.title)}} </span>
		      </el-breadcrumb-item>
		    </transition-group>
		  </el-breadcrumb>
	</div>
</template>

<script>
export default {
  name: 'breadcrumb',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => !item.meta.bthidden)
      const first = matched[0];
      if (first && first.name !== 'Home') {
        matched = [{ path: 'home', meta: { title: 'menu.home' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>


<style lang="stylus" scoped>
  .app-breadcrumb .el-breadcrumb
    display inline-block
    font-size 1.5rem
    line-height 5rem
    margin-left 1rem
</style>