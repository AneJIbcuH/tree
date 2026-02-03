<script setup lang="ts">
import { TreeView } from '@/entities';
import { dataTree } from '@/shared/consts/dataTree';
</script>

<template>
  <div class="main-page">
    <TreeView :items="dataTree" />
  </div>
</template>

<style scoped lang="scss">
.main-page {
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>
