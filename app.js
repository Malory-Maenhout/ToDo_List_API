import { createServer } from "node:http"
import { create, index, remove, update } from "./functions/api/todos.js"
import { NotFoundError } from "./functions/errors.js"

createServer(async (request, response) => {
    try {
        response.setHeader('Content-Type', 'application/json')
        const url = new URL(request.url, `http://${request.headers.host}`)
        const endpoint = `${request.method}:${url.pathname}`
        let results
        switch (endpoint) {
            case 'GET:/todos':  
                results = await index(request, response)
                break;
            case 'POST:/todos':  
                results = await create(request, response)
                break;
            case 'PUT:/todos':  
                results = await update(request, response, url)
                break;
            case 'DELETE:/todos':  
                results = await remove(request, response, url)
                break;
            default:
                response.writeHead(404)
        } 
        if(results) {
            response.write(JSON.stringify(results))
        }
        
    } catch (e) {
        if (e instanceof NotFoundError) {
            response.writeHead(404)
        } else {
            throw e
        }
    }
    response.end()
}).listen(3000)

