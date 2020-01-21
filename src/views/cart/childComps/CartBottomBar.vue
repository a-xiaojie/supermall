<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice () {
        return '￥' + this.cartList.filter(item => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
      },
      checkLength () {
        return this.cartList.filter(item => item.checked).length
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-all {
    display: flex;
    width: 70px;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    color: #fff;
    text-align: center;
    background-color: var(--color-tint);
  }
</style>
