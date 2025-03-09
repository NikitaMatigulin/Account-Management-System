<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { ElMessage } from 'element-plus'
import AccountManager from './components/AccountManager.vue'

onErrorCaptured((err) => {
  console.error('Перехвачена ошибка:', err)
  ElMessage.error('Произошла ошибка в приложении')
  return false
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <suspense>
      <template #default>
        <div class="app-container">
          <component :is="Component" />
        </div>
      </template>
      <template #fallback>
        <div class="loading">Загрузка...</div>
      </template>
    </suspense>
  </router-view>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.app-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #606266;
}
</style>
