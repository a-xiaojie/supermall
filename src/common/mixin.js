import { debounce } from './utils'
export const itemListenerMixin = {
  mounted() {
    // 1.监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 200)
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入中的内容')
  },
}
