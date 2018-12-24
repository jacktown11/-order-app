<template>
  <div
    class="scroll-wrapper"
    ref="scrollWrapper"
  >
    <div class="seller-wrapper">

      <!-- 商家概览 -->
      <div class="overview">
        <div class="content-top border-bottom-1px">
          <div class="info">
            <h2 class="title">{{seller.name}}</h2>
            <div class="rate-and-sell">
              <div class="base-star-bar-wrapper">
                <base-star-bar
                  class="star-bar"
                  :size="36"
                  :score="seller.score"
                ></base-star-bar>
              </div>
              <p class="rating-count">({{seller.ratingCount}})</p>
              <p class="sell-count">月售{{seller.sellCount}}单</p>
            </div>
          </div>
          <div class="store-wrapper">
            <p
              class="store-icon"
              @click="toggleStore"
            >
              <span
                class="icon-favorite"
                :class="{stored: isStored}"
              ></span>
            </p>
            <p
              class="store-state"
              @click="toggleStore"
            >{{isStored? '已收藏' : '收藏'}}</p>
          </div>
        </div>
        <div class="content-bottom">
          <div class="info-item">
            <p class="info-title">起送价</p>
            <p class="info-content"><span class="number">{{seller.minPrice}}</span>元</p>
          </div>
          <div class="info-item">
            <p class="info-title">商家配送</p>
            <p class="info-content"><span class="number">{{seller.deliveryPrice}}</span>元</p>
          </div>
          <div class="info-item">
            <p class="info-title">平均配送时间</p>
            <p class="info-content"><span class="number">{{seller.deliveryTime}}</span>分钟</p>
          </div>
        </div>
      </div>

      <!-- 分隔条 -->
      <div class="base-split-wrapper">
        <base-split></base-split>
      </div>

      <!-- 公告与活动 -->
      <div class="bulletin-and-activity">
        <h2 class="title">公告与活动</h2>
        <p class="bulletin">{{seller.bulletin}}</p>
        <ul class="supports">
          <li
            class="support-item border-top-1px"
            v-for="support in seller.supports"
            :key="support.description"
          >
            <span class="support-icon">
              <base-icon
                :type-num="support.type"
                :suffix-num="4"
              ></base-icon>
            </span>
            <span class="support-desc">{{support.description}}</span>
          </li>
        </ul>
      </div>

      <!-- 分隔条 -->
      <div class="base-split-wrapper">
        <base-split></base-split>
      </div>

      <!-- 商家图片 -->
      <div class="environment-images">
        <h2 class="title">商家实景</h2>
        <div
          class="images-wrapper"
          ref="imagesWrapper"
        >
          <ul
            class="image-list"
            ref="imageList"
          >
            <li
              class="image-item"
              v-for="pic in seller.pics"
              :key="pic"
            >
              <img
                class="img"
                :src="pic"
                alt="商家图片"
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- 分隔条 -->
      <div class="base-split-wrapper">
        <base-split></base-split>
      </div>

      <!-- 商家信息 -->
      <div class="seller-info">
        <h2 class="title">商家信息</h2>
        <ul class="info-content">
          <li
            class="info-item"
            v-for="info in seller.infos"
            :key="info"
          >{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { getSeller, setSeller } from '@common/js/util';

import BaseStarBar from '@comp/base/base-star-bar/base-star-bar';
import BaseSplit from '@comp/base/base-split/base-split';
import BaseIcon from '@comp/base/base-icon/base-icon';

export default {
  components: {
    BaseStarBar,
    BaseSplit,
    BaseIcon
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isStored: (() => {
        return !!this.seller.id && getSeller(this.seller.id, 'isStored', false);
      })()
    };
  },
  mounted() {
    this.allScroll = new BScroll(this.$refs.scrollWrapper, {
      click: true
    });
    this._setImagesScroll();
  },
  watch: {
    seller() {
      this._setImagesScroll();
    }
  },
  methods: {
    _setImagesScroll() {
      // if has got seller's data
      if (this.seller.pics) {
        let w = 120;
        let m = 6;
        let count = this.seller.pics.length;
        let imageList = this.$refs.imageList;
        let width = (w + m) * count - m;
        imageList.style.width = width + 'px';
      }

      // init scroll in next tick
      this.$nextTick(() => {
        if (!this.imagesScroll) {
          this.imagesScroll = new BScroll(this.$refs.imagesWrapper, {
            scrollX: true,
            eventPassThrough: 'vertical'
          });
        } else {
          this.imagesScroll.refresh();
        }
      });
    },
    toggleStore(event) {
      if (event._constructed) {
        this.isStored = !this.isStored;
        setSeller(this.seller.id, 'isStored', this.isStored);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.scroll-wrapper
  position: absolute
  left: 0
  top: 174px
  bottom: 0
  width: 100%
  overflow: hidden

  .seller-wrapper
    width: 100%

    .overview
      width: 100%
      padding: 18px
      box-sizing: border-box

      .content-top
        width: 100%
        padding-bottom: 18px
        display: flex
        border-bottom-1px(rgba(7, 17, 27, 0.1))
        align-items: center

        .info
          flex: 4

          .title
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 14px

          .rate-and-sell
            margin-top: 8px

            .base-star-bar-wrapper, .rating-count, .sell-count
              display: inline-block
              height: 18px
              line-height: 18px
              vertical-align: top

            .base-star-bar-wrapper
              margin-right: 8px

              .star-bar
                display: inline-block

            .rating-count, .sell-count
              font-size: 10px
              color: rgb(77, 85, 93)

            .rating-count
              margin-right: 12px

        .store-wrapper
          flex: 1
          width: 100%
          text-align: center

          .store-icon
            font-size: 24px
            line-height: 24px
            color: #d4d6d9

            .icon-favorite
              padding: 0 5px

              &.stored
                color: rgb(240, 20, 20)

          .store-state
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 10px
            margin-top: 4px

      .content-bottom
        display: flex
        align-items: center
        padding: 18px 0

        .info-item
          flex: 1
          border-right-1px(rgba(7, 17, 27, 0.1))
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
          text-align: center

          .info-content
            margin-top: 4px
            color: rgb(7, 17, 27)

            .number
              font-size: 24px
              font-weight: 200
              line-height: 24px

          &:last-child
            border-right-none()

    .bulletin-and-activity
      margin: 18px
      font-size: 12px

      .title
        font-size: 14px
        color: rgb(7, 17, 27)

      .bulletin
        padding: 8px 12px 16px 8px
        color: rgb(240, 20, 20)
        font-weight: 200
        line-height: 24px

      .supports
        .support-item
          padding: 16px 12px
          height: 16px
          font-weight: 200
          border-top-1px(rgba(7, 17, 27, 0.1))

          .support-icon, .support-desc
            display: inline-block
            vertical-align: top
            height: 16px
            line-height: 16px

          .support-icon
            margin-right: 6px

    .environment-images
      padding: 18px

      .title
        font-size: 14px
        color: rgb(7, 17, 27)

      .images-wrapper
        margin-top: 12px
        height: 90px
        width: 100%
        overflow: hidden
        position: relative

        .image-list
          height: 90px
          line-height: 90px
          white-space: nowrap

          .image-item
            display: inline-block
            vertical-align: top
            height: 90px
            margin-right: 6px

            .img
              display: inline-block
              width: 120px
              height: 90px

              &:last-child
                margin-right: 0

    .seller-info
      margin: 18px

      .title
        font-size: 14px
        color: rgb(7, 17, 27)

      .info-content
        margin-top: 12px

        .info-item
          border-top-1px(rgba(7, 17, 27, 0.1))
          padding: 16px 12px
          font-size: 12px
          font-weight: 200
          color: rgb(7, 17, 27)
          line-height: 16px
</style>
