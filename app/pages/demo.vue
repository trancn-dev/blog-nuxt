<template>
  <div class="container mx-auto p-6 space-y-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary mb-2">
        DaisyUI Component Examples
      </h1>
      <p class="text-base-content/70">Demo các component với DaisyUI styling</p>
    </div>

    <!-- Chart Component Demo -->
    <div class="divider divider-primary">
      <h2 class="text-2xl font-bold">Chart Component</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartComponent
        title="Line Chart Example"
        type="line"
        :data="lineChartData"
        height="300px"
      />

      <ChartComponent
        title="Bar Chart Example"
        type="bar"
        :data="barChartData"
        height="300px"
      />
    </div>

    <!-- Rich Text Editor Demo -->
    <div class="divider divider-secondary">
      <h2 class="text-2xl font-bold">Rich Text Editor</h2>
    </div>

    <RichTextEditor
      v-model="editorContent"
      label="Write your content"
      placeholder="Start typing your amazing content here..."
      :show-character-count="true"
    />

    <div class="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 class="font-bold">Preview Content:</h3>
        <div v-html="editorContent" class="prose"></div>
      </div>
    </div>

    <!-- File Upload Demo -->
    <div class="divider divider-accent">
      <h2 class="text-2xl font-bold">File Upload</h2>
    </div>

    <FileUpload
      v-model="uploadedFiles"
      label="Upload your files"
      accept="image/*,.pdf,.doc,.docx"
      :max-size="5 * 1024 * 1024"
      :multiple="true"
      :show-upload-button="true"
      @upload="handleUpload"
      @error="handleUploadError"
    />

    <!-- DataTable Demo -->
    <div class="divider divider-warning">
      <h2 class="text-2xl font-bold">Data Table</h2>
    </div>

    <DataTable
      title="Users List"
      :columns="tableColumns"
      :data="tableData"
      :loading="tableLoading"
      :selectable="true"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <template #actions>
        <button class="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-4 h-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add New
        </button>
        <button class="btn btn-outline btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-4 h-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
          Export
        </button>
      </template>

      <template #cell-status="{ value }">
        <span
          :class="[
            'badge',
            value === 'Active' ? 'badge-success' : 'badge-error',
          ]"
        >
          {{ value }}
        </span>
      </template>

      <template #row-actions="{ item }">
        <div class="flex gap-2 justify-end">
          <button class="btn btn-ghost btn-xs">Edit</button>
          <button class="btn btn-ghost btn-xs text-error">Delete</button>
        </div>
      </template>
    </DataTable>

    <!-- Theme Selector -->
    <div class="divider">
      <h2 class="text-2xl font-bold">Theme Selector</h2>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Choose DaisyUI Theme</h2>
        <select
          v-model="selectedTheme"
          class="select select-bordered w-full max-w-xs"
          @change="changeTheme"
        >
          <option v-for="theme in themes" :key="theme" :value="theme">
            {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Chart Data
const lineChartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales 2024",
      data: [65, 59, 80, 81, 56, 55],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4,
    },
  ],
});

const barChartData = ref({
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      label: "Revenue",
      data: [120, 190, 30, 50],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
      ],
    },
  ],
});

// Rich Text Editor
const editorContent = ref(
  "<p>This is a <strong>rich text editor</strong> powered by TipTap!</p>"
);

// File Upload
const uploadedFiles = ref([]);

const handleUpload = (files) => {
  console.log("Files uploaded:", files);
  alert("Files uploaded successfully!");
};

const handleUploadError = (error) => {
  console.error("Upload error:", error);
  alert("Upload failed: " + error.message);
};

// Data Table
const tableColumns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "created_at", label: "Created", sortable: true },
];

const tableData = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    created_at: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Inactive",
    created_at: "2024-03-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "Active",
    created_at: "2024-04-05",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "Inactive",
    created_at: "2024-05-12",
  },
]);

const tableLoading = ref(false);

const handleSelectionChange = (selectedIds) => {
  console.log("Selected items:", selectedIds);
};

const handleSortChange = ({ key, order }) => {
  console.log("Sort by:", key, order);
};

// Theme Selector
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
];

const selectedTheme = ref("light");

const changeTheme = () => {
  document.documentElement.setAttribute("data-theme", selectedTheme.value);
};
</script>
