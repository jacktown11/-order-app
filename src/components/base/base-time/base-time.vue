<template>
  <span class="time">{{formattedTime}}</span>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: new Date().getTime()
    }
  },
  computed: {
    formattedTime() {
      let t = new Date(this.time);
      return (
        t.getFullYear() +
        '-' +
        (t.getMonth() + 1) +
        '-' +
        (t.getDay() + 1) +
        ' ' +
        t.getHours() +
        ':' +
        t.getMinutes()
      );
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
