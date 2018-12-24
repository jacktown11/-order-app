<template>
  <div class="rating-item-seller-wrapper">
    <div class="user-info clearfix">
      <div class="avatar-wrapper">
        <img
          class="avatar"
          :src="rating.avatar"
          alt="评论者头像"
        >
      </div>
      <p class="username">{{rating.username}}</p>
      <div class="o-rate-time-wrapper">
        <base-time :time="rating.rateTime"></base-time>
      </div>
    </div>
    <div class="rating-star">
      <div class="base-star-bar-wrapper">
        <base-star-bar
          :size="24"
          :score="rating.score"
        ></base-star-bar>
      </div>
      <div class="delivery-time">{{rating.deliveryTime}}分钟送达</div>
    </div>
    <p
      class="rating"
      v-if="rating.text"
    >{{rating.text}}</p>
    <div class="recommend-wrapper">
      <span
        class="thumb"
        :class="thumbCls"
      ></span>
      <template v-if="rating.recommend && rating.recommend.length > 0">
        <span
          class="recommend-item"
          v-for="item in rating.recommend"
          :key="item"
        >{{item}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import BaseStarBar from '@comp/base/base-star-bar/base-star-bar';
import BaseTime from '@comp/base/base-time/base-time';

const GOOD = 0;
const BAD = 1;
export default {
  components: {
    BaseStarBar,
    BaseTime
  },
  props: {
    rating: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    thumbCls() {
      let rateType = this.rating.rateType;
      return {
        'icon-thumb_up': rateType === GOOD,
        'icon-thumb_down': rateType === BAD
      };
    }
  }
};
</script>

<style scoped lang="stylus">
.rating-item-seller-wrapper
  position: relative
  width: 100%
  padding: 18px 0 18px 40px
  box-sizing: border-box

  .user-info
    width: 100%

    .avatar-wrapper
      position: absolute
      left: 0
      top: 18px

      .avatar
        width: 28px
        height: 28px
        border-radius: 50%

    .username
      float: left
      font-size: 10px
      color: rgb(7, 17, 27)
      line-height: 12px

    .o-rate-time-wrapper
      width: 100%
      text-align: right

  .rating-star
    margin-top: 4px

    .base-star-bar-wrapper, .delivery-time
      display: inline-block
      vertical-align: top

    .base-star-bar-wrapper
      margin-right: 6px

    .delivery-time
      font-size: 10px
      font-weight: 200
      color: rgb(147, 153, 159)
      line-height: 12px

  .rating
    margin-top: 6px
    font-size: 12px
    line-height: 12px
    color: rgb(147, 153, 159)

  .recommend-wrapper
    .thumb, .recommend-item
      margin-top: 8px
      margin-right: 8px
      display: inline-block
      vertical-align: top

    .thumb
      font-size: 12px
      line-height: 16px

      &.icon-thumb_up
        color: rgb(0, 160, 220)

      &.icon-thumb_down
        color: rgb(183, 187, 191)

    .recommend-item
      padding: 0 6px
      font-size: 9px
      line-height: 16px
      color: rgb(147, 153, 159)
      border: 1px solid rgba(7, 17, 27, 0.1)
      border-radius: 2px
</style>
