import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'
import { BACKTOP_DISTANCE } from 'common/const'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    // 1.监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入中的内容')
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop (pos) {
      this.isShowBackTop = -pos.y > BACKTOP_DISTANCE
    }
  }
}
