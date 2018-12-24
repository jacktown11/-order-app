<template>
  <div
    class="star-bar"
    :class="starType"
  >
    <span
      v-for="(classItem, index) in starClassArr"
      class="star-item"
      :class="classItem"
      :key="index"
    ></span>
  </div>
</template>

<script>
const LEN = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    starClassArr() {
      let res = [];
      let score = this.score;
      while (score >= 1) {
        res.push(CLS_ON);
        score--;
      }
      if (score >= 0.5) res.push(CLS_HALF);
      while (res.length < LEN) res.push(CLS_OFF);
      return res;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.star-bar
  font-size: 0

  .star-item
    display: inline-block
    background-repeat: no-repeat

&.star-24
  heihgt: 10px
  line-height: 10px

  .star-item
    width: 10px
    height: 10px
    margin-right: 4px
    background-size: 10px 10px

    &:last-child
      margin-right: 0

    &.on
      bg-img('star24_on')

    &.half
      bg-img('star24_half')

    &.off
      bg-img('star24_off')

&.star-36
  height: 15px
  line-height: 15px

  .star-item
    width: 15px
    height: 15px
    margin-right: 6px
    background-size: 15px 15px

    &:last-child
      margin-right: 0

    &.on
      bg-img('star36_on')

    &.half
      bg-img('star36_half')

    &.off
      bg-img('star36_off')

&.star-48
  height: 20px
  line-height: 20px

  .star-item
    width: 20px
    height: 20px
    margin-right: 20px
    background-size: 20px 20px

    &:last-child
      margin-right: 0

    &.on
      bg-img('star48_on')

    &.half
      bg-img('star48_half')

    &.off
      bg-img('star48_off')
</style>
