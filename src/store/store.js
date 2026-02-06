import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoStore = defineStore("TodoStore", () => {
    const todos = ref([
        { id: 1, text: 'Выучить Pinia', completed: false },
        { id: 2, text: 'Написать крутой код', completed: true }
    ])
    const filter = ref('all')

    const filteredTodos = computed(() => {
        if (filter.value === 'finished') return todos.value.filter(i => i.completed === true)
        if (filter.value === 'unfinished') return todos.value.filter(i => !i.completed === true)
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

    return { todos, filter, filteredTodos, addTodo, toggleTodo, deleteTodo }

})