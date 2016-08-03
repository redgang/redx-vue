<template>
  <div class="v-docs-read">
    <c-pane class="markdown-body">{{{ content }}}</c-pane>
  </div>
</template>

<script>
import marked from 'marked'
import request from 'utils/request'
import { CPane } from 'components'
export default {
  data () {
    return {
      content: ''
    }
  },

  route: {
    data () {
      request(`./docs/${this.$route.params.name}`, { proxyFlag : false }).then(text => {
        this.content = marked(text)
      })
    }
  },

  components: {
    CPane
  }
}
</script>

<style src="github-markdown-css"></style>
