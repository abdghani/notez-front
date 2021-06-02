import gql from 'graphql-tag';

export const addTodoQuery = gql`
    mutation createtodo(
        $content: String!
        $tdate: String!
    ){
        createTodo(
            content: $content
            tdate: $tdate
        ){
            id
            content
            createdAt
            updatedAt
        }
    }
`

export const fetchTodoQuery = gql`
    query {
        fetchTodo{
            id
            content
            status
            createdAt
            updatedAt
        }
    }

`

export const updateTodoQuery = gql`
    mutation updatetodo(
        $id: ID!
        $status: Boolean!
        $updatedAt: String!
    ){
        updateTodo(
            id: $id
            status: $status
            updatedAt: $updatedAt
        ){
            id
            content
            status
            createdAt
            updatedAt
        }
    }
`