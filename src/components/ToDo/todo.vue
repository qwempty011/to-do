<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 sm:py-12 px-3 sm:px-4">
    <div class="max-w-2xl mx-auto">

      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Todo List
        </h1>
        <p class="text-sm sm:text-base text-gray-600">Организуйте свои задачи красиво ✨</p>
      </div>

      <TodoForm @add="addTodo" />

      <div class="flex justify-center gap-2 mb-4 sm:mb-6 flex-wrap">
        <button 
          @click="filter = 'all'"
          :class="['px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all font-medium text-sm sm:text-base', 
                  filter === 'all' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 hover:bg-gray-50 active:scale-95']"
        >
          Все
        </button>
        <button 
          @click="filter = 'unfinished'"
          :class="['px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all font-medium text-sm sm:text-base', 
                  filter === 'unfinished' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 hover:bg-gray-50 active:scale-95']"
        >
          Текущие
        </button>
        <button 
          @click="filter = 'finished'"
          :class="['px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all font-medium text-sm sm:text-base', 
                  filter === 'finished' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 hover:bg-gray-50 active:scale-95']"
        >
          Выполненные
        </button>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
        <ul class="space-y-2.5 sm:space-y-3">
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
          class="text-center py-12 sm:py-16"
        >
          <div class="text-5xl sm:text-6xl mb-3 sm:mb-4">📝</div>
          <p class="text-gray-400 text-base sm:text-lg px-4">Задач пока нет. Добавьте первую!</p>
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