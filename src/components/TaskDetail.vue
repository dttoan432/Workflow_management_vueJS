<template>
   <div class="card-container">
      <div class="card-title-wrap">
         <div class="card-title">
            <input type="text" class="card-title-name" placeholder="Nhập tên thẻ"
                   v-model="card.title" @blur="handleUpdateCard()">
         </div>
         <div class="card-utilities">
            <el-tooltip class="item" effect="dark" content="Đánh dấu hoàn thành" placement="bottom"
                        v-if="card.deadline">
               <i class="el-icon-check card-attach-item" @click="closeCard()"
                  v-if="card.deadline"></i>
            </el-tooltip>
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
                   trigger="click"
                   v-model="visibleCheckList">
                  <i class="el-icon-star-off card-attach-item" slot="reference"></i>
                  <div class="box-scp">
                     <input type="text" placeholder="Nhập tên công việc" v-focus v-model="newCheckList">
                     <span></span>
                  </div>
                  <el-button type="primary" plain size="mini" class="scp-001" @click="handleCreateCheckList()">Thêm
                  </el-button>
               </el-popover>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Xóa thẻ" placement="bottom">
               <i class="el-icon-delete card-attach-item" @click="handleDeleteCard()"></i>
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
               <el-date-picker class="deadline-item" ref="openDatePicker" size="mini" type="date" align="right"
                               v-model="deadline" @change="changeDeadline()">
               </el-date-picker>
               <span class="time-span" v-if="deadlineDisplay.length > 0">
                  {{ deadlineDisplay }}
                  <i class="el-icon-close" @click="changeDeadline(false)"></i>
               </span>
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
                  <el-popover placement="bottom" width="400" trigger="click">
                     <i slot="reference" class="el-icon-edit"></i>
                     <Tag/>
                  </el-popover>
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
                   @blur="handleUpdateCard()"
                   :autosize="{ minRows: 5}"
                   placeholder="Please input"
                   v-model="card.description">
               </el-input>
            </div>
         </div>
         <div class="todo-wrap">
            <div class="todo-box" v-for="(element, index) in card.check_lists" :key="element.id">
               <div class="todo-parent">
                  <div class="todo-parent-title">
                     <i class="el-icon-star-off ico-scp">
                        <input type="text" v-model="element.title" @blur="handleUpdateCheckList(index)">
                        <span></span>
                     </i>
                     <div class="todo-parent-action" @click="handleDeleteCheckList(element.title, element.id)">Xóa</div>
                  </div>
                  <el-progress :percentage="handleCalculatePercent(element)" color="#409eff"
                               v-if="element.check_list_childs.length > 0"></el-progress>
               </div>
               <div class="todo-children">
                  <el-checkbox class="todo-children-checkbox" v-for="item in element.check_list_childs"
                               :key="item.id" :checked="item.status === 1" @change="changeStatusCheckListChild(item.id, $event)">
                     <div class="checkbox-action">
                        <div>{{ item.title }}</div>
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
                                      @click="handleCreateCheckListChild(element.id)">
                           </el-button>
                           <el-button type="primary" icon="el-icon-close" plain size="mini"
                                      @click="toggleNewChildren(index, element.show)">
                           </el-button>
                        </el-button-group>
                        <input type="text" class="new-name-children" placeholder="Tên công việc con"
                               v-model="newCheckListChild" v-focus>
                     </div>
                  </div>
               </div>
            </div>

            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                       :before-remove="beforeRemove" multiple :limit="3" :file-list="fileList">
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
// eslint-disable-next-line no-unused-vars
import Tag from "./Tag";
import api from "../api";

