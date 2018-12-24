<template>
  <div
    class="food-wrapper"
    ref="foodWrapper"
  >
    <div class="food">
      <div class="food-overview">
        <div class="food-img">
          <div
            class="back-icon"
            @click="hideFood"
          >
            <span class="icon-arrow_lift"></span>
          </div>
          <img
            class="img"
            :src="food.image"
            alt="商品大图"
          >
        </div>
        <div class="food-info">
          <h2 class="title">{{food.name}}</h2>
          <p class="sell-state">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="satisfied-rate">好评率{{food.rating}}%</span>
          </p>
          <p class="price">
            <span class="now">
              &#00165;<span class="number">{{food.price}}</span>
            </span>
            <span
              v-if="food.oldPrice"
              class="old"
            >
              &#00165;<span class="number">{{food.oldPrice}}</span>
            </span>
          </p>
          <div class="food-handler-wrapper">
            <base-food-handler
              :food="food"
              @add-animate="addAnimate($event)"
            ></base-food-handler>
          </div>
          <div
            v-show="!food.count"
            class="add-to-cart"
            @click="addToCart"
          >加入购物车</div>
        </div>
      </div>
      <div
        v-if="food.info"
        class="base-split-wrapper"
      >
        <base-split></base-split>
      </div>
      <div
        v-if="food.info"
        class="food-intro"
      >
        <h2 class="title">商品介绍</h2>
        <p class="intro-text">{{food.info}}</p>
      </div>
      <div class="base-split-wrapper">
        <base-split></base-split>
      </div>
      <div class="o-rating-panel-wrapper">
        <o-rating-panel
          rating-title="商品评价"
          :type-strs="['全部', '推荐', '吐槽']"
          :ratings="food.ratings"
        ></o-rating-panel>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import BaseFoodHandler from '@comp/base/base-food-handler/base-food-handler';
import BaseSplit from '@comp/base/base-split/base-split';
import ORatingPanel from '@comp/o-rating-panel/o-rating-panel';

export default {
  components: {
    BaseFoodHandler,
    BaseSplit,
    ORatingPanel
  },
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this._initScroll();
  },
  updated() {
    this._scroll.refresh();
  },
  methods: {
    hideFood() {
      this.$emit('hide-food');
    },
    addToCart(event) {
      if (!event._constructed) return;
      Vue.set(this.food, 'count', 1);
      this.addAnimate({
        x: event.pageX,
        y: event.pageY
      });
    },
    addAnimate(pos) {
      this.$emit('add-animate', pos);
    },
    _initScroll() {
      this._scroll = new BScroll(this.$refs.foodWrapper, {
        click: true
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.food-wrapper
  width: 100%
  height: 100%

  .food
    .food-overview
      .food-img
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        overflow: hidden
        box-sizing: border-box

        .back-icon
          position: absolute
          left: 0
          top: 5px
          z-index: 55
          width: 20px
          height: 20px
          padding: 10px
          color: #fff
          background-color: rgba(0, 0, 0, 0.3)
          border-radius: 50%

          .icon-arrow_lift
            width: 18px
            height: 18px
            line-height: 18px
            font-size: 18px

        .img
          position: absolute
          left: 0
          top: 0
          width: 100%
          height: 100%
          z-index: 50

      .food-info
        position: relative
        margin: 18px

        .title
          font-size: 14px
          line-height: 14px
          font-weight: bold
          color: rgb(7, 17, 27)

        .sell-state
          margin-top: 8px
          font-size: 0

          .sell-count, .satisfied-rate
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            margin-right: 12px

        .price
          margin-top: 18px
          font-size: 0

          .now, .old
            display: inline-block
            font-size: 10px
            line-height: 24px

          .now
            color: rgb(240, 20, 20)
            margin-right: 8px

            .number
              font-size: 14px
              font-weight: 700

          .old
            color: rgb(147, 153, 159)

            .number
              font-weight: 700

        .food-handler-wrapper, .add-to-cart
          position: absolute
          right: 0
          bottom: 0
          z-index: 50

        .add-to-cart
          z-index: 55
          min-width: 74px
          padding: 6px 12px
          margin: 2px 0
          box-sizing: border-box
          border-radius: 24px
          font-size: 10px
          color: rgb(255, 255, 255)
          line-height: 12px
          background-color: rgb(0, 160, 220)

    .food-intro
      margin: 18px

      .title
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-weight: 400

      .intro-text
        padding: 6px 8px 0 8px
        font-size: 12px
        font-weight: 200
        color: rgb(77, 85, 93)
        line-height: 24px
</style>
