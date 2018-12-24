<template>
  <div class="shopcart">
    <div class="content-left">
      <div
        class="cart-icon-wrapper"
        @click="toggleDetail"
      >
        <div
          class="cart-icon"
          :class="{'highlight': !isEmpty}"
        >
          <span class="icon-shopping_cart"></span>
        </div>
      </div>
      <div
        class="foods-price"
        :class="{'highlight': !isEmpty}"
      >
        &#00165;{{foodsPrice}}
      </div>
      <div class="delivery-price">
        另需配送费&#00165;{{seller.deliveryPrice}}元
      </div>
      <div
        class="foods-count"
        v-show="foodsCount > 0"
      >{{foodsCount}}</div>
    </div>
    <div
      class="content-right"
      :class="{'highlight': isEnough}"
      v-html="stateStr"
      @click="pay"
    ></div>
    <div class="ball-container">
      <transition
        name="drop"
        v-for="ball in balls"
        :key="ball.index"
        @before-enter="beforeEnter(ball)"
        @enter="enter(ball)"
        @after-enter="afterEnter(ball)"
        @afterLeave="afterLeave(ball)"
      >
        <div
          v-show="ball.isShow"
          class="ball"
          ref="ballEle"
        >
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="slide">
      <div
        class="cart-detail"
        v-show="isShowDetail"
      >
        <div class="header">
          <h2 class="title">购物车</h2>
          <button
            class="clear"
            @click="clearCart"
          >清空</button>
        </div>
        <div
          class="food-list-wrapper"
          ref="foodListWrapper"
        >
          <ul class="food-list">
            <li
              class="food-item"
              v-for="food in cartContent"
              :key="food.name"
            >
              <h3 class="food-name">{{food.name}}</h3>
              <span class="food-price"><span class="prefix">&#00165;</span>{{food.price}}</span>
              <div class="food-handler-wrapper">
                <base-food-handler :food="food"></base-food-handler>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="isShowDetail"
        class="grey-mask"
        @click="hideDetail"
      ></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import BaseFoodHandler from '@comp/base/base-food-handler/base-food-handler';

