<template>
  <div class="single-tree-content relative">
    <el-input
      v-model="filterText"
      placeholder="请输入关键字"
      class="mt-[10px] mb-[10px]"
      @input="onQueryChanged"
      clearable
    />
    <el-auto-resizer
      :class="{
        'height-1': props.isShowEditBtn,
        'height-2': !props.isShowEditBtn
      }"
    >
      <template #default="{ height }">
        <el-tree-v2
          ref="treeRef"
          style="max-width: 230px"
          :height="height"
          :itemSize="26"
          :data="treeList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :filter-method="filterNode"
          highlight-current
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <span
              class="custom-tree-node"
              :class="
                props.isShowEditBtn && isInEdit ? 'video-center-custome-node' : 'custom-tree-node'
              "
            >
              <span
                class="node-name"
                :title="node.label"
                :class="props.isShowEditBtn && isInEdit ? 'video-center-node-name' : ''"
                >{{ node.label }}</span
              >
              <!-- <span v-show="props.isShowCameraNum && !isInEdit" :class="(currentOrgNode && currentOrgNode.id) === data.id ? '' : 'text-[#666666]'">{{ `(${data.count})` }}</span> -->
              <span class="w-[52px]" v-show="isInEdit && data.operate">
                <!-- 3级节点不允许增加 v-if="node.level !== 3" -->
                <el-icon @click="addNode($event, node, data)"
                  ><Plus
                /></el-icon>
                <el-icon
                  @click="editNode($event, node, data)"
                  class="mr-[5px]"
                  :class="node.level === 3 ? 'ml-[19px]' : 'ml-[5px]'"
                  ><Edit
                /></el-icon>
                <!-- 1级节点不允许删除 v-if="node.level !== 1" -->
                <el-icon @click="removeNode($event, node, data)"
                  ><Delete
                /></el-icon>
              </span>
            </span>
          </template>
        </el-tree-v2>
      </template>
    </el-auto-resizer>

    <template v-if="props.isShowEditBtn">
      <el-button
        @click="editTree"
        class="w-full relative bottom-[5px]"
        :type="isInEdit ? '' : 'primary'"
        >{{ isInEdit ? "关闭" : "编辑" }}</el-button
      >
    </template>

    <!-- 新增/编辑组织树 -->
    <addEditOrgTree
      :dialogVisible="isShowAddEditOrgNodeDialog"
      :currentOperation="currentOrgOperation"
      :currentOrgNode="currentOrgNode"
      :is-loading="isAddOrEditIng"
      @closeAddOrEditDialog="closeOrgDia"
      @addOrgNode="addOrgNode"
      @editOrgNode="editOrgNode"
    ></addEditOrgTree>

    <!-- 删除组织树 -->
    <DeleteDialog
      :currentDeleteName="currentOrgNode?.label"
      :dialogVisible="isShowDelDia"
      :isLoading="isInDelIng"
      @closeDeleteDialog="isShowDelDia = false"
      @confirmDelete="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { ZhangInputProps } from "@/zhang-input/src/type"
import { ref, onMounted, nextTick } from "vue"
import addEditOrgTree from "./addEditOrgTree.vue"
import DeleteDialog from "./deleteDialog.vue"

defineOptions({
  name: "ZhangInput"
})

const props = withDefaults(defineProps<ZhangInputProps>(), {
  width: "auto",
  isShowEditBtn: true,
  isAddOrEditIng: false,
  treeList: () => []
})

// import { treeList } from './mockTreeData.js';

// const treeList = ref([])
const defaultProps = {
  children: "children",
  label: "name",
  value: "id"
}
let rootNodeId = ref("")
const rootNodeData = ref(null)
let isShowAddEditOrgNodeDialog = ref(false)
let currentOrgOperation = ref("")
let currentOrgNode = ref<any>(null)
let isTreeLoading = ref(false)
const filterText = ref("")
const treeRef = ref<any>(null)

const emits = defineEmits(["handleNodeClick", "addOrgNode", "editOrgNode"])

const onQueryChanged = (query: string) => {
  // 去除前后空格
  query = query.trim()
  treeRef.value!.filter(query)
}
const filterNode = (query: string, node: any) => {
  return node.name!.includes(query)
}

