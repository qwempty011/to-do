<template>
  <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200/50">

    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <div class="relative flex-1">
        <input 
          type="text" 
          v-model="newTodoText" 
          @keyup.enter="handleAdd" 
          placeholder="Введите новую задачу..." 
          class="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 placeholder:text-gray-400 bg-white"
        />
        <div 
          v-if="newTodoText.trim()" 
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm hidden sm:block"
        >
          ↵
        </div>
      </div>
      
      <button 
        @click="handleAdd"
        class="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base sm:text-lg rounded-xl hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation"
        :disabled="!newTodoText.trim()"
      >
        <span class="hidden sm:inline">Добавить</span>
        <span class="sm:hidden">+ Добавить задачу</span>
      </button>
    </div>

    <div class="space-y-2">
      <label class="block text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide px-1">
        Выберите категорию
      </label>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="(info, key) in store.categories" 
          :key="key"
          type="button"
          @click="selectedCategory = key"
          :class="[
            'px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 border-2 touch-manipulation',
            selectedCategory === key 
              ? `${info.color} border-transparent text-white shadow-md scale-105` 
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 active:scale-95'
          ]"
        >
          <span class="mr-1">{{ info.icon }}</span>
          <span>{{ info.name }}</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useTodoStore } from '../../store/store'

    const store = useTodoStore();
    const emit = defineEmits(['add'])
    const newTodoText = ref('')
    const selectedCategory = ref('home')

    const handleAdd = () => {
      if (newTodoText.value.trim()) {
          store.addTodo(newTodoText.value, selectedCategory.value)
          newTodoText.value = '' 
      }
    }
</script>