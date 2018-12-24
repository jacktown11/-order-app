<template>
  <div
    class="ratings-wrapper"
    ref="wrapper"
  >
    <div class="container">
      <div class="overview">
        <div class="general-score">
          <p class="final-score">{{seller.score}}</p>
          <p class="item-title">综合评分</p>
          <p class="rank-rate">高于周边商家<span class="number">{{seller.rankRate}}</span>%</p>
        </div>
        <div class="detail-score border-right-1px">
          <div class="detail-item service-score-wrapper">
            <span class="inner item-title">服务态度</span>
            <div class="inner o-star-bar-wrapper">
              <base-star-bar
                :size="36"
                :score="seller.serviceScore"
              ></base-star-bar>
            </div>
            <span class="inner number">{{seller.serviceScore}}</span>
          </div>
          <div class="detail-item food-score-wrapper">
            <span class="inner item-title">食物品质</span>
            <div class="inner o-star-bar-wrapper">
              <base-star-bar
                :size="36"
                :score="seller.foodScore"
              ></base-star-bar>
            </div>
            <span class="inner number">{{seller.foodScore}}</span>
          </div>
          <div class="detail-item delivery-time-wrapper">
            <span class="inner item-title">送达时间</span>
            <span class="inner delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="base-split-wrapper">
        <base-split></base-split>
      </div>
      <div class="o-rating-panel-wrapper">
        <o-rating-panel
          :ratings="ratings"
          :is-for-food="false"
        ></o-rating-panel>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

import BaseStarBar from '@comp/base/base-star-bar/base-star-bar';
import BaseSplit from '@comp/base/base-split/base-split';
import ORatingPanel from '@comp/o-rating-panel/o-rating-panel';

const ERR_OK = 0;

export default {
  components: {
    ORatingPanel,
    BaseStarBar,
    BaseSplit
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      ratings: []
    };
  },
  created() {
    this.$http.get('/api/ratings').then(res => {
      if (res.body.errNum === ERR_OK) {
        this.ratings = res.body.data;
        this.$nextTick(() => {
          if (!this.scroll) this.scroll.refresh();
        });
      }
    });
  },
  mounted() {
    this._initScroll();
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.ratings-wrapper
  position: absolute
  top: 174px
  bottom: 0
  width: 100%
  overflow: hidden

  .container
    .overview
      padding: 18px 0
      display: flex
      align-items: center

      .general-score
        flex: 4
        text-align: center

        .final-score
          font-size: 24px
          color: rgb(255, 153, 0)
          line-height: 28px

        .item-title
          margin-top: 6px
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px

        .rank-rate
          margin-top: 8px
          font-size: 10px
          color: rgb(147, 153, 159)

      .detail-score
        flex: 7
        box-sizing: border-box
        padding: 0 24px
        line-height: 18px
        border-left-1px(rgba(7, 17, 27, 0.1))

        .detail-item
          margin-bottom: 8px

          &:last-child
            margin-bottom: 0

          .inner
            display: inline-block
            vertical-align: top
            height: 18px
            line-heihgt: 18px
            margin-right: 12px

          .item-title
            font-size: 12px
            color: rgb(7, 17, 27)

          .o-star-bar-wrapper
            height: 18px

          .number, .delivery-time
            margin-right: 0

          .number
            font-size: 12px
            color: rgb(255, 153, 0)

          .delivery-time
            font-size: 12px
            color: rgb(147, 153, 159)

      @media (max-width: 359px)
        .detail-score
          padding: 0 0 0 12px
</style>
