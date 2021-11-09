<template>
   <div class="tag-container">
<!--      <div class="tag-title">Nhãn</div>-->
<!--      <div class="tag-color">-->
<!--         <el-checkbox-button v-for="(element) in card.labels" :key="element.id">-->
<!--            <div class="color-box">-->
<!--               <div :style="{background: element.color}" class="color-item">-->
<!--                  {{ element.name }}-->
<!--                  <i class="el-icon-check ico-ocp"></i>-->
<!--               </div>-->
<!--               <i class="el-icon-edit ico-oop"></i>-->
<!--               <i class="el-icon-close ico-oop"></i>-->
<!--            </div>-->
<!--         </el-checkbox-button>-->
<!--      </div>-->
<!--      <div class="new-tag-wrap">-->
<!--         <div class="new-children">-->
<!--            <el-button type="primary" icon="el-icon-plus" plain size="mini" class="btn-oop oop-1"-->
<!--                       :class="{ animate__animated: true, animate__fadeInDown: show,-->
<!--                           animate__fadeOutUp: hide}" @click="toggleNewTag(show)">-->
<!--               Tạo mới nhãn-->
<!--            </el-button>-->
<!--         </div>-->
<!--         <div class="new-children"-->
<!--              :class="{ animate__animated: true, animate__fadeInUp: hide,-->
<!--                          animate__fadeOutDown: show}">-->
<!--            <el-button-group class="btn-oop">-->
<!--               <el-button type="primary" icon="el-icon-check" size="mini"-->
<!--                          @click="toggleNewTag(show)">-->
<!--               </el-button>-->
<!--               <el-button type="primary" icon="el-icon-close" size="mini"-->
<!--                          @click="toggleNewTag(show)">-->
<!--               </el-button>-->
<!--            </el-button-group>-->
<!--            <input type="text" class="new-name-children" placeholder="Nhập tên nhãn"-->
<!--                   v-model="tag" v-focus>-->
<!--            <el-color-picker v-model="colorDemo"></el-color-picker>-->
<!--         </div>-->
<!--      </div>-->
   </div>
</template>

<script>
import {mapState} from "vuex";

export default {
   name: "Tag",
   computed: {
      ...mapState('workflow', [
         'card'
      ]),
   },
   data() {
      return {
         hide: false,
         show: true,
         tag: '',
         colorDemo: '#409EFF'
      }
   },
   methods: {
      toggleNewTag(bool) {
         this.show = !bool
         this.hide = bool
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