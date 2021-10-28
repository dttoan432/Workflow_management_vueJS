<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <i class="el-icon-eleme"></i>
        <span>Penguin</span>
      </div>
      <div class="user">
        <el-dropdown trigger="click">
          <img src="../assets/images/avatar-login.svg" alt="">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="item-mng" @click="handlePush('user')">
                <i class="el-icon-setting"></i>
                Tài khoản
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="item-mng" @click="handlePush('login')">
                <i class="el-icon-switch-button"></i>
                Đăng xuất
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="24">
          <div>
            <router-view/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  methods: {
    handlePush(value) {
      this.$router.push({ path: `/${value}` })
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
@import "../assets/styles/Admin";
</style>