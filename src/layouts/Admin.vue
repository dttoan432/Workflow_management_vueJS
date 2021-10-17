<template>
    <div class="container">
        <div class="header">
            <el-row>
                <el-col :span="12"><div class="grid-content logo">Logo</div></el-col>
                <el-col :span="12"><div class="grid-content user">Avatar</div></el-col>
            </el-row>
        </div>
        <div class="content">
            <el-row>
                <el-col :span="24"><div class="grid-content">
                    <router-view/>
                </div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "Admin"
}
</script>

<style scoped lang="scss">
    .container {
        .header {
            .logo {
                background-color: #42b983;
            }
            .user {
                background-color: gray;
            }
        }

        .content {
            background-color: red;
        }
    }
</style>