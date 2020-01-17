<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :banner="banners"/>
      <detail-base-info :goods="goods"/>
      <detail-goods-info :goods-info="detailInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import { getDetail, Goods, getDetailItems } from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      Scroll,
    },
    data () {
      return {
        id: null,
        banners: [],
        goods: {},
        detailInfo: ''
      }
    },
    created() {
      this.id = this.$route.query.id

      this.getDetail()
      this.getDetailItems()
    },
    methods: {
      getDetail () {
        getDetail(this.id).then(res => {
          const data = res.data
          this.banners = data.imageUrls;
          this.goods = new Goods(data)
        })
      },
      getDetailItems () {
        getDetailItems(this.id).then(res => {
          this.detailInfo = res.data;
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .content {
    height: calc(100vh - 44px);
    background: #f8f8f8;
  }
</style>
