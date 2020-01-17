<template>
  <div class="detail-goods-info">
    <div class="info-title">- 图文详情 -</div>
    <div class="info-content">
      <div v-if="goodsInfo" v-html="goodsInfo"></div>
      <p v-else class="none">暂无图文信息</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      goodsInfo: {
        type: String
      }
    },

  }
</script>

<style scoped>
  .detail-goods-info {
    background: #fff;
  }
  .info-title {
    padding: 15px 0 10px;
    line-height: 25px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text);
  }
  .info-content >>> p {
    margin: 0 10px;
    font-size: 15px;
    line-height: 24px;
    color: var(--color-text2);
  }
  .info-content .none {
    text-align: center;
    padding: 10px;
    font-size: 20px;
    line-height: 30px;
  }
  .info-content >>> img {
    max-width: 375px;
    margin: 0 -10px;
    vertical-align: top;
  }
</style>
