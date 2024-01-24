import { json } from "node:stream/consumers"
import { createTodo, findTodos, removeTodo, updateTodo } from "../todos_storage.js"

export async function index (request, response) {
    return findTodos()
}

export async function create (request, response) {
    return createTodo(await json(request))
}

export  async function remove (request, response, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    await removeTodo(id)
    response.writeHead(204)
}

export  async function update(request, response, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    return updateTodo(id, await json(request))
}