<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: 'HomeSwiper',
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

</style>
