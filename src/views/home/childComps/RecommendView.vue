<template>
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <p>{{item.title}}</p>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
    padding: 10px 0 30px;
  }
  .recommend-item{
    flex: 1;
    margin: 0 5px;
  }
  .recommend-item img{
    width: 100%;
  }

</style>
