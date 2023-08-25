<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card class="box-card">
          <div slot="header">
            <h1>邦达国际物流管理平台</h1>
          </div>
          <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%" @click="login" :loading="loading"
                  >主要按钮</el-button
                >
              </el-form-item>
            </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {post} from "@/utils/http"
export default {
  data() {
    return {
      loading:false,
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { 
            required: true,
             message: "请输入用户名称",
              trigger: "blur" 
          },
          {
            pattern: /^\w{4,8}$/,
            message: "请输入4-8位数字字母混合名称",
            trigger: "blur",
          },
        ],
        password: [
          { 
            required: true,
             message: "请输入密码",
              trigger: "blur" 
          },
          { 
            pattern: /^\d{6}$/,
             message: "请输入6位纯数字",
              trigger: "blur" 
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading =true;
          post("/login",this.ruleForm).then(({token,nickname})=>{
            this.loading =false;
            // console.log(req)
            sessionStorage.setItem("token",token)
            sessionStorage.setItem("nickname",nickname)
            this.$router.push("/")
          }).catch(err=>{
            this.loading =false;
            console.log(err)
          })
          // service({
          //   url: "/login",
          //   method:"post",
          //   data:this.ruleForm
          // }).then(req=>{
          //   console.log(2,req)
          // })
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  h1 {
    text-align: center;
  }
  margin-top: 200px;
}
</style>