<template>
    <div :class="['c-qrcode', class]">
        <c-pane @click="close" v-if="show">
            <c-image :src="imageUrl" alt="本地调试" :title='imageUrl'></c-image>
        </c-pane>
    </div>
</template>

<script>
import CPane from 'components/c-pane'
import CImage from 'components/c-image'

export default {
    name: 'c-qrcode',

    props: {
        class: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            cUrl: '',
            show : true
        }
    },
    computed: {
        imageUrl() {
            //return 'http://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+encodeURIComponent(this.cUrl)
            return 'http://pan.baidu.com/share/qrcode?w=150&h=150&url=' + encodeURIComponent(this.cUrl)
        }
    },

    watch: {
        '$route.path': {
            handler(val, old) {
                this.cUrl = location.href;
            },
            immediate: true
        }
    },

    methods: {
        close() {
            this.show = false;
        }
    },

    components: {
        CImage,
        CPane
    }
}
</script>

<style src='styles/components/qrcode'></style>