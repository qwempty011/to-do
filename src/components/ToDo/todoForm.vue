<template>
     <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div class="flex gap-3">
          <div class="relative flex-1">
            <input 
              type="text" 
              v-model="newTodoText" 
              @keyup.enter="handleAdd" 
              placeholder="Введите новую задачу..." 
              class="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400"
            />
            
          </div>
          
          <button 
            @click="handleAdd"
            class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!newTodoText.trim()"
          >
            Добавить
          </button>
        </div>
      </div> 
</template>

<script setup>
    import { ref } from 'vue'

    const emit = defineEmits(['add'])
    const newTodoText = ref('')

    const handleAdd = () => {
    if (newTodoText.value.trim()) {
        emit('add', newTodoText.value)
        newTodoText.value = '' 
        }
    }
</script>