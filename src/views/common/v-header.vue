<template>
    <header :class="['c-header', class]">
        <div class="c-header-logo">
            <c-route-link :route="{
            link: { path: '/', exact: true },
            title: __('header.title')
          }"></c-route-link>
        </div>
        <div class="c-header-history">
            <c-button class="none" @click="historyBack">
                <c-icon class="icon-back"></c-icon>
            </c-button>
        </div>
        <c-navbar class="navbar">
            <c-route :routes="routes"></c-route>
        </c-navbar>
    </header>
</template>

<script>
    import { CRoute, CRouteLink, CButton, CIcon, CNavbar } from 'components'

    export default {
      props: {
        class: {
          type: String,
          default: ''
        },
        routes: {
          type: Array,
          default () {
            return []
          }
        }
      },
      methods: {
        historyBack () {
          history.back()
        }
      },
      components: {
        CButton,
        CIcon,
        CNavbar,
        CRoute,
        CRouteLink
      }
    }
</script>

<style src='styles/views/header'></style>