<template>
  <div class="wrapper">
    <div class="controller">
      <h2
        v-if="ratingTitle"
        class="rating-title"
      >{{ratingTitle}}</h2>
      <ul class="type-selector-wrapper border-bottom-1px">
        <li
          v-for="item in typeMap"
          :key="item.type"
          class="type-selector"
          :class="[item.cls, {active: selectedType === item.type}]"
          @click="selectType(item.type)"
        >{{item.str}}&nbsp;<span class="count">{{item.count}}</span></li>
      </ul>
      <div class="only-show-text">
        <button
          class="toggle-btn"
          :class="{active: onlyShowText}"
          @click="toggleOnlyShowText"
        ><span class="icon-check_circle"></span></button>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
    <div class="rating-list-wrapper">
      <ul class="rating-list">
        <li
          v-for="ratingItem in filteredRatings"
          :key="ratingItem.rateTime + ratingItem.text"
          class="o-food-rating-item-wrapper border-bottom-1px"
        >
          <o-rating-item-food
            v-if="isForFood"
            :rating="ratingItem"
          ></o-rating-item-food>
          <o-rating-item-seller
            v-else
            :rating="ratingItem"
          ></o-rating-item-seller>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ORatingItemFood from '@comp/o-rating-item-food/o-rating-item-food';
import ORatingItemSeller from '@comp/o-rating-item-seller/o-rating-item-seller';

// 0与1和rating.rateType是一致的
const GOOD = 0;
const BAD = 1;
const ALL = 2;

export default {
  components: {
    ORatingItemFood,
    ORatingItemSeller
  },
  props: {
    ratingTitle: {
      type: String,
      default: ''
    },
    typeStrs: {
      type: Array,
      default() {
        return ['全部', '满意', '不满意'];
      }
    },
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否用于表示食物评论（否则是商品评论）
    isForFood: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedType: ALL,
      onlyShowText: false
    };
  },
  computed: {
    // 将类型字符串和类型数字对应，数组顺序关乎渲染顺序
    typeMap() {
      let s = this.typeStrs;
      let totalCount = this.ratings.length;
      let goodCount = this.ratings.reduce((prev, cur) => {
        return (cur.rateType === GOOD ? 1 : 0) + prev;
      }, 0);
      return [
        {
          str: s[0],
          type: ALL,
          cls: 'all',
          count: totalCount
        },
        {
          str: s[1],
          type: GOOD,
          cls: 'good',
          count: goodCount
        },
        {
          str: s[2],
          type: BAD,
          cls: 'bad',
          count: totalCount - goodCount
        }
      ];
    },
    filteredRatings() {
      return this.ratings.filter(rating => {
        if (this.onlyShowText && !rating.text) return false;
        switch (this.selectedType) {
          case GOOD:
            return rating.rateType === GOOD;
          case BAD:
            return rating.rateType === BAD;
          default:
            return true;
        }
      });
    }
  },
  watch: {
    ratings() {
      // 查看新的食物，复位评论控制栏
      this.selectedType = ALL;
      this.onlyShowText = false;
    }
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
    },
    toggleOnlyShowText() {
      this.onlyShowText = !this.onlyShowText;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.wrapper
  .controller
    padding: 18px 18px 0 18px
    font-size: 14px
    line-height: 14px
    color: rgb(7, 17, 27)
    font-weight: 400
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)

    .rating-title
      padding-bottom: 18px

    .type-selector-wrapper
      padding-bottom: 18px
      border-bottom-1px(rgba(7, 17, 27, 0.1))

      .type-selector
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 12px
        font-size: 12px
        line-height: 16px

        .count
          font-size: 8px

        &.all
          background-color: rgba(0, 160, 220, 0.2)

        &.good
          color: rgb(77, 85, 93)
          background-color: rgba(0, 160, 220, 0.2)

        &.bad
          color: rgb(77, 85, 93)
          background-color: rgba(77, 85, 93, 0.2)

        &.active
          color: rgb(255, 255, 255)
          background-color: rgb(0, 160, 220)

    .only-show-text
      padding: 12px 0
      font-size: 0

      .toggle-btn, .text
        display: inline-block
        vertical-align: top
        line-height: 24px
        color: rgb(147, 153, 159)

      .toggle-btn
        font-size: 24px

        &.active
          color: rgb(0, 160, 200)

      .text
        font-size: 12px

  .rating-list-wrapper
    padding: 0 18px

    .rating-list
      .o-food-rating-item-wrapper
        border-bottom-1px(rgba(7, 17, 27, 0.1))
</style>