export default {
   name: "TaskDetail",
   components: {
      Tag
   },
   computed: {
      ...mapState('workflow', [
         'isShow',
         'isDsNone',
         'cardId',
      ]),
   },
   mounted() {
      this.getData()
   },
   data() {
      return {
         visibleCheckList: false,
         fileList: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
         }, {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
         }],
         deadline: '',
         deadlineDisplay: '',
         listTodo: [
            {
               id: 1,
               title: 'Việc cần làm 1',
               children: [
                  {id: 1, name: 'todo 1', status: true},
                  {id: 2, name: 'todo 2', status: false},
                  {id: 3, name: 'todo 3', status: true},
                  {id: 4, name: 'todo 4', status: true},
               ],
               hide: false,
               show: true
            },
            {
               id: 2,
               title: 'Việc cần làm 2',
               children: [
                  {id: 5, name: 'todo 5', status: false},
                  {id: 6, name: 'todo 6', status: true},
                  {id: 7, name: 'todo 7', status: false},
                  {id: 8, name: 'todo 8', status: true},
               ],
               hide: false,
               show: true
            },
         ],
         children: '',
         card: '',
         newCheckList: '',
         newCheckListChild: '',
      }
   },
   methods: {
      ...mapMutations('workflow', [
         'updateIsShow',
         'updateIsDsNone',
         'updateCardId'
      ]),
      refreshData() {
         this.newCheckList = ''
         this.newCheckListChild = ''
      },
      getData() {
         if (this.cardId !== '') {
            api.getCardDetail(this.cardId).then((res) => {
               this.card = res.data.data
               this.deadlineDisplay = ''
               if (this.card.deadline !== null) {
                  this.deadlineDisplay = moment(this.card.deadline).format('DD-MM-YYYY')
               }
               this.card.check_lists.forEach((el) => {
                  el.hide = false
                  el.show = true
               })
            })
         }
      },
      closeCard() {
         this.updateIsShow(false)
         this.updateIsDsNone(true)
      },
      showDatePicker() {
         this.$refs.openDatePicker.showPicker()
      },
      changeDeadline(value = true) {
         let date = null
         this.deadlineDisplay = ''
         if (value) {
            date = moment(this.deadline).format('YYYY-MM-DD HH:mm:ss')
            this.deadlineDisplay = moment(this.deadline).format('DD-MM-YYYY')
         }
         api.changeDeadlineCard({
            deadline: date
         }, this.card.id).then(() => {
            this.$message({
               message: 'Thay đổi deadline thành công.',
               type: 'success'
            });
            this.getData()
            this.$emit('change', 1)
         })
      },
      handleUpdateCard() {
         let data = {
            title: this.card.title,
            description: this.card.description
         }

         api.updateCard(data, this.card.id).then(() => {
            this.$emit('change', 1)
         })
      },
      handleDeleteCard() {
         this.$confirm(`Bạn có chắc chắn muốn xóa thẻ "${this.card.title}" hay không?`, 'Xóa thẻ', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteCard(this.card.id).then(() => {
               this.$message({
                  type: 'success',
                  message: 'Xóa thẻ thành công'
               });
               this.closeCard()
               this.$emit('change', 1)
            }).catch(() => {
               this.$message.error('Xóa thẻ thất bại');
            })
         });
      },
      handleCreateCheckList() {
         if (this.newCheckList !== '') {
            api.createCheckList({
               title: this.newCheckList,
               card_id: this.card.id
            }).then(() => {
               this.$message({
                  message: 'Thêm việc cần làm thành công.',
                  type: 'success'
               });
               this.visibleCheckList = false
               this.refreshData()
               this.getData()
               this.$emit('change', 1)
            })
         }
      },
      handleUpdateCheckList(index) {
         let data = this.card.check_lists[index]
         if (data.title !== '') {
            api.updateCheckList({
               title: data.title,
            }, data.id).then(() => {
               this.$message({
                  message: 'Cập nhật việc cần làm thành công.',
                  type: 'success'
               });
               this.refreshData()
               this.getData()
            })
         }
      },
      handleDeleteCheckList(name, id) {
         this.$confirm(`Bạn có chắc chắn muốn xóa "${name}" hay không?`, 'Xóa việc cần làm', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteCheckList(id).then(() => {
               this.$message({
                  message: 'Xóa việc cần làm thành công.',
                  type: 'success'
               });
               this.refreshData()
               this.getData()
            })
         });
      },
      handleCreateCheckListChild(checkListId) {
         if (this.newCheckListChild !== '') {
            api.createCheckListChild({
               title: this.newCheckListChild,
               check_list_id: checkListId
            }).then(() => {
               this.$message({
                  message: 'Thêm việc cần con làm thành công.',
                  type: 'success'
               });
               this.refreshData()
               this.getData()
               this.$emit('change', 1)
            })
         }
      },
      changeStatusCheckListChild(id, event) {
         console.log(event)
         let status = 0
         if (event) {
            status = 1
         }
         api.updateStatusCheckListChild({
            status: status
         }, id).then(() => {
            this.$message({
               message: 'Thay đổi trạng thái công việc con làm thành công.',
               type: 'success'
            });
            this.refreshData()
            this.getData()
            this.$emit('change', 1)
         })
      },
      handleCalculatePercent(value) {
         let percent = _.filter(value.check_list_childs, {'status': 1}).length / value.check_list_childs.length * 100
         return Math.round(percent)
      },
      toggleNewChildren(index, bool) {
         this.card.check_lists[index].show = !bool
         this.card.check_lists[index].hide = bool
         this.card.check_lists.push([])
         this.card.check_lists.pop()
      },
      beforeRemove(file) {
         return this.$confirm(`Cancel the transfert of ${file.name} ?`);
      }
   },
   watch: {
      // deadline(value) {
      //    let time = moment(value).format('DD-MM-YYYY')
      //    this.deadline = time
      // },
      show(value) {
         this.hide = !value
      },
      cardId() {
         this.getData()
         this.refreshData()
      },
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