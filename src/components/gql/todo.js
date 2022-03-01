import gql from 'graphql-tag';

export const addTodoQuery = gql`
    mutation($input: CreateTodoInput) {
        createTodo(createTodoInput: $input) {
            id
            content
            status
            updatedAt
            createdAt
            userSub
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
    mutation ($input: UpdateTodoInput){
        updateTodo(updateTodoInput: $input){
            id
            content
            status
            createdAt
            updatedAt
        }
    }
`