<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    console.log("mounted")
})
</script>
