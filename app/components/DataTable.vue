<template>
  <div class="data-table">
    <div v-if="title || $slots.actions" class="table-header">
      <h2 v-if="title" class="table-title">{{ title }}</h2>
      <div class="table-actions">
        <slot name="actions" />
      </div>
    </div>

    <div v-if="$slots.filters" class="table-filters">
      <slot name="filters" />
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th v-if="selectable" class="checkbox-col">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleSelectAll"
              >
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="{ sortable: column.sortable }"
              @click="column.sortable && sort(column.key)"
            >
              {{ column.label }}
              <span v-if="column.sortable && sortBy === column.key" class="sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th v-if="$slots.actions" class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="colspan" class="loading-cell">
              <div class="spinner"></div>
              <p>Loading...</p>
            </td>
          </tr>
          <tr v-else-if="!data || data.length === 0">
            <td :colspan="colspan" class="empty-cell">
              <p>{{ emptyMessage }}</p>
            </td>
          </tr>
          <tr v-else v-for="item in data" :key="item.id" :class="{ selected: isSelected(item.id) }">
            <td v-if="selectable" class="checkbox-col">
              <input
                type="checkbox"
                :checked="isSelected(item.id)"
                @change="toggleSelect(item.id)"
              >
            </td>
            <td v-for="column in columns" :key="column.key">
              <slot :name="`cell-${column.key}`" :item="item" :value="item[column.key]">
                {{ item[column.key] }}
              </slot>
            </td>
            <td v-if="$slots['row-actions']" class="actions-col">
              <slot name="row-actions" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination && pagination.total > pagination.per_page" class="table-pagination">
      <div class="pagination-info">
        Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
      </div>
      <div class="pagination-controls">
        <button
          :disabled="pagination.current_page === 1"
          @click="$emit('page-change', pagination.current_page - 1)"
          class="pagination-btn"
        >
          Previous
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="{ active: page === pagination.current_page }"
          @click="$emit('page-change', page)"
          class="pagination-btn"
        >
          {{ page }}
        </button>
        <button
          :disabled="pagination.current_page === pagination.last_page"
          @click="$emit('page-change', pagination.current_page + 1)"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'No data available'
  },
  selectable: {
    type: Boolean,
    default: false
  },
  pagination: Object
})

const emit = defineEmits(['page-change', 'sort-change', 'selection-change'])

const selectedItems = ref([])
const sortBy = ref('')
const sortOrder = ref('asc')

const colspan = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  if (props.$slots['row-actions']) count++
  return count
})

const allSelected = computed(() => {
  return props.data.length > 0 && selectedItems.value.length === props.data.length
})

const visiblePages = computed(() => {
  if (!props.pagination) return []

  const current = props.pagination.current_page
  const last = props.pagination.last_page
  const pages = []

  if (last <= 7) {
    for (let i = 1; i <= last; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, '...', last)
    } else if (current >= last - 2) {
      pages.push(1, '...', last - 3, last - 2, last - 1, last)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', last)
    }
  }

  return pages
})

const isSelected = (id) => {
  return selectedItems.value.includes(id)
}

const toggleSelect = (id) => {
  const index = selectedItems.value.indexOf(id)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(id)
  }
  emit('selection-change', selectedItems.value)
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = props.data.map(item => item.id)
  }
  emit('selection-change', selectedItems.value)
}

const sort = (key) => {
  if (sortBy.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortOrder.value = 'asc'
  }
  emit('sort-change', { key, order: sortOrder.value })
}
</script>

<style scoped>
.data-table {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.table-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.table-actions {
  display: flex;
  gap: 0.75rem;
}

.table-filters {
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}

.table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.table th.sortable {
  cursor: pointer;
  user-select: none;
}

.table th.sortable:hover {
  background: #f3f4f6;
}

.sort-icon {
  margin-left: 0.25rem;
  color: #667eea;
}

.table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #374151;
}

.table tbody tr:hover {
  background: #f9fafb;
}

.table tbody tr.selected {
  background: #eff6ff;
}

.checkbox-col {
  width: 40px;
  text-align: center;
}

.actions-col {
  width: 120px;
  text-align: right;
}

.loading-cell,
.empty-cell {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}
</style>
