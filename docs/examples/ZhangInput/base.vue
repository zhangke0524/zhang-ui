<template>
  <t-layout-page>
    <t-layout-page-item>
      <zhang-input ref="treeRef" :treeList="treeList" :isAddOrEditIng="isAddOrEditIng" @handleNodeClick="handleNodeClick" @addOrgNode="confirmAdd" @editOrgNode="confirmEdit" />
      <t-button @click="reset">重置节点</t-button>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="ZhangInput">
import { ref } from 'vue';
import { treeList } from './mockTreeData';
import { set } from '@vueuse/core';

const handleNodeClick = (node: any) => {
  console.log('node', node);
  // do something
}

const treeRef = ref<any>(null);

const reset = () => {
  treeRef.value?.resetSelectedNode();
}

let isAddOrEditIng = ref(false);
const confirmAdd = (formData: any) => {
  console.log('confirmAdd', formData);
  // do something
  isAddOrEditIng.value = true;
  setTimeout(() => {
    isAddOrEditIng.value = false;
  }, 2000);
}

const confirmEdit = (formData: any) => {
  console.log('confirmEdit', formData);
  // do something
  isAddOrEditIng.value = true;
  setTimeout(() => {
    isAddOrEditIng.value = false;
  }, 2000);
}
</script>