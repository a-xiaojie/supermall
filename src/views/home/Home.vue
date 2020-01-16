<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
    >
      <home-swiper :banner="banner"/>
      <recommend-view :recommend="recommend"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['居家', '女装', '食品']"
                   @tabClick="tabClick"
      />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import { getHomeMultidata, getCatGoods } from 'network/home'
  import { debounce } from 'common/utils'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data () {
      return {
        banner: [],
        recommend: [],
        goods: {
          '居家': {page: 1, list: []},
          '女装': {page: 1, list: []},
          '食品': {page: 1, list: []},
        },
        currentType: '居家',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods () {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('居家')
      this.getHomeGoods('女装')
      this.getHomeGoods('食品')
    },
    mounted() {
      // 3.监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick (index) {
        switch (index) {
          case 0:
            this.currentType = '居家'
            break
          case 1:
            this.currentType = '女装'
            break
          case 2:
            this.currentType = '食品'
            break
          default:
            this.currentType = '居家'
        }
      },
      backClick () {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll (pos) {
        this.isShowBackTop = -pos.y > 1000
      },
      loadMore () {
        console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata () {
        getHomeMultidata().then(res => {
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getHomeGoods (type) {
        getCatGoods(type, this.goods[type].page).then(res => {
          const goodsList = res.data.data;
          this.goods[type].list.push(...goodsList)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp();
        })
      },
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
</style>
