<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 v-if="title" class="card-title">{{ title }}</h2>
      <div class="chart-container" :style="{ height: height }">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  type: {
    type: String,
    default: "line",
    validator: (value) =>
      ["line", "bar", "pie", "doughnut", "radar", "polarArea"].includes(value),
  },
  title: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: String,
    default: "300px",
  },
});

const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");
  chartInstance = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...props.options,
    },
  });
};

onMounted(() => {
  createChart();
});

watch(
  () => [props.data, props.type, props.options],
  () => {
    createChart();
  },
  { deep: true }
);
</script>
