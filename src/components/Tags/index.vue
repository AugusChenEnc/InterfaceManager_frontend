<template>
    <div class="tags-comp">
        <router-link v-for="tag in visitedViews" :to="tag.path" :key="tag.path">
            <el-tag size="medium" closable @close="handleClose(tag,$event)" :class="{'au-highlight': tag.title === highlightTitle}"> {{ $t(tag.title) }} </el-tag>
        </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'tags',
    data() {
        return {
            highlightTitle: this.$route.meta.title
        }
    },
    created() {
        this.addTagViews()
    },
    computed: {
        ...mapGetters(['visitedViews'])
    },
    watch: {
        $route() {
          this.addTagViews()
        }
    },
    methods: {
        addTagViews(){
            let _route = this.$route;

            if (!_route.name){
                return false
            }
            if (_route.meta.bthidden) {
                _route = _route.matched[_route.matched.length-2]
            }
            this.$store.dispatch('addVisitedViews', _route)
            this.highlightTitle = _route.meta.title;
        },
        handleClose(tag,$event) {
            $event.preventDefault()
            this.$store.dispatch('delVisitedViews', tag).then((views) => {
                if (tag.path === this.$route.path) {
                    const latestView = views.slice(-1)[0]
                    if (latestView) {
                        this.$router.push(latestView.path)
                    } else {
                        this.$router.push('/')
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="stylus">
  .tags-comp
    box-shadow 0 3px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04)
    height 38px
    overflow hidden
    .el-tag
        margin 5px 3px
  .button-new-tag
    margin-left: 10px;
    height: 28px;
    line-height: 26px;
    padding-top: 0;
    padding-bottom: 0;
  .input-new-tag
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  .au-highlight
    background-color #EF741C
</style>