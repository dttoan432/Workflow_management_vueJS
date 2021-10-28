<template>
   <div class="workflow-wrap">
      <draggable
          :list="list"
          :disabled="false"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
      >
         <div
             class="list-group-item"
             v-for="element in list"
             :key="element.name"
         >
            <div class="section">
               <div class="section-box-header">
                  <div class="section-title">
                     {{ element.name }}
                  </div>
                  <div class="section-action">
                     <div class="section-action-box">
                        <i class="el-icon-plus section-action-icon"></i>
                     </div>
                     <div class="section-action-box">
                        <i class="el-icon-delete section-action-icon"></i>
                     </div>
                  </div>
               </div>

               <div class="section-box-content">
                  <div class="content-task" v-for="(item, index) in 4" :key="index">
                     <el-image :src="src" v-if="index===0"></el-image>
                     <div class="task-info">
                        <div class="task-name">Task 1</div>
                        <div class="tag-list">
                           <span :style="{background: color}" class="tag-item">Low</span>
                        </div>
                        <div class="task-other-info">
                           <div class="deadline">
                              <i class="el-icon-date date-picker deadline-picker"></i>
                              <span class="deadline-info">15/08 - 21/10</span>
                           </div>
                           <div class="todo-attach">
                              <i class="el-icon-paperclip todo-attach-item">
                                 <span class="todo-attach-item-info">1</span>
                              </i>
                              <i class="el-icon-magic-stick todo-attach-item">
                                 <span class="todo-attach-item-info">2/4</span>
                              </i>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </draggable>
      <div style="text-align: left">
         <el-button type="primary" icon="el-icon-edit" circle @click="add"></el-button>
         <el-button type="primary" icon="el-icon-edit" circle @click="dialogTableVisible = true"></el-button>
      </div>

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

let id = 1;

export default {
   name: "Workflow",
   components: {
      draggable
   },
   data() {
      return {
         enabled: true,
         list: [
            {name: "Todo", id: 0},
            {name: "Done", id: 1},
            {name: "Jean", id: 2}
         ],
         dragging: false,
         check: true,
         title: 'todo',
         src: 'https://msmobile.com.vn/upload_images/images/hinh-nen-dep-cho-may-tinh-full-hd-2.jpg',
         color: '#48dafd',
         datepicker: '',
         dialogTableVisible: false,
      };
   },
   computed: {
      draggingInfo() {
         return this.dragging ? "under drag" : "";
      }
   },
   methods: {
      add: function () {
         this.list.push({name: "Juan " + id, id: id++});
      },
      replace: function () {
         this.list = [{name: "Edgard", id: id++}];
      },
      checkMove: function (e) {
         window.console.log("Future index: " + e.draggedContext.futureIndex);
      },
      changeTitle() {
         this.check = !this.check
      },
      test() {
         this.bool = !this.bool
      }
   }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/Workflow";
</style>