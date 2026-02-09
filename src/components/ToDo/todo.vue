<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-12 px-4 sm:px-6">
    <div class="max-w-2xl mx-auto">

      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">
          Todo List
        </h1>
        <p class="text-sm sm:text-base text-gray-600">Организуйте свои задачи красиво ✨</p>
      </div>

      <TodoForm @add="addTodo" />

      <div class="flex flex-col gap-4 sm:gap-5 mb-6">

        <div class="flex justify-center gap-2 sm:gap-3 flex-wrap">
          <button 
            v-for="type in ['all', 'unfinished', 'finished']" 
            :key="type"
            @click="store.filter = type" 
            :class="[
              'px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 font-medium text-sm sm:text-base border-2 touch-manipulation',
              store.filter === type 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50 active:scale-95'
            ]"
          >
            {{ type === 'all' ? 'Все' : type === 'unfinished' ? 'Текущие' : 'Завершенные' }}
          </button>
        </div>

        <div class="flex items-center justify-center gap-3 sm:gap-4 my-1">
          <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1 max-w-[100px]"></div>
          <span class="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Категории</span>
          <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1 max-w-[100px]"></div>
        </div>

        <div class="flex justify-center gap-2 sm:gap-3 flex-wrap">
          <button 
            v-for="(info, id) in store.categories" 
            :key="id"
            @click="store.filter = id"
            :class="[
              'px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 font-medium text-sm border-2 touch-manipulation',
              store.filter === id 
                ? `${info.color} border-transparent text-white shadow-lg scale-105` 
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 active:scale-95'
            ]"
          >
            {{ info.name }}
          </button>
        </div>
      </div>

      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200/50">
        <draggable 
          :list="filteredTodos"
          item-key="id" 
          tag="ul"
          class="space-y-2.5 sm:space-y-3"
          handle=".drag-handle" 
          @change="store.saveToDb"
          :animation="150"
          ghost-class="ghost"
          drag-class="dragging"
          :delay="100"
          :delay-on-touch-only="true"
          :touch-start-threshold="5"
        >
          <template #item="{ element }">
            <TodoList  
              :task="element" 
              @toggle="store.toggleTodo" 
              @remove="store.deleteTodo"
            />
          </template>
        </draggable>
        
        <div 
          v-if="filteredTodos.length === 0" 
          class="text-center py-16 sm:py-20"
        >
          <div class="text-6xl sm:text-7xl mb-4 sm:mb-5 animate-bounce">📝</div>
          <p class="text-gray-400 text-base sm:text-lg font-medium px-4">Задач пока нет. Добавьте первую!</p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <p class="text-xs sm:text-sm text-gray-500">
          Всего задач: <span class="font-semibold text-blue-600">{{ store.todos.length }}</span> • 
          Выполнено: <span class="font-semibold text-green-600">{{ store.todos.filter(t => t.completed).length }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import TodoList from './todoList.vue'
import TodoForm from './todoForm.vue'
import { useTodoStore } from '../../store/store'
import { storeToRefs } from 'pinia'

const store = useTodoStore()
const { filteredTodos } = storeToRefs(store)
</script>

<style scoped>

.dragging {
  opacity: 0.6;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}


.ghost {
  opacity: 0.3;
  background: #e0e7ff;
  border: 2px dashed #818cf8;
  border-radius: 0.75rem;
}


ul > * {
  transition: transform 0.15s ease;
}


.drag-handle {
  cursor: grab;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
}

.drag-handle:active {
  cursor: grabbing;
}


* {
  -webkit-touch-callout: none;
}
</style>