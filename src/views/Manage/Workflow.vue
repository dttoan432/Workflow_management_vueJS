<template>
   <div class="workflow-wrap">
      <draggable class="list-group" tag="ul" v-model="workflow" v-bind="dragOptions" :disabled="!enabled"
                 @start="drag = true" @end="drag = false" @change="changeIndexDirectory">
         <transition-group class="draggable-transition" type="transition" :name="!drag ? 'flip-list' : null">
            <div class="list-group-item" v-for="(work, workIndex) in workflow" :key="workIndex">
               <div class="section">
                  <div class="section-box-header">
                     <div class="section-title" @click="showRename(workIndex)">
                        <span v-if="work.isRenameWork">{{ work.title }}</span>
                        <div class="box-scp" v-else>
                           <input type="text" class="css-rename" v-focus v-model="work.title"
                                  @keypress.enter="renameWork(work.id, work.title)"
                                  @blur="renameWork(work.id, work.title)">
                           <span></span>
                        </div>
                     </div>
                     <div class="section-action">
                        <div class="section-action-box" @click="showNewCard(workIndex)">
                           <i class="el-icon-plus section-action-icon"></i>
                        </div>
                        <div class="section-action-box" @click="handleDeleteList(work.id, work.title)">
                           <i class="el-icon-delete section-action-icon"></i>
                        </div>
                     </div>
                  </div>
                  <div class="section-box-content-wrap">
                     <div :class="{task_group_item: true, content_task: true, flag_new_card: true,
                                   animation_card_open: !work.isNewCard}" v-if="!work.isNewCard">
                        <div class="task-info other-new-card">
                           <div class="task-name">
                              <div class="box-scp">
                                 <input type="text" placeholder="Nhập tên thẻ" v-focus
                                        v-model="newCard" @keypress.enter="handleCreateCard(workIndex)"
                                        @blur="handleCreateCard(workIndex)">
                                 <span></span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <draggable class="task-group section-box-content" :list="work.cards" group="task"
                                @change="changeIndexCard">
                        <div class="task_group_item content_task" v-for="(card) in work.cards" :key="card.id"
                             @click="detailCard(card.id)">
                           <!--                        <el-image :src="taskItem.file[0].name" v-if="taskIndex===0"></el-image>-->
                           <div class="task-info">
                              <div class="task-name">{{ card.title }}</div>
                              <div class="tag-list">
                              <span v-for="(label) in card.labels" :key="label.id"
                                    :style="{background: label.color}" class="tag-item">
<!--                                 {{ label.name }}-->
                              </span>
                              </div>
                              <div class="task-other-info">
                                 <div class="deadline">
                                    <i class="el-icon-date date-picker deadline-picker"></i>
                                    <span class="deadline-info" v-if="card.deadline && card.deadline.length > 0">
                                    {{ formatDate(card.deadline) }}
                                 </span>
                                    <span class="deadline-info" v-else>Đang cập nhật</span>
                                 </div>
                                 <div class="todo-attach">
                                    <i class="el-icon-paperclip todo-attach-item">
                                       <span class="todo-attach-item-info">0</span>
                                    </i>
                                    <i class="el-icon-star-off todo-attach-item">
                                       <span class="todo-attach-item-info">{{ card.list }}</span>
                                       <!--                                       <span class="todo-attach-item-info" v-else>0</span>-->
                                    </i>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </draggable>
                  </div>
               </div>
            </div>
         </transition-group>
      </draggable>

      <div class="other-new-work" id="todo">
         <div class="add-new-list" @click="showNewWork()" v-if="isNewWork">
            <i class="el-icon-plus add-card-icon"></i>
            Thêm danh sách
         </div>
         <div class="box-scp" v-else>
            <input type="text" placeholder="Nhập tên danh sách" class="css-rename" v-focus v-model="newWork"
                   @keypress.enter="addNewWork()" @blur="resetNewWork()">
            <span></span>
         </div>
      </div>
      <el-drawer
          size="35%"
          :withHeader="false"
          :visible.sync="drawer"
          direction="rtl">
         <TaskDetail @change="getAllData()"/>
      </el-drawer>
   </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import draggable from "vuedraggable";
import 'animate.css';
import TaskDetail from "../../components/TaskDetail";
import api from '../../api'
import moment from 'moment';
import _ from 'lodash';

