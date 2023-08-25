<template>
  <div>
    <h1 class="tit">邦达国际物流管理</h1>
    <el-menu 
    >
      <menu-vue v-for="item in menuList" :key="item.url" :menu="item"></menu-vue>
    </el-menu>
  </div>
</template>

<script>
import MenuVue from "./MenuVue.vue";
import { get } from "@/utils/http";
export default {
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    async getMenu() {
      const { data } = await get("/menu");
      this.menuList = data;
    },
  },
  components: {
    MenuVue,
  },
};
</script>

<style lang="less" scoped>
.tit {
  color: aliceblue;
  line-height: 40px;
  text-align: center;

}
</style>