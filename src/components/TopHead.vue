<template>
  <div style="background-color: #fff">
    <el-dropdown class="fr head">
      <span class="el-dropdown-link">
        欢迎你{{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <p class="head fr">
      今天是你在阿里的第 <span class="date">{{ day }}</span
      >天
    </p>
    <div class="clear"></div>
  </div>
</template>

<script>
import { get } from "@/utils/http";
export default {
  data() {
    return {
      nickname: sessionStorage.getItem("nickname"),
      time: new Date(),
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    async getDate() {
      const { time } = await get("/in");
      this.time = time;
    },
  },
  computed:{
      day() {
        let now = new Date();
        let target = new Date(this.time);
        return Math.floor((now - target) / 1000 / 60 / 60 / 24);
      },
  },
};
</script>

<style lang="less" scoped>
.head {
  line-height: 60px;
  margin-right: 10px;
}
.date {
  font-size: 24px;
  color: #5696ff;
}
</style>