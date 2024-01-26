import { readFile, writeFile } from "node:fs/promises"
import { NotFoundError } from "./errors.js"

const path = 'storage/todos.json';

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
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
}

/**
 * @param {string} title
 * @param {string} status
 * @return {Promise<Todo>}
 */
export async function createTodo ({title, status = "todo"}) {
    const todo = {id: Date.now(), title, status};
    const todos = [todo, ...await findTodos()];
    await writeFile(path, JSON.stringify(todos, null, 2));
    return todo;
}

/**
 * @param {boolean} id
 * @return {Promise}
 */
export async function removeTodo (id) {
    const todos = await findTodos();
    const todo = todos.findIndex(todo => todo.id === id);
    if(todo === -1) {
        throw new NotFoundError();
    }
    await writeFile(path, JSON.stringify(todos.filter(todo => todo.id !== id), null, 2));
}

/**
 * @param {number} id
 * @param {{status?: string, title?: string}} partialTodo
 * @return {Promise<Todo>}
 */
export async function updateTodo (id, partialTodo) {
    const todos = await findTodos();
    const todo = todos.find(todo => todo.id === id);
    if (todo === undefined)
    {
        throw new NotFoundError();
    } 
    Object.assign(todo, partialTodo);
    await writeFile(path, JSON.stringify(todos, null, 2));
    return todo;
}