<template>
  <div class="header">
    <!-- 商家图标和概览信息 -->
    <div class="content-wrapper">
      <div class="seller-avatar">
        <img :src="seller.avatar" alt="商家封面">
      </div>
      <div class="seller-content">
        <h1 class="title">
          <span class="brand"></span>
          <span class="title-text">{{seller.name}}</span>
        </h1>
        <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <o-icon class="support-icon" :typeNum="seller.supports[0].type" :suffixNum="1"></o-icon>
          <span class="support-text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-more" @click="showDetail">
        {{seller.supports.length}}个
        <span class="iconfont icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 商家公告 -->
    <div class="bulletin" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-sample">{{seller.bulletin}}</span>
      <span class="bulletin-detail iconfont icon-keyboard_arrow_right"></span>
    </div>

    <!-- header的背景图片 -->
    <div class="background">
      <img :src="seller.avatar" alt="商家图片背景">
    </div>

    <!-- 商家详情信息弹出层 -->
    <transition name="fade">
      <div v-show="isShowDetail" class="seller-detail" transition="fade">
        <!-- 详情内容 -->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <!-- 商家名标题 -->
            <h1 class="seller-name">{{seller.name}}</h1>
            <!-- 评分星条 -->
            <div class="stars">
              <o-star-bar :size="48" :score="seller.score"></o-star-bar>
            </div>
            <!-- 优惠信息 -->
            <div class="favourable-info">
              <div class="title">
                <div class="line"></div>
                <h2 class="text">优惠信息</h2>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="list">
                <li v-for="support in seller.supports" :key="support.type" class="support-item">
                  <o-icon class="support-icon" :typeNum="support.type" :suffixNum="2"></o-icon>
                  <span class="text">{{support.description}}</span>
                </li>
              </ul>
            </div>
            <!-- 商家公告 -->
            <div class="bulletin-detail">
              <div class="title">
                <div class="line"></div>
                <h2 class="text">商家公告</h2>
                <div class="line"></div>
              </div>
              <div class="bulletion-content">
                {{seller.bulletin}}
              </div>
            </div>
          </div>
        </div>
        <!-- 关闭 -->
        <div class="detail-close">
          <span class="iconfont icon-close" @click="hideDetail"></span>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import OStarBar from '@comp/o-star-bar/o-star-bar';
import OIcon from '@comp/o-icon/o-icon';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      isShowDetail: false
    };
  },
  methods: {
    showDetail () {
      this.isShowDetail = true;
    },
    hideDetail () {
      this.isShowDetail = false;
    }
  },
  components: {
    OStarBar,
    OIcon
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.header
  position: relative
  background-color: rgba(7, 17, 27, 0.5)
  color: #fff
  overflow: hidden

  .content-wrapper
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0px

    .seller-avatar
      display: inline-block
      vertical-align: top

      img
        display: block
        width: 64px
        height: 64px
        border-radius: 4px

    .seller-content
      vertical-align: top
      display: inline-block
      margin-left: 16px

      .title
        margin: 2px 0 8px 0

        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-img('brand')
          background-repeat: no-repeat
          background-size: 30px 18px

        .title-text
          vertical-align: top
          margin-left: 12px
          font-size: 16px
          line-height: 18px
          font-weight: bold

      .description
        font-size: 12px
        padding-bottom: 10px

      .support
        height: 12px
        line-height: 12px
        .support-icon
          vertical-align: top
          margin-right: 4px
        .support-text
          font-size: 10px

    .support-more
      position: absolute
      bottom: 18px
      right: 12px
      height: 10px
      padding: 7px 8px
      border-radius: 24px
      font-size: 10px
      line-height: 10px
      vertical-align: top
      background-color: rgba(0, 0, 0, 0.2)

      .icon-keyboard_arrow_right
        font-size: 10px
        line-height: 10px

  .bulletin
    position: relative
    height: 28px
    padding: 0 26px 0 12px
    line-height: 28px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background-color: rgba(7, 17, 27, 0.2)

    .bulletin-title
      display: inline-block
      vertical-align: top
      margin-top: 8px
      padding-right: 4px
      width: 22px
      height: 12px
      bg-img('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat

    .bulletin-sample
      font-size: 10px

    .bulletin-detail
      position: absolute
      font-size: 10px
      right: 12px
      top: 9px

  .background
    position: absolute
    z-index: -1
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: hidden
    filter: blur(10px)

    img
      width: 100%
      height: 100%
      min-width: 100%
      min-height: 100%

  .fade-transition
    opacity: 0
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0;

  .seller-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background-color: rgba(7, 17, 27, 0.8)
    drop-filter: blur(10px)

    .detail-wrapper
      min-height: 100%
      width: 100%

      .detail-main
        margin: 64px 10% 0 10%
        padding-bottom: 64px

        .seller-name
          font-size: 16px
          line-height: 16px
          font-weight: 700
          text-align: center

        .stars
          margin-top: 16px
          text-align: center

        .favourable-info, .bulletin-detail
          .title
            display: flex
            margin-top: 28px
            .line
              flex: 1
              position: relative
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
              top: -6px

            .text
              font-size: 14px
              font-weight: 700
              padding: 0 12px
          .list
            font-size: 0
            margin: 24px 12px 0 12px

            .support-item
              margin-bottom: 12px

              &:last-child
                margin-bottom: 0

              .support-icon
                vetical-align: top
                margin-right: 6px

              .text
                vertical-align: top
                font-size: 12px
                line-height: 16px

          .bulletion-content
            margin: 24px 12px 0 12px
            font-size: 12px
            line-height: 24px

    .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        text-align: center
        font-size: 32px
        padding-bottom: 32px
        color: rgba(255, 255, 255, 0.5)
</style>
