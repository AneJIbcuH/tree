<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { TreeDataModule } from 'ag-grid-enterprise';
import type { CellStyle, ColDef } from 'ag-grid-community';
import type { TreeObject } from '@/types/types';

ModuleRegistry.registerModules([TreeDataModule, AllCommunityModule]);

const { items } = defineProps<{
  items: TreeObject[];
}>();
const rowData = ref<TreeObject[]>([]);

// Путь для древовидной структуры
const getDataPath = (data: TreeObject): string[] => {
  const path: string[] = [];
  let current: TreeObject | undefined = data;

  // Поднимаемся от элемента к корню
  while (current) {
    path.unshift(String(current.id));
    const parent = rowData.value.find((item) => item.id === current?.parent);
    current = parent;
  }

  return path;
};

// Определение колонок
const columnDefs = ref<ColDef[]>([
  {
    headerName: '№ п/п',
    field: 'rowNumber',
    width: 80,
    pinned: 'left',
    cellRenderer: (params: any) => {
      // Возвращаем номер строки (начиная с 1)
      return params.node.rowIndex + 1;
    },
  },
  {
    headerName: 'ID',
    field: 'id',
    width: 100,
    pinned: 'left',
  },
  {
    headerName: 'Название',
    field: 'name',
    flex: 1,
    minWidth: 200,
    cellRenderer: 'agGroupCellRenderer',
  },
  {
    headerName: 'Категория',
    field: 'category',
    width: 120,
    valueGetter: (params) => {
      if (!params.data) return '';

      // Проверяем есть ли дочерние элементы
      const hasChildren = rowData.value.some(
        (item) => item.parent === params.data.id,
      );

      return hasChildren ? 'Группа' : 'Элемент';
    },
    cellStyle: (params) => {
      if (params.value === 'Группа') {
        return { color: '#1976d2', fontWeight: 'bold' } as CellStyle;
      }
      return { color: '#4caf50' } as CellStyle;
    },
  },
  {
    headerName: 'Родитель',
    field: 'parent',
    width: 120,
    valueFormatter: (params) => {
      if (params.value === null) return 'Корень';

      // Находим имя родителя
      const parent = rowData.value.find((item) => item.id === params.value);
      return parent ? parent.name || parent.id : params.value;
    },
  },
  {
    headerName: 'Кол-во детей',
    field: 'childrenCount',
    width: 100,
    valueGetter: (params) => {
      if (!params.data) return 0;
      return rowData.value.filter((item) => item.parent === params.data.id)
        .length;
    },
  },
]);

// Настройки для автоматической группировки
const autoGroupColumnDef = ref<ColDef>({
  headerName: 'Иерархия',
  minWidth: 250,
  cellRendererParams: {
    suppressCount: true,
    innerRenderer: (params: any) => {
      const name = params.data?.name || params.data?.id || 'Без имени';
      return `<span style="margin-left: 10px;">${name}</span>`;
    },
  },
});

watch(
  () => items,
  (newItems) => {
    rowData.value = newItems;
  },
  { immediate: true },
);

const styles = computed(() => {
  return {
    height: '500px',
    width: '100%',
  };
});
</script>

<template>
  <div class="tree-view">
    <ag-grid-vue
      class="ag-theme-alpine"
      :style="styles"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :treeData="true"
      :getDataPath="getDataPath"
      :autoGroupColumnDef="autoGroupColumnDef"
    />
  </div>
</template>

<style scoped>
.tree-view {
  height: 100%;
  width: 100%;
  padding: 16px;
}

:deep(.ag-theme-alpine) {
  --ag-header-height: 40px;
  --ag-header-foreground-color: #333;
  --ag-header-background-color: #f8f9fa;
  --ag-row-hover-color: #f0f8ff;
}

:deep(.ag-cell[col-id='rowNumber']) {
  text-align: center;
  font-weight: bold;
  background-color: #f9f9f9;
  border-right: 1px solid #e0e0e0;
}

:deep(.ag-cell[col-id='id']) {
  font-family: monospace;
  font-size: 12px;
}

:deep(.ag-row-group) {
  font-weight: bold;
}

:deep(.ag-row-leaf) {
  font-weight: normal;
}
</style>
