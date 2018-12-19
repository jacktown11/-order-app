<template>
<div class="food-handler">
  <div v-show="!isEmpty" class="decrease" @click="minus">
    <span class="icon-remove_circle_outline"></span>
  </div>
  <div v-show="!isEmpty" class="count">{{count}}</div>
  <div class="increase" @click="add">
    <span class="icon-add_circle"></span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      count: 0
    };
  },
  computed: {
    isEmpty () {
      return this.count === 0;
    }
  },
  watch: {
    count (val) {
      this.$emit('update-cart', {
        food: this.food,
        count: this.count
      });
    }
  },
  methods: {
    add () {
      this.count++;
    },
    minus () {
      if (this.count > 0) this.count--;
    }
  }
};
</script>

<style scoped lang="stylus">
.food-handler
  font-size: 0
  .decrease, .count, .increase
    display: inline-block
    vertical-align: top
    font-size: 24px
    color: rgb(0, 160, 220)
    line-height: 24px
  .count
    width: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
</style>
