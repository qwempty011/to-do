<template>
    <div class="min-h-screen bg-slate-900 p-8">
        <div class="max-w-5xl mx-auto">
            <div class="flex gap-2 mb-10 bg-slate-800/50 backdrop-blur-xl p-2 rounded-2xl w-fit mx-auto border border-slate-700/50">
                <button 
                    @click="currentPage = 'personal'"
                    :class="[
                        'px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm',
                        currentPage === 'personal' 
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    ]"
                >
                    personal
                </button>
                <button 
                    @click="currentPage = 'professional'"
                    :class="[
                        'px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm',
                        currentPage === 'professional' 
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    ]"
                >
                    professional
                </button>
            </div>

            <div class="bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
                <div class="mb-8">
                    <div class="flex gap-3">
                        <input 
                            type="text" 
                            @keyup.enter="addTask()"
                            v-model="task"
                            placeholder="What needs to be done?"
                            class="flex-1 px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-white placeholder-slate-500"
                        >
                        <button 
                            v-if="task != ''"
                            @click="addTask()"
                            class="px-8 py-4 bg-cyan-500 text-white font-medium rounded-2xl hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40"
                        >
                            Добавить
                        </button>
                        <button 
                            v-else
                            class="px-8 py-4 bg-red-500 text-white font-medium rounded-2xl  transition-all duration-300 "
                        >
                            введите задачу
                        </button>
                    </div>
                    <p 
                        v-show=""
                        class="mt-3 text-slate-500 text-sm px-2"
                    >
                        {{ task }}
                    </p>
                </div>

                <div class="flex gap-2 mb-6 justify-center">
                    <button 
                        @click="filter = 'all'"
                        :class="[
                            'px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm',
                            filter === 'all' 
                                ? 'bg-slate-700 text-white' 
                                : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                        ]"
                    >
                        Все ({{ currentTasks.length }})
                    </button>
                    <button 
                        @click="filter = 'active'"
                        :class="[
                            'px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm',
                            filter === 'active' 
                                ? 'bg-slate-700 text-white' 
                                : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                        ]"
                    >
                        Активные ({{ currentTasks.filter(t => !t.done).length }})
                    </button>
                    <button 
                        @click="filter = 'completed'"
                        :class="[
                            'px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm',
                            filter === 'completed' 
                                ? 'bg-slate-700 text-white' 
                                : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                        ]"
                    >
                        Завершенные ({{ currentTasks.filter(t => t.done).length }})
                    </button>
                </div>

               
                <div class="space-y-2">
                    <div 
                        v-for="(tsk, index) in filteredTasks" 
                        :key="index"
                        class="group flex items-center gap-4 p-5 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:border-cyan-500/30 hover:bg-slate-900/50 transition-all duration-300"
                    >
                        <label class="flex items-center cursor-pointer select-none group/checkbox">
                            <input 
                                type="checkbox" 
                                v-model="tsk.done"
                                class="peer hidden"
                                @click="tsk.done = true "
                            >
                            <span class="w-5 h-5 rounded-lg border-2 border-slate-600 bg-slate-800/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 peer-checked:shadow-lg peer-checked:shadow-cyan-500/50 group-hover/checkbox:border-cyan-500/50">
                                
                            </span>
                        </label>

                        <p 
                            class="text-slate-200 font-normal flex-1 transition-all duration-300"
                            :class="{ 'line-through text-slate-500 opacity-50': tsk.done }"
                        >
                            {{ tsk.text }}
                        </p>

                        <button 
                            @click="deleteTask(index)"
                            class="px-4 py-2 bg-red-500/20 text-red-400 font-medium rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/30"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>


    export default {
        data() {
            return{
                task: '',
                currentPage: 'personal',
                personal: [],
                professional: [],
                error: 'введите текст',
                filter: 'all'
            }
        },

        computed: {
            currentTasks() {
                return this[this.currentPage]
            },

            filteredTasks() {
                const tasks = this[this.currentPage]
                
                if (this.filter === 'active') {
                    return tasks.filter(task => !task.done)
                }
                if (this.filter === 'completed') {
                    return tasks.filter(task => task.done)
                }
                return tasks 
            }
        },

        methods: {
            addTask() {
                if (this.task.trim().length < 1) return
                
                 const newTask = {
                    id: Date.now(),
                    text: this.task.trim(),
                    done: false
                }
                this[this.currentPage].push(newTask)
                this.task = ''
            },

            deleteTask(index) {
                this[this.currentPage].splice(index, 1)
            },

            
        }
    }
</script>

<style scoped>

</style>
