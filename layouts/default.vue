<template>
  <div>
    <h3>我是头部</h3>
  </div>

  <!--  主题内内容-->
  <div>
    <!--  使用插槽-->
    <slot />
  </div>

  <div>
    <h3>我是底部</h3>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
