<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div>
      <i class="fa fa-globe fa-2x" aria-hidden="true"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">简体中文</el-dropdown-item>
      <el-dropdown-item command="ft" :disabled="language==='ft'">繁体中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      language: localStorage.lang || 'ft'
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.lang = lang
      this.language = lang
      this.$message({
        message: this.$t('switchsuccess'),
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.international-icon 
  font-size 30px
  cursor pointer
  vertical-align -5px!important
</style>


