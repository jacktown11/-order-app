<template>
  <div id="app">
    <o-header :seller="seller"></o-header>
    <div class="tab border-bottom-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { parseUrl } from '@common/js/util';
import OHeader from '@comp/o-header/o-header';

const OK_ERRNUM = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          return parseUrl().id || 1000;
        })()
      }
    };
  },
  components: {
    OHeader
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then(
      res => {
        if (res.data && res.data.errNum === OK_ERRNUM) {
          this.seller = Object.assign({}, this.seller, res.data.data);
        }
      },
      err => {
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
