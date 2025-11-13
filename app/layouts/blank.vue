<template>
  <div class="layout-blank">
    <slot />
  </div>
</template>

<style scoped>
  .layout-blank {
    min-height: 100vh;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom right, #33ccff 0%, #ff99cc 100%);
    overflow: hidden;
  }
</style>
