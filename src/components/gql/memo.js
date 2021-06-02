import gql from 'graphql-tag';

export const addMemosQuery = gql`
    mutation createMemo(
        $mdate:String!
        $content:String!
        $tags: [String!]
    ){
        createMemo(
            addMemo : {
                mdate: $mdate
                content: $content
                tags: $tags
            }
        ){
            id
            content
            tags
            createdAt
            updatedAt
        }
    }
`


export const fetchMemoQuery = gql`
    query fetchmemo(
            $fdate: String!
            $tdate: String!
        ){
        fetchMemo(
            fdate: $fdate
            tdate: $tdate
        ){
            id
            content
            createdAt
            updatedAt
            tags
        }
    }

`
export const removeMemoQuery = gql`
    mutation removememo(
        $id: ID!
    ){
        removeMemo(id: $id)
    }
`
