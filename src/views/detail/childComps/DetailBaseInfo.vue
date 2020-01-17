<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">
      <img alt="" class="tag">
      {{goods.prodName}}
    </div>
    <div class="info-other">
      <div class="info-price">
        <span class="coupon-price" v-if="goods.couponPrice">券:{{goods.couponPrice}}元</span>
        <span>券后:</span>
        <span class="n-price">￥<strong>{{goods.promotionPrice}}</strong></span>
        <span class="o-price">￥{{goods.originalPrice}}</span>
      </div>
      <div class="amount">销量:{{goods.salesQuantity > 9999 ? '9999+' : goods.salesQuantity}}</div>
    </div>
    <div class="info-pwd">
      <div class="pwd">
        <textarea v-model="goods.pwdText"></textarea>
      </div>
      <div class="tip">
        <span>1.复制文案</span>
        <span>2.请打开淘宝APP</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 10px;
    margin-bottom: 10px;
    background: #fff;
  }
  .info-title {
    font-size: 15px;
    font-weight: 400;
    line-height: 19px;
    color: var(--color-text);
    margin-bottom: 10px;
  }
  .tag {
    float: left;
    display: inline-block;
    height: 14px;
    padding: 0 1px;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 2px;
    color: #fff;
    font-size: 9px;
    line-height: 14px;
  }
  .info-other {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 5px;
    font-size: 12px;
    color: var(--color-text3);
  }
  .info-price {
    flex: 1;
    display: flex;
    align-items: baseline;
  }
  .coupon-price {
    padding: 12px 10px;
    line-height: 0;
    background: #ffdbdb;
    border-radius: 3px;
    margin-right: 8px;
    font-size: 12px;
    color: var(--color-high-text);
  }
  .n-price {
    color: var(--color-high-text);
    margin-right: 4px;
  }
  .n-price strong {
    font-size: 20px;
    font-weight: normal;
  }
  .o-price {
    text-decoration: line-through;
  }
  .info-pwd {
    padding: 10px 0;
  }
  .pwd {
    padding: 10px;
    line-height: 20px;
    border: 2px dashed #ff5363;
    border-radius: 2px;
    background: #fff7f8;
  }
  .pwd textarea {
    display: block;
    overflow: hidden;
    text-align: left;
    resize: none;
    border: none;
    outline: none;
    width: 100%;
    color: #ff5363;
    font-size: 14px;
    background: transparent;
  }
  .tip {
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    line-height: 22px;
    color: var(--color-text2);
  }
  .tip > span:not(:last-child)::after {
    content: '>';
    margin: 0 5px;
  }
</style>
