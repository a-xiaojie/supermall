import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutation-types'

export default {
  addCart ({state, commit}, payload) {
    // payload新添加的商品
    let oldProduct = state.cartList.find(item => item.id === payload.id)
    // 2.判断oldProduct
    if (oldProduct) {
      commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      commit(ADD_TO_CART, payload)
    }
  }
}
