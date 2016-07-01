<template>
  <div :class="['c-toast', class]"
    :transition="transition"
    v-show="toasts.length">
    <div class="toast"
      :transition="transition"
      v-for="toast in toasts"
      track-by="_id">
      <pre class="name"><code> {{toast.name}} </code></pre>
      <pre class="message"><code> {{toast.message}} </code></pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    transition: {
      type: String,
      default: 'slide'
    },
    toasts: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style src="styles/components/toast"></style>
