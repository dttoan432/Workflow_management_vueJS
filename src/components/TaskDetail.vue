<template>
   <div class="card-container">
      <div class="card-title-wrap">
         <div class="card-title">
            <input type="text" class="card-title-name" placeholder="Nhập tên thẻ" v-model="card.title">
         </div>
         <div class="card-utilities">
            <el-tooltip class="item" effect="dark" content="Đính kèm" placement="bottom">
               <el-upload
                   class="upload-demo"
                   multiple
                   :limit="3" action="">
                  <i class="el-icon-paperclip card-attach-item"></i>
               </el-upload>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Việc cần làm" placement="bottom">
               <el-popover
                   placement="bottom"
                   title="Thêm việc cần làm"
                   width="200"
                   trigger="click">
                  <i class="el-icon-star-off card-attach-item" slot="reference"></i>
                  <div class="box-scp">
                     <input type="text" placeholder="Nhập tên công việc" v-focus>
                     <span></span>
                  </div>
                  <el-button type="primary" plain size="mini" class="scp-001">Thêm</el-button>
               </el-popover>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Xóa thẻ" placement="bottom">
               <i class="el-icon-delete card-attach-item" @click="handleDeleteCard(card.title)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Đóng" placement="bottom">
               <i class="el-icon-close card-attach-item" @click="closeCard()"></i>
            </el-tooltip>
         </div>
      </div>
      <div class="card-content">
         <div class="content">
            <div class="left-box">
               <i class="el-icon-date"></i>
               <label>Thời hạn</label>
            </div>
            <div class="right-box">
               <i class="el-icon-date" @click="showDatePicker()"></i>
               <el-date-picker class="deadline-item" ref="openDatePicker" size="mini" type="daterange" align="right"
                               v-model="deadline" start-placeholder="Bắt đầu" end-placeholder="Kết thúc">
               </el-date-picker>
               <span class="time-span" v-if="deadline.length > 0">{{ getDate() }}</span>
               <span class="time-span" v-else>Đang cập nhật</span>
            </div>
         </div>
         <div class="content">
            <div class="left-box">
               <i class="el-icon-collection-tag"></i>
               <label>Nhãn</label>
            </div>
            <div class="right-box">
               <div class="pill-wrap">
                  <div class="pill" v-for="item in card.labels" :key="item.id" :style="{background: item.color}">
                     {{ item.name }}
                  </div>
                  <i class="el-icon-edit"></i>
               </div>
            </div>
         </div>
         <div class="content content-other">
            <div class="left-box">
               <i class="el-icon-sunny"></i>
               <label>Mô tả</label>
            </div>
            <div class="right-box">
               <el-input
                   type="textarea"
                   :autosize="{ minRows: 5}"
                   placeholder="Please input"
                   v-model="card.description">
               </el-input>
            </div>
         </div>
         <div class="todo-wrap">
            <div class="todo-box" v-for="(element, index) in listTodo" :key="element.id">
               <div class="todo-parent">
                  <div class="todo-parent-title">
                     <i class="el-icon-star-off ico-scp">
                        <input type="text" v-model="element.title">
                        <span></span>
                     </i>
                     <div class="todo-parent-action" @click="handleDeleteChildren(element.title)">Xóa</div>
                  </div>
                  <el-progress :percentage="handleCalculatePercent(element)" color="#409eff"></el-progress>
               </div>
               <div class="todo-children">
                  <el-checkbox class="todo-children-checkbox" v-for="item in element.children"
                               :key="item.id" :checked="item.status">
                     <div class="checkbox-action">
                        <div>{{ item.name }}</div>
                        <div class="checkbox-action-icon">
                           <i class="el-icon-edit"></i>
                           <i class="el-icon-close"></i>
                        </div>
                     </div>
                  </el-checkbox>

                  <div class="list-btn-new-children">
                     <div class="new-children">
                        <el-button type="primary" icon="el-icon-plus" plain size="mini" class="btn-oop oop-1"
                           :class="{ animate__animated: true, animate__fadeInDown: element.show,
                           animate__fadeOutUp: element.hide}" @click="toggleNewChildren(index, element.show)">
                           Thêm
                        </el-button>
                     </div>
                     <div class="new-children"
                          :class="{ animate__animated: true, animate__fadeInUp: element.hide,
                          animate__fadeOutDown: element.show}">
                        <el-button-group class="btn-oop">
                           <el-button type="primary" icon="el-icon-check" plain size="mini"
                                      @click="toggleNewChildren(index, element.show)">
                           </el-button>
                           <el-button type="primary" icon="el-icon-close" plain size="mini"
                                      @click="toggleNewChildren(index, element.show)">
                           </el-button>
                        </el-button-group>
                        <input type="text" class="new-name-children" placeholder="Tên công việc con"
                               v-model="children" v-focus>
                     </div>
                  </div>
               </div>
            </div>

            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :file-list="fileList">
               <el-button size="small" type="primary">Đính kèm</el-button>
            </el-upload>
         </div>
      </div>
   </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import moment from 'moment';
