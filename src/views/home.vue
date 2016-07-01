<template>
  <div class="demos">
    <c-pane>
      <c-form
        :cells="cells"
        :items="{lang: env.lang}"
        @mutate="setEnv"></c-form>
    </c-pane>
    <c-pane class="quatation">
      {{ __('view.message', [hello]) }}
    </c-pane>
    <c-pane>
      <c-title>{{ __('view.home.latest_commits') }}</c-title>
      <c-loading v-show="!commits"></c-loading>
      <c-cell v-for="record in commits" transition="fade">
        <a :href="record.html_url" target="_blank" class="commit">{{record.commit.message}}</a><br>
        <small class="date">@ {{record.commit.author.date | datetime 'yyyy-MM-dd hh:mm'}}</small>
      </c-cell>
    </c-pane>
    <c-image src="images/logo.png" 
      width="200"
      height="200"></c-image>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import CForm from 'components/c-form'
import CPane from 'components/c-pane'
import CGroup from 'components/c-group'
import CTitle from 'components/c-title'
import CLoading from 'components/c-loading'
import CImage from 'components/c-image'
import CCell from 'components/c-cell'
import { commits } from 'vx/getters'
import { setEnv, getCommits } from 'vx/actions'
export default {
  data () {
    return {
      ua: navigator.userAgent,
      hello: 'Redx'
    }
  },

  computed: {
    cells () {
      return {
        lang: {
          label: this.__('view.home.language'),
          type: 'CSelect',
          extra: {
            options: [{
              value: 'en',
              label: 'English'
            }, {
              value: 'zh',
              label: '中文'
            }, {
              value: 'none',
              label: '不存在的语言'
            }]
          }
        }
      }
    }
  },

  ready () {
    this.getCommits()
  },

  vuex: {
    getters: {
      commits
    },
    actions: {
      setEnv,
      getCommits
    }
  },

  filters: {
    datetime
  },

  components: {
    CForm,
    CPane,
    CGroup,
    CTitle,
    CLoading,
    CCell,
    CImage
  }
}
</script>

<style src="styles/views/home"></style>
