<template>
   <div class="workflow-wrap">
      <draggable class="list-group" tag="ul" v-model="workflow" v-bind="dragOptions"
                 @start="drag = true" @end="drag = false">
         <transition-group class="draggable-transition" type="transition" :name="!drag ? 'flip-list' : null">
            <div class="list-group-item" v-for="(work, workIndex) in workflow" :key="workIndex">
               <div class="section">
                  <div class="section-box-header">
                     <div class="section-title" @click="work.isRenameWork= false">
                        <span v-if="work.isRenameWork">{{ work.title }}</span>
                        <div class="box-scp" v-else>
                           <input type="text" class="css-rename" v-focus v-model="work.title"
                                  @keypress.enter="renameWork()" @blur="resetRenameWork()">
                           <span></span>
                        </div>
                     </div>
                     <div class="section-action">
                        <div class="section-action-box" @click="showNewCard(workIndex)">
                           <i class="el-icon-plus section-action-icon"></i>
                        </div>
                        <div class="section-action-box" @click="handleDeleteList(workIndex, work.title)">
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
                                        v-model="newCard" @keypress.enter="addNewCard()" @blur="addNewCard()">
                                 <span></span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <draggable class="task-group section-box-content" :list="work.cards" group="task" @change="log">
                        <div class="task_group_item content_task" v-for="(card) in work.cards" :key="card.id"
                             @click="detailCard(card)">
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
                                    {{ card.deadline }}
                                 </span>
                                    <span class="deadline-info" v-else>Đang cập nhật</span>
                                 </div>
                                 <div class="todo-attach">
                                    <i class="el-icon-paperclip todo-attach-item">
                                       <span class="todo-attach-item-info">0</span>
                                    </i>
                                    <i class="el-icon-magic-stick todo-attach-item">
                                       <span class="todo-attach-item-info">0/0</span>
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
         <button @click="show = !show">click</button>
      </div>

      <div :class="{card_detail_wrap:true, card_detail_animation: show, display_none: isDsNone}">

      </div>

      <el-dialog :visible.sync="dialogTableVisible" :show-close="false">
         <TaskDetail :card="cardItem"/>
      </el-dialog>
   </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskDetail from "../../components/TaskDetail";

