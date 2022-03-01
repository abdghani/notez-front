import gql from 'graphql-tag';

export const fetchNotesQuery = gql`
    query fetchNotes(
        $archieved: Boolean!
        ){
            fetchNotes(
                archieved: $archieved
            ){
                title
                id
                createdAt
                archieved
            }
    }
`

export const fetchNoteQuery = gql`
    query fetchNote($id: ID!){
        fetchNote(id: $id){
            id
            title
            content
            createdAt
            userSub
            has_header
            header_image
            header_content
            tags
            archieved
        }
    }

`

export const deleteNotesQuery = gql`
    mutation deleteNote($id: ID!){
        deleteNote(id: $id)
    }
`

export const addNotesQuery = gql`
    mutation createNote($input : AddNote){
        createNote(addNote : $input){
            id
        }
    }
`
export const updateNoteQuery = gql`
    mutation updateNote($input : UpdateNote){
        reformNote(updateNote : $input){
            id
            title
            content
            has_header
            header_image
            header_content
            tags
        }
    }
`

export const archieveNoteQuery = gql`
    mutation archeive(
        $id : ID!
        $status : Boolean!
    ){
        archieveNote(
            id: $id
            status: $status
        ){
            id
            archieved
        }
    }
`