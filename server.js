const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db/db.json')

// middlewares padrão (logs, CORS, etc.)
const middlewares = jsonServer.defaults({
  static: './public'   // <-- garante que a pasta public seja servida
})

server.use(middlewares)
server.use(router)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
console.log(`JSON Server está em execução na porta ${PORT}!`)
})
