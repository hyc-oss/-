<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item>
        <span>社区</span>
        <template slot="icon">
          <img src="@/assets/tabbar/community.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/analysis">
        <span>数据分析</span>
        <template slot="icon">
          <img src="@/assets/tabbar/analysis.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home">
        <template slot="icon">
          <img src="@/assets/tabbar/home.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/service">
        <span>服务</span>
        <template slot="icon">
          <img src="@/assets/tabbar/service_act.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <span>我的</span>
        <template slot="icon">
          <img src="@/assets/tabbar/mine.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '/service'
    }
  }
};
</script>

<style scoped lang="scss">

</style>