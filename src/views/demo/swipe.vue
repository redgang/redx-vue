<template>
  <div class="demos">
    <c-pane class="demos">
      <c-swipe class='swipe' :auto="4000">
        <c-swipe-item class="slide1">1</c-swipe-item>
        <c-swipe-item class="slide2">2</c-swipe-item>
        <c-swipe-item class="slide3">3</c-swipe-item>
      </c-swipe>

      <c-swipe class='swipe' :show-indicators="false">
        <c-swipe-item class="slide1">1</c-swipe-item>
        <c-swipe-item class="slide2">2</c-swipe-item>
        <c-swipe-item class="slide3">3</c-swipe-item>
      </c-swipe>

      <c-swipe class='swipe' :auto="0">
        <c-swipe-item class="slide1">1</c-swipe-item>
        <c-swipe-item class="slide2">2</c-swipe-item>
        <c-swipe-item class="slide3">3</c-swipe-item>
      </c-swipe>

      <c-swipe class='swipe' :show-indicators="false">
        <c-swipe-item class="slide1">SINGLE SLIDE</c-swipe-item>
      </c-swipe>
    </c-pane>
  </div>
</template>

<style>
    .swipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
      }

      .c-swipe-item {
        line-height: 200px;
      }

      .slide1 {
        background-color: #0089dc;
        color: #fff;
      }
      .slide2 {
          background-color: #ffd705;
          color: #000;
      }

      .slide3 {
        background-color: #ff2d4b;
        color: #fff;
      }
</style>

<script>
    import { CSwipe, CSwipeItem, CPane } from 'components'
    export default {
      components: {
        CSwipe,
        CSwipeItem,
        CPane
      }
    }
</script>