<template>
  <span class="time">{{formattedTime}}</span>
</template>

<script>
import { formatDate } from '@common/js/date';

export default {
  props: {
    time: {
      type: Number,
      default: new Date().getTime()
    }
  },
  computed: {
    formattedTime() {
      return formatDate(new Date(this.time), 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>

<style scoped lang="stylus">
.time
  font-size: 10px
  line-height: 12px
  font-weight: 200
  color: rgb(147, 153, 159)
</style>
