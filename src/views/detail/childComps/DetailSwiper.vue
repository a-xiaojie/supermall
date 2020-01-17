<template>
  <swiper class="detail-swiper" v-if="banner.length">
    <swiper-item v-for="(item, index) in banner" :key="index">
      <img :src="item" alt="" @load="imageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: 'DetailSwiper',
    props: {
      banner: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    data () {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad () {
        if (!this.isLoad) {
          this.$emit('swiperItemLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
.detail-swiper {
  height: 350px;
}
</style>