export default {
   name: "Workflow",
   components: {
      draggable,
      TaskDetail
   },
   data() {
      return {
         drawer: false,
         enabled: true,
         newWork: '',
         isNewWork: true,
         newCard: '',
         workflow: [],
         drag: false,
         dialogTableVisible: false,
         test: ''

      };
   },
   computed: {
      ...mapState('workflow', [
         'isShow',
         'isDsNone',
         'cardId'
      ]),
      dragOptions() {
         return {
            animation: 500,
            group: "description",
            disabled: false,
            ghostClass: "ghost"
         };
      }
   },
   methods: {
      ...mapMutations('workflow', [
         'updateIsShow',
         'updateIsDsNone',
         'updateCardId'
      ]),
      refreshData() {
         this.workflow.push([])
         this.workflow.pop()
      },
      getAllData() {
         api.getListDirectory().then(res => {
            this.workflow = res.data.data
            this.workflow.forEach((el) => {
               el.isRenameWork = true
               el.isNewCard = true

               el.cards.forEach((elm) => {
                  let total = 0
                  api.getCardDetail(elm.id).then((res) => {
                     let data = res.data.data.check_lists
                     let child = 0
                     let childDone = 0
                     if (data.length > 0) {
                        data.forEach((elm) => {
                           if (elm.check_list_childs.length > 0) {
                              child += elm.check_list_childs.length
                              childDone += _.filter(elm.check_list_childs, {'status': 1}).length;
                              total = childDone + '/' + child
                           }
                        })
                     }
                     elm.list = total
                  })
               })
            })
            setTimeout(() => {
               this.refreshData()
            }, 300)
         })
      },
      showRename(index) {
         this.workflow[index].isRenameWork = false
         this.refreshData()
      },
      showNewWork() {
         this.isNewWork = false
         this.workflow.forEach((el) => {
            el.isNewCard = true
         })
      },
      resetNewWork() {
         this.isNewWork = true
         this.newWork = ''
      },
      addNewWork() {
         let index = 1;
         (this.workflow.length > 0) ? index = this.workflow.length : ''
         api.createDirectory({
            title: this.newWork,
            index: index
         }).then(() => {
            this.getAllData()
            this.scrollEnd()
         }).catch(() => {
            this.$notify.error({
               title: 'Hệ thống',
               message: 'Thêm danh sách thất bại'
            });
         })
         this.resetNewWork()
      },
      showNewCard(value) {
         this.newCard = ''
         this.workflow.forEach((el, index) => {
            el.isNewCard = true
            if (index === value) {
               el.isNewCard = false
            }
         })
         this.refreshData()

         this.isNewWork = true
      },
      detailCard(value) {
         this.drawer = true
         this.updateCardId(JSON.parse(JSON.stringify(value)))
      },
      handleDeleteList(id, name) {
         this.$confirm(`Bạn có chắc chắn muốn xóa danh sách "${name}" hay không?`, 'Xóa danh sách', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteDirectory(id).then(() => {
               this.getAllData()
            }).catch(() => {
               this.$notify.error({
                  title: 'Hệ thống',
                  message: 'Xóa danh sách thất bại'
               });
            })

         });
      },
      log(evt) {
         window.console.log(evt);
      },
      scrollEnd() {
         setTimeout(function () {
            document.getElementById('todo').scrollIntoView()
         }, 100)
      },
      renameWork(id, title) {
         api.updateDirectory({
            title: title
         }, id).then(() => {
            this.resetRenameWork()
         }).catch(() => {
            this.getAllData()
            this.$notify.error({
               title: 'Hệ thống',
               message: 'Thay đổi thất bại'
            });
         })
      },
      resetRenameWork() {
         this.workflow.forEach((el) => {
            el.isRenameWork = true
         })
         this.refreshData()
      },
      changeIndexDirectory(evt) {
         // console.log(evt)
         api.changeIndexDirectory({
            index: evt.moved.newIndex
         }, evt.moved.element.id).then(() => {
            this.getAllData()
         })
      },
      handleCreateCard(indexDirectory) {
         if (this.newCard !== '') {
            let directory = this.workflow[indexDirectory]
            let index = (directory.cards.length > 0) ? directory.cards.length : 0
            api.createCard({
               title: this.newCard,
               index: index,
               directory_id: directory.id
            }).then(() => {
               this.newCard = ''
               this.getAllData()
               this.$message({
                  message: 'Tạo thẻ thành công.',
                  type: 'success'
               });
            })
         } else {
            this.workflow[indexDirectory].isNewCard = true
            this.refreshData()
         }
      },
      changeIndexCard(evt) {
         window.console.log(evt);
         api.changeIndexCard({
            index: evt.moved.newIndex
         }, evt.moved.element.id).then(() => {
            this.getAllData()
         })
      },
      formatDate(value) {
         return moment(value).format('DD-MM-YYYY')
      },
      // checkMove: function(evt){
      //    window.console.log(evt);
      //    // return (evt.draggedContext.element.name!=='apple');
      // }
      countCheckList(id) {
         let total = 0
         api.getCardDetail(id).then((res) => {
            let data = res.data.data.check_lists
            let child = 0
            let childDone = 0
            if (data.length > 0) {
               data.forEach((elm) => {
                  if (elm.check_list_childs.length > 0) {
                     child += elm.check_list_childs.length
                     childDone += _.filter(elm.check_list_childs, {'status': 1}).length;
                     total = childDone + '/' + child
                  }
               })
            }
         })
         console.log(total)
         return total
      }
   },
   directives: {
      focus: {
         inserted: function (el) {
            el.focus()
         }
      }
   },
   mounted() {
      this.getAllData()
   },
   watch: {
      isShow(value) {
         this.updateIsDsNone(!value)
      }
   }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/Workflow";
</style>