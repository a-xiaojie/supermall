<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :banner="banners"/>
      <detail-base-info :goods="goods"/>
      <detail-goods-info :goods-info="detailInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import { getDetail, Goods, getDetailItems, getRecommend } from 'network/detail'
  import { itemListenerMixin } from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      Scroll,
    },
    mixins: [itemListenerMixin],
    data () {
      return {
        id: null,
        banners: [],
        goods: {},
        detailInfo: '',
        recommends: [],
        itemImgListener: null,
      }
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
      },
      getRecommend () {
        getRecommend().then(res => {
          this.recommends = res.data
        })
      }
    },
    created() {
      this.id = this.$route.query.id

      this.getDetail()
      this.getDetailItems()
      this.getRecommend()
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
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
