<template>
<div class="goods">
  <div class="menu-wrapper menu-wrapper-hook" ref="menu">
    <ul v-if="goods.length>0">
      <li class="category-wrapper border-bottom-1px category-wrapper-hook"
        :class="{current: index === currentIndex}"
        v-for="(category, index) in goods" :key="category.name"
        @click="selectCategory($event, index)">
        <span class="category">
          <o-icon class="category-icon" v-if="category.type >= 0" :typeNum="category.type" :suffixNum="3"></o-icon>
          <span class="name">{{category.name}}</span>
        </span>
      </li>
    </ul>
  </div>
  <div class="goods-wrapper" ref="goods">
    <ul>
      <li
        class="food-category-list food-category-list-hook"
        v-for="foodList in goods"
        :key="foodList.name">
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
                <span class="now">&#00165;<span class="number">{{food.price}}</span></span>
                <span v-if="food.oldPrice" class="old">&#00165;<span class="number">{{food.oldPrice}}</span></span>
              </p>
              <div class="food-handler-wrapper">
                <o-food-handler :food="food" @update-cart="updateCart($event)"></o-food-handler>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <o-shopcart :seller="seller" :cart-content="cartContent"></o-shopcart>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import OIcon from '@comp/o-icon/o-icon';
import OShopcart from '@comp/o-shopcart/o-shopcart';
import OFoodHandler from '@comp/o-food-handler/o-food-handler';

const OK_ERRNUM = 0;

export default {
  components: {
    OIcon,
    OShopcart,
    OFoodHandler
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
      scrollY: 0,
      _menuScroll: null,
      _goodsScroll: null,
      _elInGoods: null,
      _elInMenu: null,
      isClicked: false, // this will be set to true when click menu, and set to false on foods scroll
      cartContent: []
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
            this._elInMenu = this.$refs.menu.getElementsByClassName('category-wrapper-hook');
            this._elInGoods = this.$refs.goods.getElementsByClassName('food-category-list-hook');
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
      while (!!hArr[i + 1] && y >= hArr[i + 1]) i++;
      return i;
    }
  },
  watch: {
    currentIndex (val) {
      if (!this.isClicked) {
        // 不是点击引起的改变（右侧食物列表的滚动引起）
        // 让对应的食物分类菜单栏跟随滚动高视野中
        this.scrollToInMenu(this.currentIndex, 300);
      }
    }
  },
  methods: {
    _initScroll () {
      this._menuScroll = new BScroll(this.$refs.menu, {
        click: true
      });
      this._goodsScroll = new BScroll(this.$refs.goods, {
        click: true,
        probeType: 3
      });
      this._goodsScroll.on('scroll', (pos) => {
        this.isClicked = false;
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
    },
    /**
     * 该函数专门用于直接跳转到某一个分类
     * 没有动画过程，所以不会触发食物列表的`scroll`事件
     * scrollY需要手动更新
     */
    selectCategory (event, index) {
      if (!event._constructed) return;
      this.isClicked = true;
      this.scrollToInGoods(index, 0);
      this.scrollY = this.goodsHeight[index];
    },
    scrollToInGoods (index, time) {
      this._goodsScroll.scrollToElement(this._elInGoods[index], time);
    },
    scrollToInMenu (index, time) {
      this._menuScroll.scrollToElement(this._elInMenu[index], time);
    },
    updateCart (orderItem) {
      let { food, count } = orderItem;
      let len = this.cartContent.length;
      for (let i = 0; i < len; i++) {
        let item = this.cartContent[i];
        // this food already exist
        if (item.food === food) {
          // refresh count
          if (count > 0) {
            this.$set(this.cartContent, i, orderItem);
          } else {
            // count is 0, just remove it
            this.cartContent.splice(i, 1);
          }
          return;
        }
      }
      // a new kind of food is added
      if (count > 0) {
        this.cartContent.push(orderItem);
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
  bottom: 48px
  width: 100%
  overflow: hidden

  .menu-wrapper
    flex: 0 0 80px
    background-color: #f3f5f7
    .category-wrapper
      display: table
      width: 56px
      height: 54px
      padding: 0 12px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background-color: #ffffff
        font-size: 12px
        line-height: 14px
        color: rgb(240, 20, 20)
        .category
          border-bottom-none()
        &:first-child
          margin-top: 0
      .category
        display: table-cell
        width: 56px
        font-size: 12px
        line-height: 14px
        vertical-align: middle
        color: rgb(20, 20, 20)
        border-bottom-1px(rgba(7, 17, 27, 0.1))
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
            position: relative
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
            .food-handler-wrapper
              position: absolute
              bottom: 0
              right: 0
</style>