import _ from "lodash";
import 'animate.css';

export default {
   name: "TaskDetail",
   computed: {
      ...mapState('workflow', [
         'isShow',
         'isDsNone',
         'card'
      ]),
   },
   mounted() {

   },
   data() {
      return {
         fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
         deadline: '',
         listTodo: [
            {
               id: 1,
               title: 'Việc cần làm 1',
               children: [
                  { id: 1, name: 'todo 1', status: true },
                  { id: 2, name: 'todo 2', status: false },
                  { id: 3, name: 'todo 3', status: true },
                  { id: 4, name: 'todo 4', status: true },
               ],
               hide: false,
               show: true
            },
            {
               id: 2,
               title: 'Việc cần làm 2',
               children: [
                  { id: 5, name: 'todo 5', status: false },
                  { id: 6, name: 'todo 6', status: true },
                  { id: 7, name: 'todo 7', status: false },
                  { id: 8, name: 'todo 8', status: true },
               ],
               hide: false,
               show: true
            },
         ],
         children: ''
      }
   },
   methods: {
      ...mapMutations('workflow', [
         'updateIsShow',
         'updateIsDsNone',
         'updateCard'
      ]),
      closeCard() {
         this.updateIsShow(false)
         this.updateIsDsNone(true)
      },
      showDatePicker() {
         this.$refs.openDatePicker.showPicker()
      },
      getDate() {
         let start = moment(this.deadline[0]).format('DD/MM')
         let end = moment(this.deadline[1]).format('DD/MM')

         return `${start} - ${end}`
      },
      handleDeleteCard(name) {
         this.$confirm(`Bạn có chắc chắn muốn xóa thẻ "${name}" hay không?`, 'Xóa thẻ', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            this.$message({
               type: 'success',
               message: 'Xóa thẻ thành công'
            });
         });
      },
      handleCalculatePercent(value) {
         let percent = _.filter(value.children, {'status': true}).length / value.children.length * 100
         return percent
      },
      toggleNewChildren(index, bool) {
         this.listTodo[index].show = !bool
         this.listTodo[index].hide = bool
      },
      handleDeleteChildren(name) {
         this.$confirm(`Bạn có chắc chắn muốn xóa "${name}" hay không?`, 'Xóa việc cần làm', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            this.$message({
               type: 'success',
               message: 'Xóa thành công'
            });
         });
      },
      beforeRemove(file) {
         return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
      }
   },
   watch: {
      deadline(value) {
         if (value.length > 0) {
            console.log(moment(value[0]).format("DD/MM/YYYY"))
         }
      },
      show(value) {
         this.hide = !value
      }
   },
   directives: {
      focus: {
         inserted: function (el) {
            el.focus()
         }
      }
   },
}
</script>

<style scoped lang="scss">
@import "../assets/styles/TaskDetail";
</style>