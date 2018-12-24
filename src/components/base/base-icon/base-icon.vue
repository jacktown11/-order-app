<template>
<span class="icon" :class="classArr"></span>
</template>

<script>
export default {
  props: {
    typeNum: {
      type: Number
    },
    suffixNum: {
      type: Number
    }
  },
  data () {
    return {
      typeClsMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      sizeClsMap: ['size12', 'size16']
    };
  },
  computed: {
    classArr () {
      let typeCls = this.typeClsMap[this.typeNum];
      let picCls = typeCls + '_' + this.suffixNum;
      let sizeCls = this.sizeClsMap[(this.suffixNum + 1) % 2];
      return [typeCls, picCls, sizeCls];
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.icon
  display: inline-block
  background-repeat: no-repeat

  &.size12
    width: 12px
    height: 12px
    background-size: 12px 12px

  &.size16
    width: 16px
    height: 16px
    background-size: 16px 16px

  &.decrease_1
    bg-img('decrease_1')
  &.decrease_2
    bg-img('decrease_2')
  &.decrease_3
    bg-img('decrease_3')
  &.decrease_4
    bg-img('decrease_4')

  &.discount_1
    bg-img('discount_1')
  &.discount_2
    bg-img('discount_2')
  &.discount_3
    bg-img('discount_3')
  &.discount_4
    bg-img('discount_4')

  &.guarantee_1
    bg-img('guarantee_1')
  &.guarantee_2
    bg-img('guarantee_2')
  &.guarantee_3
    bg-img('guarantee_3')
  &.guarantee_4
    bg-img('guarantee_4')

  &.invoice_1
    bg-img('invoice_1')
  &.invoice_2
    bg-img('invoice_2')
  &.invoice_3
    bg-img('invoice_3')
  &.invoice_4
    bg-img('invoice_4')

  &.special_1
    bg-img('special_1')
  &.special_2
    bg-img('special_2')
  &.special_3
    bg-img('special_3')
  &.special_4
    bg-img('special_4')
</style>
