<template>
  <div class="card bg-base-100 shadow-xl">
    <div v-if="title || $slots.actions" class="card-body pb-0">
      <div class="flex justify-between items-center">
        <h2 v-if="title" class="card-title">{{ title }}</h2>
        <div class="flex gap-2">
          <slot name="actions" />
        </div>
      </div>
    </div>

    <div v-if="$slots.filters" class="px-6 py-4 bg-base-200">
      <slot name="filters" />
    </div>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th v-if="selectable">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                :checked="allSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="{ 'cursor-pointer hover:bg-base-200': column.sortable }"
              @click="column.sortable && sort(column.key)"
            >
              <div class="flex items-center gap-2">
                {{ column.label }}
                <span
                  v-if="column.sortable && sortBy === column.key"
                  class="text-primary"
                >
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </div>
            </th>
            <th v-if="$slots['row-actions']">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="colspan" class="text-center py-12">
              <span
                class="loading loading-spinner loading-lg text-primary"
              ></span>
              <p class="mt-2 text-base-content/70">Loading...</p>
            </td>
          </tr>
          <tr v-else-if="!data || data.length === 0">
            <td :colspan="colspan" class="text-center py-12">
              <p class="text-base-content/70">{{ emptyMessage }}</p>
            </td>
          </tr>
          <tr
            v-else
            v-for="item in data"
            :key="item.id"
            :class="{ active: isSelected(item.id) }"
            class="hover"
          >
            <td v-if="selectable">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                :checked="isSelected(item.id)"
                @change="toggleSelect(item.id)"
              />
            </td>
            <td v-for="column in columns" :key="column.key">
              <slot
                :name="`cell-${column.key}`"
                :item="item"
                :value="item[column.key]"
              >
                {{ item[column.key] }}
              </slot>
            </td>
            <td v-if="$slots['row-actions']">
              <slot name="row-actions" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="pagination && pagination.total > pagination.per_page"
      class="card-body pt-0"
    >
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div class="text-sm text-base-content/70">
          Showing {{ pagination.from }} to {{ pagination.to }} of
          {{ pagination.total }} entries
        </div>
        <div class="join">
          <button
            :disabled="pagination.current_page === 1"
            @click="$emit('page-change', pagination.current_page - 1)"
            class="join-item btn btn-sm"
          >
            «
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            :class="{ 'btn-active': page === pagination.current_page }"
            @click="$emit('page-change', page)"
            class="join-item btn btn-sm"
          >
            {{ page }}
          </button>
          <button
            :disabled="pagination.current_page === pagination.last_page"
            @click="$emit('page-change', pagination.current_page + 1)"
            class="join-item btn btn-sm"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyMessage: {
    type: String,
    default: "No data available",
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  pagination: Object,
});

const emit = defineEmits(["page-change", "sort-change", "selection-change"]);

const selectedItems = ref([]);
const sortBy = ref("");
const sortOrder = ref("asc");

const colspan = computed(() => {
  let count = props.columns.length;
  if (props.selectable) count++;
  if (props.$slots["row-actions"]) count++;
  return count;
});

const allSelected = computed(() => {
  return (
    props.data.length > 0 && selectedItems.value.length === props.data.length
  );
});

const visiblePages = computed(() => {
  if (!props.pagination) return [];

  const current = props.pagination.current_page;
  const last = props.pagination.last_page;
  const pages = [];

  if (last <= 7) {
    for (let i = 1; i <= last; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, "...", last);
    } else if (current >= last - 2) {
      pages.push(1, "...", last - 3, last - 2, last - 1, last);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", last);
    }
  }

  return pages;
});

const isSelected = (id) => {
  return selectedItems.value.includes(id);
};

const toggleSelect = (id) => {
  const index = selectedItems.value.indexOf(id);
  if (index > -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(id);
  }
  emit("selection-change", selectedItems.value);
};

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = props.data.map((item) => item.id);
  }
  emit("selection-change", selectedItems.value);
};

const sort = (key) => {
  if (sortBy.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = key;
    sortOrder.value = "asc";
  }
  emit("sort-change", { key, order: sortOrder.value });
};
</script>
