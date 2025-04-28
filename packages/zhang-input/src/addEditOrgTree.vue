<template>
  <div class="add-edit-org-node-dialog">
    <el-dialog :model-value="props.dialogVisible" :title="title" :before-close="cancel" width="589px" @open="openDialog">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="名字" prop="name">
          <div class="node-name">
            <el-input v-model="formData.name" maxlength="20" placeholder="请输入" style="width: 372px"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <div class="node-remark">
            <el-input v-model="formData.remark" maxlength="20" placeholder="请输入" style="width: 372px"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button plain @click="cancel" :disabled="props.isLoading">取消</el-button>
        <el-button type="primary" @click="clickConfirm" class="btn-has-bg" :loading="props.isLoading">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { FormInstance } from 'element-plus'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  currentOperation: {
    type: String,
    default: 'add',
  },
  currentOrgNode: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const title = computed(() => {
  return props.currentOperation === 'add' ? '新增' : '编辑';
});

const formData = reactive({
  name: '',
  remark: '',
});
const formRef = ref<FormInstance>();

const rules = {
  name: [
    { required: true, message: '请输入', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
  ],
  remark: [
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
  ],
};

const openDialog = () => {
  if (props.currentOperation === 'edit') {
    formData.name = props.currentOrgNode.data.name;
    formData.remark = props.currentOrgNode.data.remark;
  } else {
    formData.name = '';
    formData.remark = '';
  }
}

const clickConfirm = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid) => {
    if (valid) {
      if (props.currentOperation === 'add') {
        // addOrgNode();
        emit('addOrgNode', formData);
      } else {
        // editOrgNode();
        emit('editOrgNode', formData);
      }
    }
  });
};

// const addOrgNode = () => {
//   let params = {
//     parentId: props.currentOrgNode.data.id,
//     name: formData.name,
//     remark: formData.remark,
//   }
//   isLoading.value = true;
//   // AddTreeNode(params).then(() => {
//   //   emit('closeAddOrEditDialog', true);
//   //   isLoading.value = false;
//   // }).catch(() => {
//   //   isLoading.value = false;
//   // })
// }

// const editOrgNode = () => {
//   let params = {
//     id: props.currentOrgNode.data.id,
//     // parentId: props.currentOrgNode.data.parentId,
//     parentId:props.currentOrgNode.data.id,
//     name: formData.name,
//     remark: formData.remark,
//   }
//   isLoading.value = true;
//   // UpdateTreeNode(params).then(() => {
//   //   emit('closeAddOrEditDialog', true);
//   //   isLoading.value = false;
//   // }).catch(() => {
//   //   isLoading.value = false;
//   // })
// }

const emit = defineEmits(['addOrgNode', 'editOrgNode', 'closeAddOrEditDialog']);
const cancel = () => {
  // 重置表单
  formRef.value?.resetFields();
  emit('closeAddOrEditDialog');
};

</script>
<style lang="scss" scoped>
.add-edit-org-node-dialog {
  .node-name {
    width: 171px;
  }
}
</style>
