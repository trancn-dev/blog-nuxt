<template>
  <ClientOnly>
    <QuillEditor
      :theme="theme"
      :options="options"
      v-model:content="modelValue"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({ theme: 'snow' }),
    },
    theme: {
      type: String as () => '' | 'snow' | 'bubble',
      default: 'snow',
    },
  });
  const emit = defineEmits(['update:modelValue']);

  const modelValue = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (val) => {
      modelValue.value = val;
    }
  );
  watch(modelValue, (val) => {
    emit('update:modelValue', val);
  });
</script>

<style scoped lang="css">
  :deep(.ql-editor) {
    min-height: 100px;
  }
  :deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  :deep(.ql-container.ql-snow) {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>
