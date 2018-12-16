<template>
  <div id="app">
    <o-header :seller="seller"></o-header>
    <div class="tab border-bottom-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import OHeader from '@comp/o-header/o-header';

const OK_ERRNUM = 0;

export default {
  data () {
    return {
      seller: {}
    };
  },
  components: {
    OHeader
  },
  created () {
    this.$http.get('/api/seller').then(
      (res) => {
        let body = res.body;
        if (body.errNum === OK_ERRNUM) {
          this.seller = body.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-bottom-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      font-size: 14px
      text-align: center
      & > a
        display: block
        color: rgb(77, 85, 93)
        &.active-link
          color: rgb(240, 20, 20)
</style>