export default {
  components: {
    BaseFoodHandler
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    },
    cartContent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      balls: [
        { index: 0, isShow: false, startPos: null },
        { index: 1, isShow: false, startPos: null },
        { index: 2, isShow: false, startPos: null },
        { index: 3, isShow: false, startPos: null },
        { index: 4, isShow: false, startPos: null }
      ],
      usedBalls: [],
      tasks: [],
      isShowDetail: false
    };
  },
  mounted() {
    this.ballEndPos = {
      x: 40,
      y: window.innerHeight - 30
    };
    this.balls.forEach(ball => {
      ball.ele = this.$refs.ballEle[ball.index];
    });
  },
  computed: {
    minPrice() {
      return this.seller.minPrice;
    },
    foodsPrice() {
      return this.cartContent.reduce((prev, cur) => {
        return prev + cur.price * cur.count;
      }, 0);
    },
    totalPrice() {
      return this.foodsPrice + this.seller.deliveryPrice;
    },
    foodsCount() {
      return this.cartContent.reduce((prev, cur) => {
        return prev + cur.count;
      }, 0);
    },
    isEmpty() {
      return this.foodsCount === 0;
    },
    isEnough() {
      return this.totalPrice >= this.minPrice;
    },
    stateStr() {
      return this.isEmpty
        ? '&#00165;20起送'
        : !this.isEnough
          ? `还差&#00165;${this.minPrice -
              this.foodsPrice -
              this.seller.deliveryPrice}起送`
          : `去结算`;
    }
  },
  watch: {
    // whether show food order list
    isShowDetail(val) {
      let wrapper = this.$refs.foodListWrapper;
      if (val) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(wrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    // when cart is cleared somehow, hide the detail
    isEmpty(val) {
      if (val) this.isShowDetail = false;
    }
  },
  methods: {
    clearCart() {
      while (this.cartContent.length > 0) {
        this.cartContent.pop().count = 0;
      }
    },
    hideDetail() {
      this.isShowDetail = false;
    },
    toggleDetail() {
      if (this.isEmpty) {
        this.isShowDetail = false;
      } else {
        this.isShowDetail = !this.isShowDetail;
      }
    },
    pay() {
      if (this.isEnough) {
        this.clearCart();
        window.alert('这次帮你买好单了，等着享用吧:)');
      }
    },
    drop(pos) {
      this.tasks.push(pos);
      this.doTask();
    },
    doTask() {
      // no more task
      if (this.tasks.length === 0) return;
      let len = this.balls.length;
      // all balls in use
      if (this.usedBalls.length === len) return;
      for (let i = 0; i < len; i++) {
        if (this.usedBalls.indexOf(this.balls[i]) < 0) {
          let task = this.tasks.shift();
          let ball = this.balls[i];
          ball.startPos = task;
          ball.isShow = true;
          this.usedBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(ball) {
      let x = ball.startPos.x - this.ballEndPos.x;
      let y = ball.startPos.y - this.ballEndPos.y;
      ball.ele.style.transform = `translate3d(${x}px, 0, 0)`;
      ball.ele.getElementsByClassName(
        'inner-hook'
      )[0].style.transform = `translate3d(0, ${y}px, 0)`;
    },
    enter(ball) {
      let ele = ball.ele;
      // eslint-disable-next-line
      let ow = ele.offsetWidth; // 触发重排重绘
      this.$nextTick(() => {
        ele.style.transform = 'translate3d(0, 0, 0)';
        ele.getElementsByClassName('inner-hook')[0].style.transform =
          'translate3d(0, 0, 0)';
      });
    },
    afterEnter(ball) {
      ball.isShow = false;
      ball.ele.display = 'none';
      this.usedBalls.shift();
    },
    afterLeave(ball) {
      // eslint-disable-next-line
      let ow = ball.ele.offsetWidth; // 触发重排重绘
      this.doTask();
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.shopcart
  position: fixed
  z-index: 50
  display: flex
  left: 0
  bottom: 0
  width: 100%
  height: 48px
  color: rgba(255, 255, 255, 0.4)

  .content-left
    background-color: #141d27
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
      padding: 6px
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
      padding: 0 6px
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
    background-color: #2B333B

    &.highlight
      color: #ffffff
      background-color: #00a0dc

  .ball-container
    .ball
      position: fixed
      z-index: 200
      left: 32px
      bottom: 22px
      width: 16px
      height: 16px

      .inner
        with: 100%
        height: 100%
        border-radius: 50%
        background-color: rgb(0, 160, 220)

    .drop-enter-active
      transition: all 0.4s linear

      .inner
        transition: all 0.4s cubic-bezier(0.51, -0.55, 0.83, 0.67)

  .cart-detail
    position: absolute
    left: 0
    top: 0
    z-index: -50
    width: 100%
    transform: translate3d(0, -100%, 0)

    .header
      position: relative
      height: 40px
      line-height: 40px
      background-color: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      padding: 0 18px
      color: rgb(7, 17, 27)

      .title
        font-size: 14px
        font-weight: 200

      .clear
        position: absolute
        right: 18px
        top: 0
        line-height: 40px
        border: none
        outline: none
        background-color: transparent
        font-size: 12px
        color: rgb(0, 160, 220)

    .food-list-wrapper
      max-height: 240px
      overflow: hidden
      background-color: #fff

      .food-list
        padding: 0 18px 25px 18px

        .food-item
          position: relative
          width: 100%
          height: 48px
          color: rgb(7, 17, 27)
          border-bottom-1px(rgba(7, 17, 27, 0.1))

          .food-name
            font-size: 14px
            line-height: 24px
            padding: 12px 0

          .food-price
            position: absolute
            top: 0
            right: 74px
            padding: 12px 12px 12px 18px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
            line-height: 24px

            .prefix
              font-size: 10px
              font-weight: normal

          .food-handler-wrapper
            position: absolute
            right: 0
            top: 0
            line-height: 24px
            padding: 10px 0

  .slide-enter, .slide-leave-to
    transform: translate3d(0, 0, 0)

  .slide-enter-active, .slide-leave-active
    transition: all 0.5s

  .grey-mask
    position: fixed
    left: 0
    top: 0
    z-index: -55
    width: 100%
    height: 100%
    background-color: rgba(7, 17, 27, 0.6)
    backdrop-filter: blur(10px)

  .fade-enter, .fade-leave-to
    opacity: 0
    background-color: rgba(7, 17, 27, 0)

  .fade-enter-active, .fade-leave-active
    transition: all 0.4s
</style>
