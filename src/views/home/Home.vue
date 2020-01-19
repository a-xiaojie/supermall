<template>
  <div id="home">
    <nav-bar class="home-nav" ref="navBar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="fixed"
      :titles="['女装', '居家', '食品']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
    >
      <home-swiper :banner="banner" @swiperItemLoad="swiperItemLoad"/>
      <recommend-view :recommend="recommend"/>
      <feature-view/>
      <tab-control
        :titles="['女装', '居家', '食品']"
        @tabClick="tabClick"
        ref="tabControl2"
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
  import { itemListenerMixin } from 'common/mixin'

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
      BackTop,
    },
    mixins: [itemListenerMixin],
    data () {
      return {
        banner: [],
        recommend: [],
        goods: {
          '女装': {page: 1, list: []},
          '居家': {page: 1, list: []},
          '食品': {page: 1, list: []},
        },
        currentType: '女装',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
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
    },
    activated() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性：$el: 用于获取组件中的元素
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
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
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick () {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll (pos) {
        // 1. 判断BackTop是否显示
        this.isShowBackTop = -pos.y > 1000

        // 2. 决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-pos.y) > this.tabOffsetTop - this.$refs.navBar.$el.clientHeight
      },
      loadMore () {
        console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
      },
      swiperItemLoad () {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
  .content {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>
