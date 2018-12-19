<template>
<div class="shopcart">
  <div class="content-left">
    <div class="cart-icon-wrapper">
      <div class="cart-icon" :class="{'highlight': !isEmpty}">
        <span class="icon-shopping_cart"></span>
      </div>
    </div>
    <div class="foods-price" :class="{'highlight': !isEmpty}">
      &#00165;{{foodsPrice}}
    </div>
    <div class="delivery-price">
      另需配送费&#00165;{{seller.deliveryPrice}}元
    </div>
    <div class="foods-count" v-show="foodsCount > 0">{{foodsCount}}</div>
  </div>
  <div class="content-right" :class="{'highlight': isEnough}" v-html="stateStr"></div>
</div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      default () {
        return {};
      }
    },
    cartContent: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  computed: {
    minPrice () {
      return this.seller.minPrice;
    },
    foodsPrice () {
      return this.cartContent.reduce((prev, cur) => {
        return prev + cur.food.price * cur.count;
      }, 0);
    },
    totalPrice () {
      return this.foodsPrice + this.seller.deliveryPrice;
    },
    foodsCount () {
      return this.cartContent.reduce((prev, cur) => {
        return prev + cur.count;
      }, 0);
    },
    isEmpty () {
      return this.foodsCount === 0;
    },
    isEnough () {
      return this.totalPrice >= this.minPrice;
    },
    stateStr () {
      return this.isEmpty ? '&#00165;20起送'
        : !this.isEnough ? `还差&#00165;${this.minPrice - this.foodsPrice}起送`
          : `去结算`;
    }
  },
  components: {

  }
};
</script>

<style scoped lang="stylus">
.shopcart
  position: fixed;
  z-index: 50
  display: flex
  left: 0
  bottom: 0
  width: 100%
  height: 48px
  background-color: #141d27
  color: rgba(255, 255, 255, 0.4)
  .content-left
    flex: 1
    font-size: 0
    .cart-icon-wrapper, .foods-price, .delivery-price
      display: inline-block
      vertical-align: top
    .cart-icon-wrapper
      position: relative
      top: -10px
      width: 44px
      height: 44px
      padding:6px
      margin-left: 12px
      border-radius: 50%
      text-align: center
      background-color: #141d27
      .cart-icon
        width: 100%
        height: 100%
        border-radius: 50%
        background-color: rgba(255, 255, 255, 0.2)
        .icon-shopping_cart
          font-size: 24px
          line-height: 44px
        &.highlight
          color: #ffffff
          background-color: #00a0dc
    .foods-price
      margin: 12px 0 12px 12px
      padding-right: 12px
      font-size: 16px
      line-height: 24px
      font-weight: bold
      border-right: 1px solid rgba(255, 255, 255, 0.1)
      &.highlight
        color: #fff
    .delivery-price
      font-size: 16px
      line-height: 48px
      padding: 0 3px
    .foods-count
      position: absolute
      z-index: 55
      left: 44px
      top: -10px
      width: 12px
      height: 16px
      padding: 0 6px;
      border-radius: 6px
      line-height: 16px
      font-size: 9px
      text-align: center
      color: rgb(255, 255, 255)
      background-color: rgb(240, 20, 20)
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
  .content-right
    flex: 0 0 89px
    width: 89px
    padding: 0 8px
    font-size: 16px
    line-height: 48px
    font-weight: 700
    text-align: center
    background-color: rgba(255, 255, 255, 0.2)
    &.highlight
      color: #ffffff
      background-color: #00a0dc
</style>
