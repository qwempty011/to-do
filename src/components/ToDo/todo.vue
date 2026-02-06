<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Заголовок -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Todo List
        </h1>
        <p class="text-gray-600">Организуйте свои задачи красиво ✨</p>
      </div>

      <TodoForm @add="addTodo" />

      <div class="flex justify-center gap-2 mb-6">
        <button 
          @click="filter = 'all'"
          :class="['px-4 py-2 rounded-xl transition-all font-medium', 
                  filter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50']"
        >
          Все
        </button>
        <button 
          @click="filter = 'unfinished'"
          :class="['px-4 py-2 rounded-xl transition-all font-medium', 
                  filter === 'unfinished' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50']"
        >
          Текущие
        </button>
        <button 
          @click="filter = 'finished'"
          :class="['px-4 py-2 rounded-xl transition-all font-medium', 
                  filter === 'finished' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50']"
        >
          Выполненные
        </button>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
        <ul class="space-y-3">
          <TodoList
            v-for="item in filteredTodos" 
            :key="item.id" 
            :todo="item" 
            @toggle="toggleTodo"
            @remove="deleteTodo"
          />
        </ul>
        
        <div 
          v-if="!filteredTodos.length" 
          class="text-center py-16"
        >
          <div class="text-6xl mb-4">📝</div>
          <p class="text-gray-400 text-lg">Задач пока нет. Добавьте первую!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoList from './todoList.vue'
import TodoForm from './todoForm.vue'
import { useTodoStore } from '../../store/store'
import { storeToRefs } from 'pinia'

const store = useTodoStore()
const { filteredTodos, filter } = storeToRefs(store)
const { toggleTodo, deleteTodo, addTodo } = store

</script>

<style>

</style>