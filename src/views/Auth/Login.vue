<template>
    <div class="container">
        <div class="loginWrap">
            <div class="inputWrap">
                <div class="inputLabel">Tên đăng nhập</div>
                <input type="text">
            </div>
            <div class="inputWrap">
                <div class="inputLabel">Mật khẩu</div>
                <input type="password">
            </div>
            <button class="loginButton">Đăng nhập</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login"
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../../assets/images/bg-login.png');
    background-size: auto;
    background-repeat: no-repeat;
    height: 100vh;

    .loginWrap {
        background: #f5f5f5;
        border: 1px solid #6E6E6E;
        padding: 24px;
        height: 250px;
        width: 300px;

        .inputWrap {
            margin-bottom: 12px;

            .inputLabel {
                font-weight: bold;
                margin-bottom: 8px;
                text-align: left;
            }

            input {
                width: 292px;
                height: 30px;
            }
        }

        button {
            width: 100%;
            height: 40px;
            border-radius: 5px;
            margin-top: 20px;
            background: #0080dd;
            color: #fff;
            border: unset;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>