<template>
<div class="goods">
  <div class="menu-wrapper menu-wrapper-hook" ref="menu">
    <ul v-if="goods.length>0">
      <li class="category-wrapper border-bottom-1px"
        :class="{current: index === currentIndex}" 
        v-for="(category, index) in goods" :key="category.name">
        <span class="category">
          <o-icon class="category-icon" v-if="category.type >= 0" :typeNum="category.type" :suffixNum="3"></o-icon>
          <span class="name">{{category.name}}</span>
        </span>
      </li>
    </ul>
  </div>
  <div class="goods-wrapper" ref="goods">
    <ul>
      <li class="food-category-list food-category-list-hook" v-for="foodList in goods" :key="foodList.name">
        <h2 class="category-name">{{foodList.name}}</h2>
        <ul class="food-category">
          <li class="food-item" v-for="food in foodList.foods" :key="food.name">
            <div class="food-pic">
              <img class="picture" :src="food.image" alt="食物图片">
            </div>
            <div class="food-info">
              <h3 class="name">{{food.name}}</h3>
              <p v-if="food.description" class="description">{{food.description}}</p>
              <p class="sell-status">
                <span class="count">月售{{food.sellCount}}份</span>
                <span class="ratings">好评率{{food.rating}}%</span>
              </p>
              <p class="price">
                <span class="now">&#65509;<span class="number">{{food.price}}</span></span>
                <span v-if="food.oldPrice" class="old">&#65509;<span class="number">{{food.oldPrice}}</span></span>
              </p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import OIcon from '@comp/o-icon/o-icon';
import BScroll from 'better-scroll';

const OK_ERRNUM = 0;

export default {
  components: {
    OIcon
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      goodsHeight: [],
      scrollY: 0
    };
  },
  created () {
    this.$http.get('/api/goods').then(
      (res) => {
        let data = res.body;
        if (data.errNum === OK_ERRNUM) {
          this.goods = data.data;
          this.$nextTick(() => {
            this._calculateHeight();
            this._initScroll();
          });
        }
      }
    );
  },
  computed: {
    currentIndex () {
      let i = 0;
      let y = this.scrollY;
      let hArr = this.goodsHeight;
      while (!!hArr[i + 1] && y > hArr[i + 1]) i++;
      return i;
    }
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      });
      this.goodsScroll = new BScroll(this.$refs.goods, {
        probeType: 3
      });
      this.goodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight () {
      let height = 0;
      let arr = this.goodsHeight;
      let categoryList = this.$refs.goods.getElementsByClassName('food-category-list-hook');
      arr.push(height);
      for (let i = 0; i < categoryList.length; i++) {
        height += categoryList[i].clientHeight;
        arr.push(height);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/mixin.styl'

.goods
  position: absolute
  display: flex
  top: 174px
  bottom: 47px
  width: 100%
  overflow: hidden

  .menu-wrapper
    flex: 0 0 80px
    background-color: #f3f5f7
    .category-wrapper
      display: table
      width: 80px
      height: 54px
      border-bottom-1px(rgba(7, 17, 27, 0.1))
      &.current
        background-color: #ffffff
        font-size: 12px
        line-height: 14px
        color: rgb(240, 20, 20)
      .category
        display: table-cell
        width: 56px
        padding: 0 12px
        font-size: 12px
        line-height: 14px
        vertical-align: middle
        color: rgb(20, 20, 20)
        .category-icon
          position: relative
          vertical-align: top
          top: 1px
          margin-right: 2px

  .goods-wrapper
    flex: 1
    .food-category-list
      .category-name
        display: flex
        height: 26px
        border-left: 2px solid #d9dde1
        padding-left: 12px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
      .food-category
        margin: 0 18px
        .food-item
          display: flex
          padding: 18px 0
          border-bottom-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-bottom-none()
          .food-pic
            flex: 0 0 60px
            width: 60px
            height: 60px
            .picture
              width: 100%
              height: 100%
          .food-info
            flex: 1
            margin-left: 10px
            .name
              font-size: 14px
              color: rgb(7, 17, 27)
            .description
            .sell-status
              margin-top: 8px
              font-size: 10px
              color: rgb(147, 153, 159)
            .sell-status
              .count
              .ratings
                display: inline-block
                margin-right: 12px
            .price
              line-height: 24px
              font-size: 10px
              font-weight: normal
              .now
                display: inline-block
                vertical-align: top
                margin-right: 8px
                color: rgb(240, 20, 20)
                .number
                  font-size: 14px
                  font-weight: 700
              .old
                display: inline-block
                vertical-align: top
                color: rgb(147, 153, 159)
                text-decoration: line-through
                .number
                  font-weight: 70
</style>
