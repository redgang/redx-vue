<template>
  <div class="v-docs">
    <c-pane>
      <c-select
        :value.sync="chapter"
        :extra="{options: chapters}"></c-select>
    </c-pane>
    <router-view
      class="router-view"
      transition="slide-up"
      keep-alive></router-view>
  </div>
</template>

<script>
import request from 'utils/request'
import { CPane, CSelect } from 'components'
export default {
  data () {
    return {
      chapters: [],
      chapter: null
    }
  },

  watch: {
    chapter (val) {
      this.$nextTick(() => {
        this.$route.router.go({
          name: 'docs/read',
          params: {
            name: val
          }
        })
      })
    }
  },

  route: {
    data () {
      request('./docs/index.json', { proxyFlag : false }).then(text => {
        const chapters = []
        Object.keys(text).forEach(val => {
          chapters.push({
            label: val,
            value: text[val]
          })
        })
        this.chapter = this.$route.params.name || chapters[0].value
        this.chapters = chapters
      })
    }
  },

  components: {
    CPane,
    CSelect
  }
}
</script>

<style src="styles/views/docs"></style>