// const getOrgTreeData = () => {
//   let params = {
//     // parentId: '',
//     // name: '',
//     parentIds: [],
//   };
//   isTreeLoading.value = true;
//   GetOrgTree(params)
//     .then((res: any) => {
//       treeList.value = res.data;
//       // 默认展开根节点及根节点下的第一个节点 - 改为默认展开根节点
//       if (!res.data || !res.data.length) return;
//       rootNodeData.value = res.data[0];
//       let rootId = res.data[0]?.id || '';
//       rootNodeId.value = rootId;
//       // let firstLeafId = res.data[0]?.children[0]?.id || '';
//       // 设置当前默认展开的节点
//       treeRef.value.setExpandedKeys([rootId]);
//       // 设置默认选中的节点（根节点）
//       treeRef.value.setCurrentKey(rootId);
//       // 主动触发点击事件
//       handleNodeClick(res.data[0]);
//     })
//     .catch((e) => {
//       console.log('e', e);
//     })
//     .finally(() => {
//       isTreeLoading.value = false;
//     });
// };
const handleNodeClick = (data: any) => {
  emits("handleNodeClick", data)
}

let isInEdit = ref(false)
const editTree = () => {
  isInEdit.value = !isInEdit.value
}

const addNode = (e: any, node: any, data: any) => {
  // 阻止事件向上冒泡，触发父组件的handleNodeClick事件
  e.stopPropagation()
  console.log("addNode-node", node)
  console.log("addNode-data", data)
  isShowAddEditOrgNodeDialog.value = true
  currentOrgOperation.value = "add"
  currentOrgNode.value = node
}
const editNode = (e: any, node: any, data: any) => {
  e.stopPropagation()
  console.log("editNode", node, data)
  isShowAddEditOrgNodeDialog.value = true
  currentOrgOperation.value = "edit"
  currentOrgNode.value = node
}
const removeNode = (e: any, node: any, _data: any) => {
  e.stopPropagation()
  currentOrgNode.value = node
  // 弹出删除确认框
  isShowDelDia.value = true
}

// 关闭新增/编辑组织树弹框
const closeOrgDia = (str: any) => {
  isShowAddEditOrgNodeDialog.value = false
  if (str) {
    // refreshOrgTree();
  }
}
const addOrgNode = (formData:any) => {
  emits("addOrgNode", formData)
}

const editOrgNode = (formData:any) => {
  emits("editOrgNode", formData)
}

let isShowDelDia = ref(false)
let isInDelIng = ref(false)
const confirmDelete = () => {
  // 删除节点
  isInDelIng.value = true
  // let params = {
  //   id: currentOrgNode.value.data.id,
  // };
  // DeleteTreeNode(params)
  //   .then(() => {
  //     isInDelIng.value = false;
  //     isShowDelDia.value = false;
  //     refreshOrgTree();
  //   })
  //   .catch(() => {
  //     isInDelIng.value = false;
  //   });
}

// 刷新组织树(为了避免组织树节点的展开状态发生变化，所以重新请求数据时仅刷新数据，不重新设置展开的节点)
const refreshOrgTree = () => {
  let params = {
    parentIds: []
  }
  isTreeLoading.value = true
  // GetOrgTree(params)
  //   .then((res: any) => {
  //     treeList.value = res.data;
  //   })
  //   .catch((e) => {
  //     console.log('e', e);
  //   })
  //   .finally(() => {
  //     isTreeLoading.value = false;
  //   });
}

// 设置默认展开层级
const setDefaultExpandedKeys = () => {
  let res = props.treeList
  rootNodeData.value = res[0]
  let rootId = res[0]?.id || ""
  rootNodeId.value = rootId
  nextTick(() => {
    // 设置当前默认展开的节点
    treeRef.value?.setExpandedKeys([rootId])
    // 设置默认选中的节点（根节点）
    treeRef.value?.setCurrentKey(rootId)
    // 主动触发点击事件
    handleNodeClick(res[0])
  })
}

// 重置选中的节点为根节点
const resetSelectedNode = () => {
  treeRef.value.setCurrentKey(rootNodeId.value)
  handleNodeClick(rootNodeData.value)
}

defineExpose({
  resetSelectedNode,
  refreshOrgTree
})

onMounted(() => {
  setDefaultExpandedKeys();
});
</script>

<style lang="scss" scoped>
.single-tree-content {
  width: 100%;
  height: calc(100% - 36px);
  .height-1 {
    min-height: 300px;
    height: calc(100% - 80px) !important;
  }
  .height-2 {
    min-height: 300px;
    height: calc(100% - 50px) !important;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .node-name {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :deep(.el-icon) {
    vertical-align: middle;
  }
}
.video-center-custome-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.video-center-node-name {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
