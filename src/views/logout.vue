<template>
  <div class="v-logout">
    <c-image src="images/logo.png"></c-image>
    <c-modal :show.sync="true" :backdrop="false" :callback="callback">确定退出？</c-modal>
  </div>
</template>

<script>
import { CImage, CModal } from 'components'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      callback (key) {
        if (key === 'submit') {
          this.$parent.setEnv({
            authorized: false
          })
        } else {
          history.back()
        }
        // return `false` to prevent hidding modal
        return false
      }
    }
  },

  route: {
    activate () {
      if (!this.authorized) {
        history.back()
        return
      }
    }
  },

  computed: mapGetters(['authorized']),

  methods: mapActions(['setEnv']),

  watch: {
    'authorized' (val) {
      if (!val) {
        this.$nextTick(() => {
          this.$route.router.go('/')
        })
      }
    }
  },

  components: {
    CImage,
    CModal
  }
}
</script>

<style src="styles/views/logout"></style>