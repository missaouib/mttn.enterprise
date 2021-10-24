import {gql} from "@apollo/client";

export const GRAPHQL_QUERY_INIT = gql`
    query Init {
        user {
            username
            name
            token
        }
    }
`;

export const GRAPHQL_QUERY_DOCUMENTS = gql`
    query Documents($offset: Int, $limit: Int, $sort:String, $search:String) {
        documents(offset: $offset, limit: $limit, sort:$sort, search:$search) {
            content {
                id
                title
                description
                date
                files {
                    name
                }
            }
            totalElements
        }
    }
`;

export const GRAPHQL_QUERY_DOCUMENT = gql`
    query Document($id: ID!) {
        document(id: $id) {
            id
            title
            description
            date
            files {
                id
                name
                ocr
            }
        }
    }
`;

export const GRAPHQL_MUTATION_DOCUMENT_CREATE = gql`
    mutation CreateDocument($document: DocumentInput!) {
        createDocument(input: $document) {
            id
            title
            description
            date
            files {
                name
                ocr
            }
        }
    }
`;

export const GRAPHQL_MUTATION_DOCUMENT_UPDATE = gql`
    mutation UpdateDocument($id: ID!, $document: DocumentInput!) {
        updateDocument(id: $id, input: $document) {
            id
            title
            description
            date
            files {
                name
                ocr
            }
        }
    }
`;

export const GRAPHQL_MUTATION_DOCUMENT_REMOVE = gql`
    mutation RemoveDocument($id: ID!) {
        removeDocument(id: $id)
    }
`;

export const GRAPHQL_MUTATION_DOCUMENT_FILE_UPLOAD = gql`
    mutation UploadDocumentFile($file: Upload!, $id:ID!) {
        uploadDocumentFile(file: $file, id: $id){
            id
            name
            ocr
        }
    }
`;

export const GRAPHQL_MUTATION_DOCUMENT_FILE_REMOVE = gql`
    mutation RemoveDocumentFile($fileId: ID!) {
        removeDocumentFile(fileId: $fileId)
    }
`;