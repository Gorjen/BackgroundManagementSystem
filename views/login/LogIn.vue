<template>
  <el-form
    ref="form"
    label-width="70px"
    :inline="true"
    :model="form"
    :rules="rules"
    class="container"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username" label="用户名">
      <el-input v-model="form.username" placeholder="请输入用账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Message } from "element-ui";
import Cookie from "js-cookie";
import { getMenu } from "../../api/data.js";

export default {
  name: "LogIn",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log("data", data);
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);

              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);

              this.$router.push("/home");
            } else {
              Message({
                type: "error",
                message: "密码错误!"
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 380px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;

  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }

  .el_input {
    width: 198px;
  }

  .el-button {
    margin-left: 120px;
    margin-top: 10px;
  }
}
</style>
