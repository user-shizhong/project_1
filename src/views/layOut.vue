<template>
  <div>
    <el-container>
      <el-aside width="200px" class="aside">
        <nav-left></nav-left>
      </el-aside>
      <el-container class="rpart">
        <el-header>
          <top-head></top-head>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <el-footer>
          <p>京ICP备8888888号 京安网备123456号</p> 
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavLeft from "@/components/NavLeft.vue";
import TopHead from "@/components/TopHead.vue";
export default {
  components: {
    NavLeft,TopHead
  },
};
</script>

<style lang="less" scoped>
.aside{
  height: 100vh;
  background: #001529;
}
.rpart{background: #e9eef3;}
.el-header{padding: 0;}
::-webkit-scrollbar{
    display: none;
  }
  .main{
    height: 70vh;
  }
  p{text-align: center;margin-top: 10px;font-size: 12px;}
</style>