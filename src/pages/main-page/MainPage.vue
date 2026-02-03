<script setup lang="ts">
import { TreeStore } from '@/shared/classes';
import type { TreeObject } from '@/types/types';
import { AgGridVue } from 'ag-grid-vue3';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { TreeView } from '@/entities';

ModuleRegistry.registerModules([AllCommunityModule]);
const data: TreeObject[] = [
  {
    id: 1,
    parent: null,
    name: 'Главный офис',
    type: 'office',
    budget: 100000,
  },
  {
    id: 2,
    parent: 1,
    name: 'Отдел разработки',
    type: 'department',
    employees: 15,
  },
  {
    id: 3,
    parent: 2,
    name: 'Frontend команда',
    type: 'team',
    tech: 'Vue.js',
  },
  {
    id: 4,
    parent: 2,
    name: 'Backend команда',
    type: 'team',
    tech: 'Node.js',
  },
  {
    id: 5,
    parent: 1,
    name: 'Отдел маркетинга',
    type: 'department',
    budget: 50000,
  },
  {
    id: 6,
    parent: 5,
    name: 'SMM группа',
    type: 'group',
    platform: 'Instagram',
  },
  {
    id: 7,
    parent: null,
    name: 'Филиал в СПб',
    type: 'office',
    location: 'Санкт-Петербург',
  },
  { id: 8, parent: 7, name: 'Отдел продаж', type: 'department' },
  {
    id: 9,
    parent: null,
    name: 'Удаленный сотрудник',
    type: 'employee',
    remote: true,
  },
  {
    id: 10,
    parent: 3,
    name: 'Иванов Иван',
    type: 'employee',
    position: 'Senior Developer',
  },
  {
    id: 11,
    parent: 3,
    name: 'Петров Петр',
    type: 'employee',
    position: 'Junior Developer',
  },
  {
    id: 12,
    parent: 4,
    name: 'Сидоров Сидор',
    type: 'employee',
    position: 'Backend Lead',
  },
];
</script>

<template>
  <div class="main-page">
    <TreeView :items="data" />
  </div>
</template>

<style scoped lang="scss">
.main-page {
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>
