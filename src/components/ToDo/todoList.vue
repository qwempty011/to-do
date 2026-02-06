<script setup>
defineProps(['todo'])

const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="group relative flex items-center gap-4 p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:scale-[1.02]">

    <div 
      :class="todo.completed ? 'bg-green-400' : 'bg-blue-500'" 
      class="absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl transition-all duration-300"
    ></div>

    <div class="relative">
      <input 
        type="checkbox" 
        :checked="todo.completed" 
        @change="emit('toggle', todo.id)"
        class="peer w-6 h-6 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400 "
      />

      <svg 
        class="absolute  w-4 h-4 text-white pointer-events-none opacity-0 " 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
 
    <span 
      :class="{ 
        'line-through text-gray-400 italic': todo.completed,
        'text-gray-800': !todo.completed 
      }"
      class="flex-1 text-lg font-medium transition-all duration-300 select-none"
    >
      {{ todo.text }}
    </span>

    <button 
      @click="emit('remove', todo.id)"
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
      aria-label="Удалить задачу"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    
   
  </li>
</template>

<style scoped>

</style>