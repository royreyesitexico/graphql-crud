const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const TodoResolver = require('./resolvers/todo');
const todoResolver = new TodoResolver();

const typeDefinitions = gql`
  type Todo {
    title: String
    description: String
    done: Boolean
  }

  type Query {
    todos: [Todo]
    findTodo(title: String): Todo
  }

  type Mutation {
    addTodo( title: String ,description: String ,done: Boolean): Todo
    updateTodo(title: String, description: String, done: Boolean): Todo
    deleteTodo(title: String): Todo
  }
`

const resolvers = {
  Query: {
    todos: todoResolver.getAll,
    findTodo: todoResolver.find
  },
  Mutation: {
    addTodo: todoResolver.add,
    updateTodo: todoResolver.update,
    deleteTodo: todoResolver.delete
  }
}

const server = new ApolloServer({ typeDefs: typeDefinitions, resolvers })

const app = new Koa();

server.applyMiddleware({ app });

app.listen(4000, () => console.log(`Server listenning at http://localhost:4000${server.graphqlPath}`))
