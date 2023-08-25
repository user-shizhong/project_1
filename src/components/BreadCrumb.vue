<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                breadlist:[]
            }
        },
        created(){
            this.getBreadCrumb()
        },
        watch:{
           $route(){
            this.getBreadCrumb()
           }
        },
        methods:{
            getBreadCrumb(){
                this.breadlist= this.$route.meta.bread
            }
        }
    }
</script>

<style lang="less" scoped>

</style>