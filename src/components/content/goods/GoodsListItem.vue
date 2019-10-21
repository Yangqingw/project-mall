<template>
    <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    width: 48%;
    padding-bottom: 60px;
  }
  .goods-item img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
  .goods-info{
    width: 100%;
    text-align: center;
  }
  .goods-info p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .price{
    float: left;
    margin-left: 15px;
    color:var(--color-high-text)
  }
  .collect{
    margin-right: 15px;
    float: right;
    position: relative;
  }
  .collect::before{
    content: '';
    position:absolute;
    left: -20px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
