<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :banner="banners"/>
      <detail-base-info :goods="goods"/>
      <detail-goods-info ref="info" :goods-info="detailInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import { getDetail, Goods, getDetailItems, getRecommend } from 'network/detail'
  import { itemListenerMixin, backTopMixin } from 'common/mixin'
  import {debounce} from 'common/utils'

  export default {
    name: 'Detail',
    components: {
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailBottomBar,
      Scroll,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data () {
      return {
        id: null,
        banners: [],
        goods: {},
        detailInfo: '',
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    methods: {
      getDetail () {
        getDetail(this.id).then(res => {
          const data = res.data
          this.banners = data.imageUrls;
          this.goods = new Goods(data)

          // this.$nextTick(() => {
          //   // 根据最新的数据，对应的DOM是已经被渲染出来了，
          //   // 但是图片依然没有加载完（目前获取到的offsetTop不包含其中的图片）
          //   // offsetTop值不对，一般都是因为图片的问题
          //   this.themeTopYs = []
          //   this.themeTopYs.push(0)
          //   this.themeTopYs.push(this.$refs.info.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //   console.log(this.themeTopYs)
          // })
        })
      },
      getDetailItems () {
        getDetailItems(this.id).then(res => {
          this.detailInfo = res.data;
        })
      },
      getRecommend () {
        getRecommend(this.id).then(res => {
          this.recommends = res.data.data
        })
      },
      titleClick (index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      detailImageLoad () {
        this.newRefresh()
        this.getThemeTopY()
      },
      contentScroll (pos) {
        // 1. 获取y值
        const posY = -pos.y;
        // 1. 判断BackTop是否显示
        this.listenShowBackTop(pos)
        let length = this.themeTopYs.length

        // 2. posY和主题中值进行对比
        // for (let i = 0; i < length; i++) {
        //   // if (posY >= this.themeTopYs[parseInt(i)] && posY < this.themeTopYs[parseInt(i) + 1]) {
        //   //   console.log(i)
        //   // }
        //   if (this.currentIndex !== i && ((i < length - 1 && posY >= this.themeTopYs[i] && posY < this.themeTopYs[i + 1]) || (i === length - 1 && posY >= this.themeTopYs[i]))) {
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (posY >= this.themeTopYs[i] && posY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
    },
    created() {
      this.id = this.$route.query.id

      this.getDetail()
      this.getDetailItems()
      this.getRecommend()

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.info.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      }, 100)
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    updated() {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.info.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
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
    height: calc(100vh - 44px - 49px);
    background: #f8f8f8;
  }
</style>
