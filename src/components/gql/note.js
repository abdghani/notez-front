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
    mutation createNote(
        $title:String!
        $content:String!
        $has_header:Boolean
        $header_image:String!
        $header_content:String!
        $tags: [String!]
    ){
        createNote(
            addNote : {
                title: $title
                content: $content
                has_header: $has_header
                header_image: $header_image
                header_content: $header_content
                tags: $tags
            }
        ){
            id
        }
    }
`
export const updateNoteQuery = gql`
    mutation updateNote(
        $id : ID!
        $title : String!
        $content : String!
        $has_header: Boolean
        $header_image: String!
        $header_content: String!
        $tags: [String!]
    ){
        reformNote(
            updateNote : {
                id: $id
                title: $title
                content: $content
                has_header: $has_header
                header_image: $header_image
                header_content: $header_content
                tags: $tags
            }
        ){
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