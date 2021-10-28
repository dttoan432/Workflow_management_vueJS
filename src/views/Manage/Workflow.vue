<template>
   <div class="workflow-wrap">
      <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions"
                 @start="drag = true" @end="drag = false">
         <transition-group class="draggable-transition" type="transition" :name="!drag ? 'flip-list' : null">
            <div class="list-group-item" v-for="(element, index) in list" :key="index">
               <div class="section">
                  <div class="section-box-header">
                     <div class="section-title">
                        {{ element.name }}
                     </div>
                     <div class="section-action">
                        <div class="section-action-box">
                           <i class="el-icon-plus section-action-icon"></i>
                        </div>
                        <div class="section-action-box" @click="handleDeleteList(index, element.name)">
                           <i class="el-icon-delete section-action-icon"></i>
                        </div>
                     </div>
                  </div>
                  <draggable class="task-group section-box-content" :list="element.task" group="task" @change="log">
                     <div class="task-group-item content-task" v-for="(taskItem, taskIndex) in element.task" :key="taskIndex">
<!--                        <el-image :src="taskItem.file[0].name" v-if="taskIndex===0"></el-image>-->
                        <div class="task-info">
                           <div class="task-name">{{ taskItem.name }}</div>
                           <div class="tag-list">
                              <span v-for="(tagItem, tagIndex) in taskItem.tag" :key="tagIndex"
                                  :style="{background: tagItem.color}" class="tag-item">
                                 {{ tagItem.name }}
                              </span>
                           </div>
                           <div class="task-other-info">
                              <div class="deadline">
                                 <i class="el-icon-date date-picker deadline-picker"></i>
                                 <span class="deadline-info" v-if="taskItem.deadline.length === 0">Đang cập nhật</span>
                                 <span class="deadline-info" v-else>{{ taskItem.deadline }}</span>
                              </div>
                              <div class="todo-attach">
                                 <i class="el-icon-paperclip todo-attach-item">
                                    <span class="todo-attach-item-info" v-if="taskItem.file.length === 0">0</span>
                                    <span class="todo-attach-item-info" v-else>{{ taskItem.file.length }}</span>
                                 </i>
                                 <i class="el-icon-magic-stick todo-attach-item">
                                    <span class="todo-attach-item-info" v-if="taskItem.todo.length === 0">0/0</span>
                                    <span class="todo-attach-item-info" v-else>
                                       {{ `${countMissionDone(index, taskIndex)[0]}/${countMissionDone(index, taskIndex)[1]}` }}
                                    </span>
                                 </i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </draggable>
                  <div :class="{add_card_other_1: true, add_card_other_2: element.task.length === 0 }">
                     <el-input placeholder="Nhập tên thẻ" autofocus
                               v-model="newCard" v-if="!element.isNewCard" @blur="addNewCard(index)">
                     </el-input>
                     <div class="add_card" @click="showAddNewCard(index)" v-if="element.isNewCard">
                        <i class="el-icon-plus add-card-icon"></i>
                        Thêm thẻ
                     </div>
                  </div>
               </div>
            </div>

            <div class="list-group-item" v-for="(element) in 1" :key="element">
               <div class="section">
                  <el-input placeholder="Nhập tên danh sách" autofocus
                            v-model="newList" v-if="!isNewList" @blur="addNewList()">
                  </el-input>
                  <div class="add-new-list" @click="showAddNewList()" v-if="isNewList">
                     <i class="el-icon-plus add-card-icon"></i>
                     Thêm danh sách
                  </div>
               </div>
            </div>
         </transition-group>
      </draggable>
