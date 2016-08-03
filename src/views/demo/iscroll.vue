<template>
  <div class="page">
    <p class="page-desc">iscroll当即将滚动至列表底部时, 自动加载更多数据</p>
    <div class="page-wrapper" v-el:wrapper :style="{ height: wrapperHeight + 'px' }">
      <ul v-iscroll="loadMore()" iscroll-disabled="loading" iscroll-distance="50">
        <li v-for="item in list" class="page-listitem">{{ item }}</li>
      </ul>
      <p v-show="loading">
        <c-loading>加载中...</c-loading>
      </p>
    </div>
  </div>
</template>

<style>
  .page-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px;
    border-bottom: solid 1px #eee;
  }
  
  .page-listitem {
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
    &:first-child {
      border-top: solid 1px #eee;
    }
  }
  
  .page-wrapper {
    margin-top: -1px;
    overflow: scroll;
  }
</style>

<script>
  import { CLoading } from 'components'
 
  export default {
    data() {
      return {
        list: [],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0
      };
    },

    methods: {
      loadMore() {
        this.loading = true
        setTimeout(() => {
          const last = this.list[this.list.length - 1]
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i)
          }
          this.loading = false
        }, 1500)
      }
    },

    compiled() {
      for (let i = 1; i <= 20; i++) {
        this.list.push(i)
      }
    },

    ready() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$els.wrapper.getBoundingClientRect().top
    },

    components: {
        CLoading
    }
  };
</script>