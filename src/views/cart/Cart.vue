<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/Navbar'

  import  {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar
    },
    computed:{
      ...mapGetters(['cartLength','cartList'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
