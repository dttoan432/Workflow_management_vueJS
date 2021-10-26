<template>
  <div class="user-wrap">
    <img class="bg-user" src="../../assets/images/bg-user.svg" alt="">
    <div class="user-box">
      <form action="">
        <h3>Thông tin tài khoản</h3>
      
        <div class="info" v-if="active">
          <div class="avatar">
            <div class="bor-avatar">
              <img src="../../assets/images/avatar-login.svg" alt="">
            </div>
            <div class="change-avatar">
              <label>Ảnh đại diện</label>
              <el-upload action="" class="upload-demo">
                <i class="el-icon-edit btn-edit-avatar"></i>
              </el-upload>
            </div>
          </div>

          <div class="user-name">
            <p>Họ và tên</p>
            <el-input placeholder="Nhập họ tên" v-model="name"></el-input>
          </div>
        </div>

        <div class="password" v-if="!active">
          <p>Mật khẩu mới</p>
          <el-input placeholder="Nhập mật khẩu mới" v-model="name"></el-input>
          <p>Xác nhận mật khẩu</p>
          <el-input placeholder="Nhập mật khẩu mới" v-model="name"></el-input>
        </div>

        <div class="concat">
          <span @click="convert()">{{ nameConvert }}</span>
          <el-button type="primary" size="medium">Lưu</el-button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      avatar: '',
      name: '',
      nameConvert: 'Thay đổi mật khẩu',
      active: true
    };
  },
  methods: {
    convert() {
      this.active = !this.active
    }
  },
  watch: {
    active(value) {
      (value === true) ? this.nameConvert = 'Thay đổi mật khẩu' : this.nameConvert = 'Thay đổi thông tin'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/User";
</style>