import { readFile, writeFile } from "node:fs/promises"
import { stringify } from "node:querystring"

const path = 'storage/todos.json'

/**
 * @typedef {object} Todo
 * @property {number} id 
 * @property {string} title 
 * @property {string} status
 */

/**
 * @return {Promise<Todo[]>}
 */
export async function findTodos () {
    const data = await readFile(path, 'utf-8')
    return JSON.parse(data)
}

/**
 * @param {string} title
 * @param {string} status
 * @return {Promise<Todo>}
 */
export async function createTodo ({title, completed}) {
    const todo = {title, status: 'todo', id: Date.now()}
    const todos = [todo, ...await findTodos()]
    await writeFile(path, JSON.stringify(todos))
    return todo
}