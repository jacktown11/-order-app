<template>
  <div class="wrapper">
    <div class="about">
      <div class="rate-time-wrapper">
        <base-time :time="rating.rateTime"></base-time>
      </div>
      <div class="username">{{rating.username}}</div>
      <div class="user-avatar">
        <img
          class="avatar"
          :src="rating.avatar"
          alt="评论者头像"
        >
      </div>
    </div>
    <p class="content">
      <span class="thumb-gesture"><span :class="thumbCls"></span></span>
      <span class="text">{{rating.text}}</span>
    </p>
  </div>
</template>

<script>
import BaseTime from '@comp/base/base-time/base-time';

const GOOD = 0;
const BAD = 1;
export default {
  components: {
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
.wrapper
  width: 100%
  padding: 16px 0

  .about
    display: flex
    font-size: 10px
    line-height: 12px
    color: rgb(147, 153, 159)

    .rate-time-wrapper
      flex: 2

    .username
      flex: 1
      text-align: right

    .user-avatar
      flex: 0 0 12px
      margin-left: 6px
      width: 12px
      height: 12px

      .avatar
        width: 100%
        height: 100%
        border-radius: 50%

  .content
    padding-top: 6px
    font-size: 0

    .thumb-gesture, .text
      display: inline-block
      font-size: 12px
      line-height: 24px

    .thumb-gesture
      margin-right: 4px

      .icon-thumb_up
        color: rgb(0, 160, 220)

      .icon-thumb_down
        color: rgb(147, 153, 159)

    .text
      color: rgb(7, 17, 27)
</style>
