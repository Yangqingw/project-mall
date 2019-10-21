<template>
    <div id="detail" >
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imggLoad="imggLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommends" :goods="recommends"/>
      </scroll>

      <detail-buttom-bar @addCart="addToCart"/>
      <back-top @click.native="backClick"  v-show="isShowBackTop"/>
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailButtomBar from  './childComps/DetailButtomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import  BackTop from 'components/content/backtop/BackTop'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo:{},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop:false
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailButtomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    created() {
      //保存请求的iid
      this.iid = this.$route.params.iid
      //根据iid请求数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //获取顶部轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //保存商品详情数据
        this.detailInfo = data.detailInfo
        //获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取商品评论信息
        if(data.rate.cRate !== 0 ){
          this.commentInfo = data.rate.list[0]
        }

      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods:{
      imggLoad(){
        this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      contentScroll(position){
        const positionY = -position.y
        const length = this.themeTopYs.length
        for(let i = 0; i<length; i++){
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //是否显示回到顶部
        this.isShowBackTop = (-position.y) > 500;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        //2.将商品添加到购物车
        this.$store.dispatch('addCart',product)
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
