import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useTodoStore = defineStore("TodoStore", () => {
    const todos = ref([])
    const filter = ref('all')

    const categories = ref({
        work: { name: 'Работа', color: 'bg-blue-500' },
        home: { name: 'Дом', color: 'bg-orange-500' },
        study: { name: 'Учеба', color: 'bg-purple-500' }
    });

    const todosInLocalStorage = localStorage.getItem('todos')
    if (todosInLocalStorage) {
        todos.value = JSON.parse(todosInLocalStorage)
    }

    const filteredTodos = computed(() => {
        const currentFilter = filter.value

        if (currentFilter === 'all') {
            return todos.value
        }

        if (currentFilter === 'finished') {
            return todos.value.filter(todo => todo.completed)
        }

        if (currentFilter === 'unfinished') {
            return todos.value.filter(todo => !todo.completed)
        }

        if (categories.value[currentFilter]) {
            return todos.value.filter(todo => todo.category === currentFilter)
        }

        return todos.value
    })

    function addTodo(text, categoryId = 'home') {
        if (!text) return
        todos.value.push({
            id: Math.floor(Math.random() * 10000),
            text,
            completed: false,
            category: categoryId
        })
    }

    function toggleTodo(id) {
        const todo = todos.value.find(i => i.id === id)
        if (todo) todo.completed = !todo.completed
    }

    function deleteTodo(id) {
        todos.value = todos.value.filter(i => i.id !== id)
    }

    function saveToDb() {
        localStorage.setItem('todos', JSON.stringify(todos.value));
    }

    watch(
        todos,
        (newTodos) => {
            localStorage.setItem('todos', JSON.stringify(newTodos))
        }, { deep: true }
    )

    return {
        todos,
        filter,
        categories,
        filteredTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        saveToDb
    }
})