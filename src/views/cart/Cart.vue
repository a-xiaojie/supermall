<template>
  <div id="cart">
    <!--导航-->
    <nav-bar classs="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import { mapGetters } from 'vuex'


  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      // 两种语法
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .nav-bar {
    color: #fff;
    background: var(--color-tint);
  }
</style>
