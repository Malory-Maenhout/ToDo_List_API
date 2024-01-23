import {createServer} from "node:http"
import { findTodos } from "./functions/todos_storage.js"
import { create } from "node:domain"

createServer(async (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const url = new URL(request.url, 'http://${req.headers.host}')
    if (url.pathname === '/^todos')
    {
        if (request.method === 'GET')
        {
            const todos = await findTodos()
            response.write(JSON.stringify(todos))
        }
        else if (request.method === 'POST')
        {
            const todo = await createTodo(await json(request))
            response.write(JSON.stringify(todo))
        }
    }
    else 
    {
        response.writeHead(404)
    }

    request.end()
}).listen(3000)

