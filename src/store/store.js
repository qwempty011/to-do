import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useTodoStore = defineStore("TodoStore", () => {
    const todos = ref([])
    const filter = ref('all')

    const todosInLocalStorage = localStorage.getItem('todos')
    if (todosInLocalStorage) {
        todos.value = JSON.parse(todosInLocalStorage)
    }

    const filteredTodos = computed(() => {
        if (filter.value === 'finished') return todos.value.filter(i => i.completed)
        if (filter.value === 'unfinished') return todos.value.filter(i => !i.completed)
        return todos.value
    })

    function addTodo(text) {
        if (!text) return
        todos.value.push({
            id: Math.floor(Math.random() * 10000),
            text,
            completed: false
        })
    }

    function toggleTodo(id) {
        const todo = todos.value.find(i => i.id === id)
        if (todo) todo.completed = !todo.completed
    }

    function deleteTodo(id) {
        todos.value = todos.value.filter(i => i.id !== id)
    }

    watch(
        todos,
        (newTodos) => {
            localStorage.setItem('todos', JSON.stringify(newTodos))
        }, { deep: true }
    )

    return { todos, filter, filteredTodos, addTodo, toggleTodo, deleteTodo }

})