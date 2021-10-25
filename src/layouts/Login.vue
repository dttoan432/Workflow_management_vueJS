<template>
  <div class="container" :class="{sign_up_mode: transmit}">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <img class="avatar-login" src="../assets/images/avatar-login-male.svg" alt="">
          <h2 class="title">Quản lý công việc</h2>
          <div class="input-field">
            <i class="el-icon-message"></i>
            <input type="text" placeholder="Email"/>
          </div>
          <div class="input-field">
            <i class="el-icon-lock"></i>
            <input type="password" placeholder="Mật khẩu"/>
          </div>
          <input type="submit" value="Đăng nhập" class="btn solid"/>
        </form>
        <form action="#" class="sign-up-form">
          <img class="avatar-login" src="../assets/images/avatar-login-female.svg" alt="">
          <h2 class="title">Quản lý công việc</h2>
          <div class="input-field">
            <i class="el-icon-message"></i>
            <input type="email" placeholder="Email"/>
          </div>
          <div class="input-field">
            <i class="el-icon-user"></i>
            <input type="text" placeholder="Họ tên"/>
          </div>
          <div class="input-field">
            <i class="el-icon-unlock"></i>
            <input type="password" placeholder="Mật khẩu"/>
          </div>
          <div class="input-field">
            <i class="el-icon-lock"></i>
            <input type="password" placeholder="Xác nhận mật khẩu"/>
          </div>
          <input type="submit" class="btn" value="Đăng ký"/>
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Bạn chưa có tài khoản?</h3>
          <p>
            Hãy đăng ký và trải nghiệm ngay hệ thống của tôi, có rất nhiều điều thú vị đang chờ đợi bạn
          </p>
          <button class="btn transparent" id="sign-up-btn" @click="toggleForm">
            Đăng ký
          </button>
        </div>
        <img src="../assets/images/log.svg" class="image" alt=""/>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>Bạn đã có tài khoản?</h3>
          <p>
            Hãy tham gia ngay với tôi, có rất nhiều điều thú vị đang chờ đợi bạn
          </p>
          <button class="btn transparent" id="sign-in-btn" @click="toggleForm">
            Đăng nhập
          </button>
        </div>
        <img src="../assets/images/register.svg" class="image" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      transmit: false
    }
  },
  methods: {
    toggleForm() {
      this.transmit = !this.transmit
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
@import "../assets/styles/Login";
</style>