export default {
   name: "Workflow",
   components: {
      draggable,
      TaskDetail
   },
   data() {
      return {
         show: true,
         isDsNone: false,
         newWork: '',
         isNewWork: true,
         newCard: '',
         workflow: [
            {
               id: 1,
               title: "Mới",
               user_id: 1,
               index: 1,
               created_at: null,
               updated_at: null,
               cards: [
                  {
                     id: 1,
                     title: "Đánh răng",
                     description: "Đánh răng",
                     status: 1,
                     directory_id: 1,
                     index: 1,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 1,
                           name: "hungle",
                           color: "red",
                           user_id: 1,
                           created_at: "2021-01-25T08:20:54.000000Z",
                           updated_at: "2021-01-25T08:20:54.000000Z",
                           pivot: {
                              card_id: 1,
                              label_id: 1,
                              created_at: "2021-01-25T08:20:54.000000Z",
                              updated_at: "2021-01-25T08:20:54.000000Z"
                           }
                        },
                        {
                           id: 2,
                           name: "hungle",
                           color: "red",
                           user_id: 1,
                           created_at: "2021-01-25T08:23:53.000000Z",
                           updated_at: "2021-01-25T08:23:53.000000Z",
                           pivot: {
                              card_id: 1,
                              label_id: 2,
                              created_at: "2021-01-25T08:23:53.000000Z",
                              updated_at: "2021-01-25T08:23:53.000000Z"
                           }
                        },
                        {
                           id: 3,
                           name: "hungle",
                           color: "red",
                           user_id: 1,
                           created_at: "2021-01-25T08:26:42.000000Z",
                           updated_at: "2021-01-25T08:26:42.000000Z",
                           pivot: {
                              card_id: 1,
                              label_id: 3,
                              created_at: "2021-01-25T08:26:42.000000Z",
                              updated_at: "2021-01-25T08:26:42.000000Z"
                           }
                        }
                     ]
                  },
                  {
                     id: 2,
                     title: "Rửa mặt",
                     description: "Rửa mặt",
                     status: 1,
                     directory_id: 1,
                     index: 2,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 7,
                           name: "MIT-Zent",
                           color: "green",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 2,
                              label_id: 7,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 8,
                           name: "DTT-Zent",
                           color: "green",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 2,
                              label_id: 8,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 9,
                           name: "DTT1-Zent",
                           color: "green",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 2,
                              label_id: 9,
                              created_at: null,
                              updated_at: null
                           }
                        }
                     ]
                  }
               ],
               isRenameWork: true,
               isNewCard: true
            },
            {
               id: 2,
               title: "Đang làm",
               user_id: 1,
               index: 2,
               created_at: null,
               updated_at: null,
               cards: [
                  {
                     id: 3,
                     title: "Ăn sáng",
                     description: "Ăn sáng",
                     status: 1,
                     directory_id: 2,
                     index: 3,
                     deadline: '12/05 đến 22/10',
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 10,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 3,
                              label_id: 10,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 11,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 3,
                              label_id: 11,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 12,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 3,
                              label_id: 12,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 13,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 3,
                              label_id: 13,
                              created_at: null,
                              updated_at: null
                           }
                        }
                     ]
                  },
                  {
                     id: 4,
                     title: "Nấu cơm",
                     description: "Nấu cơm",
                     status: 1,
                     directory_id: 2,
                     index: 4,
                     deadline: '12/05 đến 22/10',
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 14,
                           name: "MISS-Zent",
                           color: "blue",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 4,
                              label_id: 14,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 15,
                           name: "MISS-Zent",
                           color: "red",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 4,
                              label_id: 15,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 16,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 4,
                              label_id: 16,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 17,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 4,
                              label_id: 17,
                              created_at: null,
                              updated_at: null
                           }
                        }
                     ]
                  },
                  {
                     id: 5,
                     title: "Rửa bát",
                     description: "Rửa bát",
                     status: 1,
                     directory_id: 2,
                     index: 5,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 18,
                           name: "MISS-Zent",
                           color: "green",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 5,
                              label_id: 18,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 19,
                           name: "MISS-Zent",
                           color: "red",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 5,
                              label_id: 19,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 20,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 5,
                              label_id: 20,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 21,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 5,
                              label_id: 21,
                              created_at: null,
                              updated_at: null
                           }
                        }
                     ]
                  },
                  {
                     id: 6,
                     title: "Làm việc",
                     description: "Làm việc",
                     status: 1,
                     directory_id: 2,
                     index: 6,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 22,
                           name: "MISS-Zent",
                           color: "green",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 6,
                              label_id: 22,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 23,
                           name: "MISS-Zent",
                           color: "red",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 6,
                              label_id: 23,
                              created_at: null,
                              updated_at: null
                           }
                        },
                     ]
                  },
                  {
                     id: 7,
                     title: "Đám cưới",
                     description: "Đám cưới",
                     status: 1,
                     directory_id: 2,
                     index: 7,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 24,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 7,
                              label_id: 24,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 25,
                           name: "MISS-Zent",
                           color: "red",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 7,
                              label_id: 25,
                              created_at: null,
                              updated_at: null
                           }
                        },
                     ]
                  },
                  {
                     id: 8,
                     title: "Tiết kiệm",
                     description: "Tiết kiệm",
                     status: 1,
                     directory_id: 2,
                     index: 8,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 26,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 8,
                              label_id: 26,
                              created_at: null,
                              updated_at: null
                           }
                        },
                     ]
                  },
                  {
                     id: 9,
                     title: "Du lịch",
                     description: "Du lịch",
                     status: 1,
                     directory_id: 2,
                     index: 9,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 27,
                           name: "MISS-Zent",
                           color: "red",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 9,
                              label_id: 27,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 28,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 9,
                              label_id: 28,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 30,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 9,
                              label_id: 30,
                              created_at: null,
                              updated_at: null
                           }
                        },
                     ]
                  },
                  {
                     id: 10,
                     title: "Mua quần áo",
                     description: "Mua quần áo",
                     status: 1,
                     directory_id: 2,
                     index: 10,
                     deadline: '12/05 đến 22/10',
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 31,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 10,
                              label_id: 31,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 32,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 10,
                              label_id: 32,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 33,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 10,
                              label_id: 33,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 34,
                           name: "MISS-Zent",
                           color: "gray",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 10,
                              label_id: 34,
                              created_at: null,
                              updated_at: null
                           }
                        }
                     ]
                  },
               ],
               isRenameWork: true,
               isNewCard: true
            },
            {
               id: 3,
               title: "Đã hoàn thành",
               user_id: 1,
               index: 3,
               created_at: null,
               updated_at: null,
               cards: [
                  {
                     id: 11,
                     title: "Mua mai thúy",
                     description: "Mua mai thúy",
                     status: 1,
                     directory_id: 1,
                     index: 11,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 35,
                           name: "hungle",
                           color: "red",
                           user_id: 1,
                           created_at: "2021-01-25T08:20:54.000000Z",
                           updated_at: "2021-01-25T08:20:54.000000Z",
                           pivot: {
                              card_id: 11,
                              label_id: 35,
                              created_at: "2021-01-25T08:20:54.000000Z",
                              updated_at: "2021-01-25T08:20:54.000000Z"
                           }
                        },
                        {
                           id: 36,
                           name: "hungle",
                           color: "red",
                           user_id: 1,
                           created_at: "2021-01-25T08:23:53.000000Z",
                           updated_at: "2021-01-25T08:23:53.000000Z",
                           pivot: {
                              card_id: 11,
                              label_id: 36,
                              created_at: "2021-01-25T08:23:53.000000Z",
                              updated_at: "2021-01-25T08:23:53.000000Z"
                           }
                        },
                        {
                           id: 37,
                           name: "hungle",
                           color: "red",
                           user_id: 1,
                           created_at: "2021-01-25T08:26:42.000000Z",
                           updated_at: "2021-01-25T08:26:42.000000Z",
                           pivot: {
                              card_id: 11,
                              label_id: 37,
                              created_at: "2021-01-25T08:26:42.000000Z",
                              updated_at: "2021-01-25T08:26:42.000000Z"
                           }
                        }
                     ]
                  },
                  {
                     id: 12,
                     title: "Buôn lậu",
                     description: "Buôn lậu",
                     status: 1,
                     directory_id: 1,
                     index: 12,
                     deadline: null,
                     user_id: 1,
                     created_at: null,
                     updated_at: null,
                     labels: [
                        {
                           id: 38,
                           name: "MIT-Zent",
                           color: "green",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 12,
                              label_id: 38,
                              created_at: null,
                              updated_at: null
                           }
                        },
                        {
                           id: 8,
                           name: "DTT-Zent",
                           color: "green",
                           user_id: 1,
                           created_at: null,
                           updated_at: null,
                           pivot: {
                              card_id: 2,
                              label_id: 8,
                              created_at: null,
                              updated_at: null
                           }
                        },
                     ]
                  }
               ],
               isRenameWork: true,
               isNewCard: true
            },
         ],
         drag: false,
         title: 'todo',
         dialogTableVisible: false,
         cardItem: []
      };
   },
   computed: {
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
         this.isNewWork = true
         this.newWork = ''
      },
      showNewCard(value) {
         this.newCard = ''
         this.workflow.forEach((el, index) => {
            el.isNewCard = true
            if (index === value) {
               el.isNewCard = false
            }
         })

         this.isNewWork = true
      },
      addNewCard() {
         this.workflow.forEach((el) => {
            el.isNewCard = true
         })
         this.newCard = ''
      },
      detailCard(value) {
         this.dialogTableVisible = true
         this.cardItem = value
      },
      handleDeleteList(index, name) {
         this.$confirm(`Bạn có chắc chắn muốn xóa danh sách "${name}" hay không?`, 'Xóa danh sách', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            this.$message({
               type: 'success',
               message: 'Xóa danh sách thành công'
            });
         });
      },
      log: function (evt) {
         window.console.log(evt);
      },
      // countMissionDone(workIndex, cardIndex) {
      //    let countTodo = 0
      //    let countTodoDone = 0
      //    let countArray = []
      //
      //    let todo = this.list[listIndex].task[taskIndex].todo
      //    todo.forEach((el) => {
      //       countTodo += el.needTodo.length
      //       countTodoDone += el.needTodo.filter((data) => data.done === true).length
      //    })
      //    countArray.push(countTodoDone, countTodo)
      //
      //    return countArray
      // },
      scrollEnd() {
         setTimeout(function () {
            document.getElementById('todo').scrollIntoView()
         }, 100)
      },
      renameWork() {
        this.resetRenameWork()
      },
      resetRenameWork() {
         this.workflow.forEach((el) => {
            el.isRenameWork = true
         })
      }
   },
   directives: {
      focus: {
         inserted: function (el) {
            el.focus()
         }
      }
   },
   // mounted() {
   //    this.scrollEnd()
   // },
   watch: {
      show(value) {
         if (value) {
            this.isDsNone = !value;
         } else {
            setTimeout(() => {
               this.isDsNone = !value;
            }, 1000)
         }
      }
   }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/Workflow";
</style>