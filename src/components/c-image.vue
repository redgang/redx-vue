<template>
  <div :class="['c-image', class]">
    <img class="c-image-img"
      :src="src"
      :width="width"
      :height="height"
      :alt="alt"
      :title="title"
      @load="_load">
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    keepRatio: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    _load ($event) {
      if (this.keepRatio) {
        const img = $event.path[0]
        getSize(img.src).then(({ width, height }) => {
          const ratio = width / height
          if (ratio !== img.width / img.height) {
            // 只处理宽度缩小的情况
            img.height = img.width / ratio
          }
        })
      }
    }
  }
}

function getSize (src) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = function () {
      reject(null)
    }
    img.src = src
  })
}
</script>

<style src="styles/components/image"></style>
