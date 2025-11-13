<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 v-if="label" class="card-title">{{ label }}</h2>

      <!-- Drop Zone -->
      <div
        @drop.prevent="handleDrop"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        :class="[
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragging ? 'border-primary bg-primary/10' : 'border-base-300',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ]"
        @click="!disabled && $refs.fileInput.click()"
      >
        <div class="flex flex-col items-center gap-4">
          <svg
            class="w-16 h-16 text-base-content/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <div>
            <p class="text-lg font-semibold">
              {{ isDragging ? "Drop files here" : "Drag & drop files here" }}
            </p>
            <p class="text-sm text-base-content/70 mt-1">or click to browse</p>
            <p v-if="accept" class="text-xs text-base-content/50 mt-2">
              Accepted: {{ accept }}
            </p>
            <p v-if="maxSize" class="text-xs text-base-content/50">
              Max size: {{ formatFileSize(maxSize) }}
            </p>
          </div>
        </div>

        <input
          ref="fileInput"
          type="file"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          class="hidden"
          @change="handleFileInput"
        />
      </div>

      <!-- Error Message -->
      <div v-if="error" class="alert alert-error mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ error }}</span>
      </div>

      <!-- File List -->
      <div v-if="files.length > 0" class="mt-4 space-y-2">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="flex items-center justify-between p-3 bg-base-200 rounded-lg"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content rounded-lg w-10">
                <span class="text-xs">{{ getFileExtension(file.name) }}</span>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-medium truncate">{{ file.name }}</p>
              <p class="text-sm text-base-content/70">
                {{ formatFileSize(file.size) }}
              </p>

              <!-- Upload Progress -->
              <div v-if="file.progress !== undefined" class="mt-2">
                <progress
                  class="progress progress-primary w-full"
                  :value="file.progress"
                  max="100"
                ></progress>
                <p class="text-xs text-base-content/70 mt-1">
                  {{ file.progress }}% uploaded
                </p>
              </div>
            </div>
          </div>

          <button
            @click="removeFile(index)"
            class="btn btn-ghost btn-sm btn-circle"
            :disabled="file.uploading"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div
        v-if="files.length > 0 && showUploadButton"
        class="card-actions justify-end mt-4"
      >
        <button
          @click="clearFiles"
          class="btn btn-outline"
          :disabled="uploading"
        >
          Clear All
        </button>
        <button
          @click="uploadFiles"
          class="btn btn-primary"
          :disabled="uploading"
        >
          <span v-if="uploading" class="loading loading-spinner"></span>
          {{ uploading ? "Uploading..." : "Upload Files" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  accept: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024, // 10MB
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  uploadUrl: {
    type: String,
    default: "",
  },
  showUploadButton: {
    type: Boolean,
    default: true,
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "upload", "remove", "error"]);

const fileInput = ref(null);
const files = ref([]);
const isDragging = ref(false);
const uploading = ref(false);
const error = ref("");

const handleDrop = (e) => {
  isDragging.value = false;
  if (props.disabled) return;

  const droppedFiles = Array.from(e.dataTransfer.files);
  addFiles(droppedFiles);
};

const handleFileInput = (e) => {
  const selectedFiles = Array.from(e.target.files);
  addFiles(selectedFiles);
  e.target.value = ""; // Reset input
};

const addFiles = (newFiles) => {
  error.value = "";

  const validFiles = newFiles.filter((file) => {
    // Check file size
    if (props.maxSize && file.size > props.maxSize) {
      error.value = `File ${file.name} exceeds maximum size of ${formatFileSize(
        props.maxSize
      )}`;
      return false;
    }

    // Check file type
    if (props.accept) {
      const acceptedTypes = props.accept.split(",").map((t) => t.trim());
      const fileType = file.type;
      const fileExt = "." + file.name.split(".").pop();

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExt.toLowerCase() === type.toLowerCase();
        }
        if (type.endsWith("/*")) {
          return fileType.startsWith(type.replace("/*", ""));
        }
        return fileType === type;
      });

      if (!isAccepted) {
        error.value = `File ${file.name} type not accepted`;
        return false;
      }
    }

    return true;
  });

  if (!props.multiple && validFiles.length > 0) {
    files.value = [validFiles[0]];
  } else {
    files.value = [...files.value, ...validFiles];
  }

  emit("update:modelValue", files.value);

  if (props.autoUpload && validFiles.length > 0) {
    uploadFiles();
  }
};

const removeFile = (index) => {
  const removedFile = files.value[index];
  files.value.splice(index, 1);
  emit("remove", removedFile);
  emit("update:modelValue", files.value);
};

const clearFiles = () => {
  files.value = [];
  emit("update:modelValue", []);
};

const uploadFiles = async () => {
  if (!props.uploadUrl) {
    emit("upload", files.value);
    return;
  }

  uploading.value = true;
  error.value = "";

  try {
    for (let i = 0; i < files.value.length; i++) {
      const file = files.value[i];

      if (file.uploaded) continue;

      const formData = new FormData();
      formData.append("file", file);

      // Simulate upload progress
      file.progress = 0;
      file.uploading = true;

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          file.progress = Math.round((e.loaded / e.total) * 100);
        }
      });

      await new Promise((resolve, reject) => {
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            file.uploaded = true;
            file.uploading = false;
            file.response = JSON.parse(xhr.responseText);
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Upload failed"));
        });

        xhr.open("POST", props.uploadUrl);
        xhr.send(formData);
      });
    }

    emit("upload", files.value);
  } catch (err) {
    error.value = err.message;
    emit("error", err);
  } finally {
    uploading.value = false;
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const getFileExtension = (filename) => {
  return filename.split(".").pop().toUpperCase();
};

defineExpose({
  uploadFiles,
  clearFiles,
});
</script>
