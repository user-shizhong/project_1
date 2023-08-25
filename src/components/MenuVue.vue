<template>
    <div>
        <el-menu
        background-color="#001529"
        text-color="#fff"
        :router="true"
        >
            <el-submenu v-if="menu.children" :index="menu.url" class="mit">
                <template slot="title">
                   <i :class="menu.icon"></i>
                   <span slot="title">{{ menu.name }}</span>
                </template>
                 <!-- 递归 -->
                <nav-menu v-for="(item,index) in menu.children" :key="index" :menu="item"></nav-menu>
            </el-submenu>
            <el-menu-item v-else :index="menu.url" class="mit">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name:"NavMenu",
        props:{
            menu:{
                type:Object,
                requird:true
            }
        }
    }
</script>

<style lang="less" scoped>
.mit{
    width: 200px;
}

</style>