<!--      <div style="text-align: left">-->
<!--         <el-button type="primary" icon="el-icon-edit" circle @click="dialogTableVisible = true"></el-button>-->
<!--      </div>-->

      <el-dialog title="Shipping address" :visible.sync="dialogTableVisible">
         <template slot="title">
            adad
         </template>
         aa
      </el-dialog>
   </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
   name: "Workflow",
   components: {
      draggable
   },
   data() {
      return {
         newList: '',
         isNewList: true,
         newCard: '',
         list: [
            {
               name: 'Start',
               task: [
                  {
                     name: "John1",
                     description: '',
                     tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },
                     ],
                     todo: [],
                     file: [
                        { name: 'https://msmobile.com.vn/upload_images/images/hinh-nen-dep-cho-may-tinh-full-hd-2.jpg' }
                     ],
                     deadline: '15/06 - 02/10',
                  },
                  {
                     name: "Joao1",
                     tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },{
                           name: 'hard',
                           color: 'burlywood'
                        },
                     ],
                     todo: [
                        {
                           name: 'Công việc cần làm 1',
                           needTodo: [
                              {
                                 name: 'Công việc 1',
                                 done: true
                              },{
                                 name: 'Công việc 2',
                                 done: true
                              },{
                                 name: 'Công việc 3',
                                 done: false
                              }
                           ]
                        }, {
                           name: 'Công việc cần làm 2',
                           needTodo: [
                              {
                                 name: 'Công việc 1',
                                 done: true
                              },{
                                 name: 'Công việc 2',
                                 done: true
                              },{
                                 name: 'Công việc 3',
                                 done: true
                              }
                           ]
                        }
                     ],
                     file: [],
                     deadline: '',
                  },
                  {
                     name: "Jean1",
                     tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },
                     ],
                     todo: [],
                     file: [],
                     deadline: '',
                  },
                  {
                     name: "Gerard1",
                     tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },{
                           name: 'hard',
                           color: 'burlywood'
                        },
                     ],
                     todo: [],
                     file: [],
                     deadline: '',
                  }
               ],
               isNewCard: true
            },
            {
               name: 'Todo',
               task: [
                  {
                     name: "Juan2",
                     tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },{
                           name: 'hard',
                           color: 'burlywood'
                        },
                     ],
                     todo: [],
                     file: [],
                     deadline: '',
                  },
                  {
                     name: "Edgard2",
                     tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },
                     ],
                     todo: [],
                     file: [],
                     deadline: '',
                  },
                  {
                     name: "Johnson2",
                     tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },
                     ],
                     todo: [
                        {
                           name: 'Công việc cần làm 1',
                           needTodo: [
                              {
                                 name: 'Công việc 1',
                                 done: true
                              },{
                                 name: 'Công việc 2',
                                 done: false
                              },{
                                 name: 'Công việc 3',
                                 done: false
                              }
                           ]
                        }, {
                           name: 'Công việc cần làm 2',
                           needTodo: [
                              {
                                 name: 'Công việc 1',
                                 done: false
                              },{
                                 name: 'Công việc 2',
                                 done: false
                              },{
                                 name: 'Công việc 3',
                                 done: true
                              }
                           ]
                        }, {
                           name: 'Công việc cần làm 2',
                           needTodo: [
                              {
                                 name: 'Công việc 1',
                                 done: false
                              },{
                                 name: 'Công việc 2',
                                 done: false
                              },{
                                 name: 'Công việc 3',
                                 done: true
                              }
                           ]
                        }
                     ],
                     file: [],
                     deadline: '',
                  }
               ],
               isNewCard: true
            },
            {
               name: 'Done',
               task: [
                  {
                     name: "Juan3", tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },
                     ],
                     todo: [],
                     file: [],
                     deadline: '',
                  },
                  {
                     name: "Edgard3", tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },
                     ],
                     todo: [],
                     file: [],
                     deadline: '',
                  },
                  {
                     name: "Johnson3", tag: [
                        {
                           name: 'low',
                           color: '#48dafd'
                        },{
                           name: 'medium',
                           color: '#ffa800'
                        },
                     ],
                     todo: [],
                     file: [],
                     deadline: '',
                  }
               ],
               isNewCard: true
            }
         ],
         drag: false,
         title: 'todo',
         dialogTableVisible: false,
         test: ''
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
      showAddNewList() {
         this.isNewList = false
         this.list.forEach((el) => {
            el.isNewCard = true
         })
      },
      addNewList() {
         this.isNewList = true
         if (this.newList.length > 0) {
            this.list.push({
               name: this.newList,
               task: [],
               isNewCard: true
            });
            this.newList = ''
         }
      },
      showAddNewCard(value) {
         this.newCard = ''
         this.list.forEach((el, index) => {
            el.isNewCard = true
            if (index === value) {
               el.isNewCard = false
            }
         })

         this.isNewList = true
      },
      addNewCard(value) {
         this.list.forEach((el, index) => {
            el.isNewCard = true
            if (this.newCard.length > 0 && index === value) {
               el.task.push({
                  name: this.newCard,
                  description: '',
                  tag: [],
                  todo: [],
                  file: [],
                  deadline: '',
               })
            }
         })

         this.newCard = ''
      },
      handleDeleteList(index, name) {
         this.$confirm(`Bạn có chắc chắn muốn xóa danh sách "${name}" hay không?`, 'Xóa danh sách', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            this.list.splice(index, 1)
            this.$message({
               type: 'success',
               message: 'Xóa danh sách thành công'
            });
         });
      },
      log: function(evt) {
         window.console.log(evt);
      },
      countMissionDone(listIndex, taskIndex) {
         let countTodo = 0
         let countTodoDone = 0
         let countArray = []

         let todo = this.list[listIndex].task[taskIndex].todo
         todo.forEach((el) => {
            countTodo += el.needTodo.length
            countTodoDone += el.needTodo.filter((data) => data.done === true).length
         })
         countArray.push(countTodoDone, countTodo)

         return countArray
      }
   }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/Workflow";
</style>