<template>
   <div class="card-container">
      <div class="card-title-wrap">
         <div class="card-title">
            <input type="text" class="card-title-name" placeholder="Nhập tên thẻ" v-model="card.title">
         </div>
         <div class="card-utilities">
            <i class="el-icon-paperclip card-attach-item"></i>
            <i class="el-icon-magic-stick card-attach-item"></i>
         </div>
      </div>
      <div class="card-content">
         <el-form label-position="left" label-width="200px" :model="card">
            <el-form-item label="Nhãn">
               <el-input v-model="card.title"></el-input>
            </el-form-item>
            <el-form-item label="Activity zone">
               <el-input v-model="card.title"></el-input>
            </el-form-item>
            <el-form-item label="Mô tả">
               <textarea v-model="card.description" cols="30" rows="10">aa</textarea>
            </el-form-item>
         </el-form>

         <button @click="test">aa</button>
         <el-date-picker
             v-model="value"
             @change="test"
             type="date"
             placeholder="Pick a Date"
             format="yyyy/MM/dd">
         </el-date-picker>
      </div>

   </div>
</template>

<script>
export default {
   name: "TaskDetail",
   props: [
       'card'
   ],
   data() {
      return {
         value: ''
      }
   },
   methods: {
      test() {

      }
   }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/TaskDetail";
</style>