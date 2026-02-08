<script setup>
defineProps(['todo'])

const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="group relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:scale-[1.02]">

    <div 
      :class="todo.completed ? 'bg-green-400' : 'bg-blue-500'" 
      class="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 rounded-l-xl sm:rounded-l-2xl transition-all duration-300"
    ></div>

    <div class="relative flex-shrink-0 ml-1 sm:ml-0">
      <input 
        type="checkbox" 
        :checked="todo.completed" 
        @change="emit('toggle', todo.id)"
        class="peer w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400 cursor-pointer"
      />

      <svg 
        class="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 text-white pointer-events-none opacity-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
 
    <span
      class="flex-1 min-w-0 break-all
            text-base sm:text-lg font-medium
            transition-all duration-300 select-none"
      :class="{
        'line-through text-gray-400 italic': todo.completed,
        'text-gray-800': !todo.completed
      }"
    >
      {{ todo.text }}
    </span>

    <button 
      @click="emit('remove', todo.id)"
      class="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0 rounded-lg border border-gray-200 text-gray-400 hover:border-red-500 hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all"
      aria-label="Удалить задачу"
    >
      <svg class="w-4.5 h-4.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    
  </li>
</template>

<style scoped>

</style>