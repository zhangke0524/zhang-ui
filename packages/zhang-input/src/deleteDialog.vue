<template>
  <el-dialog :model-value="dialogVisible" title="提示" width="560px" :before-close="handleClose" class="delete-dialog">
    <div class="relative">
      <div class="content-text">
        <div class="explain-text" v-if="selectedNum === 0">
          <div v-if="props.tipText">
            {{ props.tipText }}
          </div>
          <div v-else>
            确认删除<span v-show="currentDeleteName" class="explain-name">“{{ currentDeleteName }}”</span>吗？
          </div>
        </div>
        <div v-else>
          当前已勾选 {{ props.selectedNum }} 条数据，确认删除吗？
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" :disabled="isLoading">取消</el-button>
        <el-button type="primary" @click="clickConfirm" :loading="isLoading">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { watch } from 'vue';
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  currentDeleteName: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  selectedNum: {
    type: Number,
    default: 0,
  },
  tipText: {
    type: String,
    default: '',
  }
});

watch(
  () => props.dialogVisible,
  (val) => {
    if (val) {
      emit('resetLoading');
    }
  },
);

const emit = defineEmits();
const handleClose = () => {
  emit('closeDeleteDialog');
};
const clickConfirm = () => {
  emit('confirmDelete');
};
</script>
<style lang="scss" scoped>
.content-text {
  display: flex;
  justify-content: center;
  .explain-icon {
    color: #e6a23c;
    font-size: 20px;
    margin-right: 10px;
  }
  .explain-text {
    margin: 20px 0;
    .explain-name {
      font-weight: bold;
    }
  }
}
</style>
