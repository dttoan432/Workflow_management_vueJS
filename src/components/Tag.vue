<template>
   <div class="tag-container">
      <div class="tag-title">Nhãn</div>
      <div class="tag-color-box">
         <div class="tag-color" v-for="(element) in labels" :key="element.id">
            <el-checkbox-button size="small" v-model="element.active" @change="handleAttachTag(element.id, $event)">
               <div class="color-box">
                  <div :style="{background: element.color}" class="color-item">
                     {{ element.name }}
                     <i class="el-icon-check ico-ocp"></i>
                  </div>
               </div>
            </el-checkbox-button>
            <i class="el-icon-edit ico-oop" @click="toggleUpdateTag(element)"></i>
         </div>
      </div>
      <div class="new-tag-wrap" v-if="isUpdate">
         <el-button type="primary" icon="el-icon-plus" plain size="small" class="btn-oop oop-1"
                    @click="toggleNewTag()" v-if="show">
            Thêm nhãn
         </el-button>
         <div class="new-children" v-else>
            <div class="tag-content">
               <el-input placeholder="Nhập tên nhãn" v-model="tag" size="small" v-focus></el-input>
               <el-color-picker v-model="colorTag" size="small"></el-color-picker>
            </div>
            <div class="action-new-tag">
               <el-button type="primary" size="small" class="btn-oop oop-1"
                          @click="handleCreateTag()">
                  Tạo mới
               </el-button>
               <el-button type="light" size="small" class="btn-oop oop-1"
                          @click="toggleNewTag()">
                  Đóng
               </el-button>
            </div>
         </div>
      </div>
      <div class="new-tag-wrap" v-else>
         <div class="new-children">
            <div class="tag-content">
               <el-input placeholder="Nhập tên nhãn" v-model="tag" size="small" v-focus></el-input>
               <el-color-picker v-model="colorTag" size="small"></el-color-picker>
            </div>
            <div class="action-new-tag">
               <el-button type="primary" size="small" class="btn-oop oop-1"
                          @click="handleUpdateTag()">
                  Thay đổi
               </el-button>
               <el-button type="light" size="small" class="btn-oop oop-1"
                          @click="toggleUpdateTag()">
                  Đóng
               </el-button>
               <el-button type="danger" size="small" class="btn-oop oop-1 float-right"
                          @click="handleDeleteTag()">
                  Xóa
               </el-button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import {mapState} from "vuex";
import api from "../api";
import _ from "lodash";

export default {
   name: "Tag",
   props: ['resetTag'],
   computed: {
      ...mapState('workflow', [
         'cardId'
      ]),
   },
   mounted() {
      this.getLabelActive()
   },
   data() {
      return {
         idLabel: '',
         isUpdate: true,
         show: true,
         tag: '',
         colorTag: '#409EFF',
         labels: [],
         labelActive: []
      }
   },
   methods: {
      reset() {
         this.isUpdate = true
         this.show = true
         this.tag = ''
         this.colorTag = '#409EFF'
      },
      toggleNewTag() {
         this.show = !this.show
      },
      handleEmit() {
         this.$emit('changeColor', 1)
      },
      getListTag() {
         api.getTag().then((res) => {
            let data = res.data.data
            data.forEach((value) => {
               _.filter(this.labelActive, function (o) {
                  if (value.id === o.id) {
                     value.active = true
                  }
               });
            })
            this.labels = data
         })
      },
      getLabelActive() {
         if (this.cardId !== '') {
            api.getCardDetail(this.cardId).then((res) => {
               let data = res.data.data.labels
               this.labelActive = data
               this.getListTag()
            })
         }
      },
      handleCreateTag() {
         api.createTag({
            name: this.tag,
            color: this.colorTag
         }, this.cardId).then(() => {
            this.$message({
               type: 'success',
               message: 'Tạo nhãn thành công'
            });
            this.tag = ''
            this.handleEmit()
            setTimeout(() => {
               this.getLabelActive()
            }, 500)
         }).catch(() => {
            this.$message.error('Tọa nhãn thất bại');
         })
      },
      handleAttachTag(id, event) {
         if (event) {
            api.addTag({
               label_id: id
            }, this.cardId).then(() => {
               this.$message({
                  type: 'success',
                  message: 'Gắn nhãn thành công'
               });
            }).catch(() => {
               this.$message.error('Gắn nhãn thất bại');
            })
            this.handleEmit()
         } else {
            api.detachTag({
               label_id: id
            }, this.cardId).then(() => {
               this.$message({
                  type: 'success',
                  message: 'Gỡ nhãn thành công'
               });
               this.handleEmit()
            }).catch(() => {
               this.$message.error('Gỡ nhãn thất bại');
            })
         }
      },
      handleUpdateTag() {
        if (this.tag !== '') {
           api.updateTag({
              name: this.tag,
              color: this.colorTag
           }, this.idLabel).then(() => {
              this.$message({
                 type: 'success',
                 message: 'Sửa nhãn thành công'
              });
              this.reset()
              this.handleEmit()
              setTimeout(() => {
                 this.getLabelActive()
              }, 500)
           })
        }
      },
      handleDeleteTag() {
         if (this.idLabel !== '') {
            this.$confirm(`Bạn có chắc chắn muốn xóa hay không?`, 'Xóa nhãn', {
               confirmButtonText: 'Xóa',
               cancelButtonText: 'Đóng',
               type: 'warning'
            }).then(() => {
               console.log(this.idLabel)
               api.deleteTag(this.idLabel).then(() => {
                  this.$message({
                     type: 'success',
                     message: 'Xóa nhãn thành công'
                  });
                  this.handleEmit()
                  setTimeout(() => {
                     this.getLabelActive()
                  }, 500)
                  this.reset()
               })
            });
         }
      },
      toggleUpdateTag(data = 0) {
         if (data === 0) {
            this.reset()
         } else {
            this.isUpdate = false
            this.show = true
            this.tag = data.name
            this.colorTag = data.color
            this.idLabel = data.id
         }
      }
   },
   watch: {
      cardId() {
         this.getLabelActive()
      },
      resetTag() {
         this.reset()
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
@import "../assets/styles/Tag";
</style>