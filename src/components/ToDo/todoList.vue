<template>
  <li class="group relative flex items-center gap-2 sm:gap-4 p-3 sm:p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 active:scale-[0.98] sm:hover:scale-[1.01]">
    
    <div class="drag-handle flex-shrink-0 cursor-grab active:cursor-grabbing p-2 -m-1 text-gray-400 hover:text-blue-500 transition-colors touch-none">
      <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2zM7 15h2v2H7v-2zm4 0h2v2h-2v-2z"/>
      </svg>
    </div>

    <div 
      :class="task.completed ? 'bg-green-400' : 'bg-blue-500'" 
      class="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 rounded-l-xl transition-all duration-300"
    ></div>

    <div class="relative flex-shrink-0">
      <input 
        type="checkbox" 
        :checked="task.completed" 
        @change="emit('toggle', task.id)" 
        class="w-6 h-6 sm:w-6 sm:h-6 rounded-lg border-2 border-gray-300 text-blue-600 cursor-pointer touch-manipulation"
      />
    </div>
 
    <span
      class="flex-1 min-w-0 break-words text-sm sm:text-lg font-medium transition-all duration-300 select-none leading-snug py-1"
      :class="{ 'line-through text-gray-400 italic': task.completed, 'text-gray-800': !task.completed }"
    >
      {{ task.text }}
    </span>

    <button 
      @click="emit('remove', task.id)"
      class="flex-shrink-0 w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-500 hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all touch-manipulation"
    >
      <svg class="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </li>
</template>

<script setup>
import { useTodoStore } from '../../store/store'

const store = useTodoStore();

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'remove'])

const cat = store.categories[props.task.category] || store.categories.home;
</script>

<style scoped>

* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

.drag-handle {
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}

@media (max-width: 640px) {
  li {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
}
</style>