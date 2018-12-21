<template>
<div class="food-handler">
  <transition name="move">
    <div v-show="!isEmpty" class="decrease" @click="minus">
      <div class="inner">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </div>
  </transition>
  <div v-show="!isEmpty" class="count">{{food.count}}</div>
  <div class="increase" @click="add" ref="increase">
    <span class="icon-add_circle"></span>
  </div>
</div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  computed: {
    isEmpty () {
      return !this.food.count;
    }
  },
  methods: {
    add () {
      // add food count
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }

      // trigger animation
      let rect = this.$refs.increase.getBoundingClientRect();
      this.$emit('add-animate', {
        x: rect.left + 14,
        y: rect.top + 14
      });
    },
    minus () {
      if (this.food.count > 0) this.food.count--;
    }
  }
};
</script>

<style scoped lang="stylus">
.food-handler
  font-size: 0
  position: relative
  .decrease, .count, .increase
    display: inline-block
    vertical-align: top
    width: 24px
    height: 24px
    padding: 2px 0
    font-size: 24px
    color: rgb(0, 160, 220)
    line-height: 24px
    text-align: center
  .decrease
    position: absolute
    right: 52px
    top: 0
    .inner
      width: 100%
      height: 100%
      .icon-remove_circle_outline
        display: inline-block
        width: 100%
        height: 100%
  .count
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .increase
    padding: 2px
  .move-enter, .move-leave-to
    transform: translate3d(50px, 0 , 0)
    .inner
      transform: rotate(180deg)
  .move-enter-active, .move-leave-active
    transition: all 0.3s
    .inner
      transition: all 0.3s
</style>
