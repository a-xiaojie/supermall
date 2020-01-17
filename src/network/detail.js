import { requestOuer } from './request'

export function getDetail (comId) {
  return requestOuer({
    url: '/product/mall/promote',
    method: 'post',
    data: {
      comId,
      p: 0
    }
  })
}

export function getDetailItems (comId) {
  return requestOuer({
    url: '/product/unite/item/detail/comId',
    method: 'post',
    data: {
      comId
    }
  })
}

export class Goods {
  constructor(itemInfo) {
    this.sourcePlatType = itemInfo.sourcePlatType;  // 商品平台
    this.prodName = itemInfo.prodName;
    this.couponPrice = itemInfo.couponPrice;   // 优惠券价格
    this.promotionPrice = itemInfo.promotionPrice;  // 券后价
    this.originalPrice = itemInfo.originalPrice;  // 原价
    this.salesQuantity = itemInfo.salesQuantity;  // 销量
    this.pwdText = `点击下方一键复制，打开淘领券购买
或长按本段文字复制去绹靌
${itemInfo.prodName}
--------------------------
长按复制框内整段文字，打开【手机淘宝】即可【领取优惠券】并购买${itemInfo.taokePwd}`
  }
}

/*
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
*/
