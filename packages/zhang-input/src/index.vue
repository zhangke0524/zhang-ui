<template>
  <el-button :type="props.type" :size="props.size">{{ props.label }}</el-button>
</template>

<script setup lang="ts">
import type { ZhangInputProps } from "@/zhang-input/src/type"

defineOptions({
  name: "ZhangInput"
})

const props = withDefaults(defineProps<ZhangInputProps>(), {
  label: "zhang-按钮",
  type: "default",
  size: "default",
})
</script>