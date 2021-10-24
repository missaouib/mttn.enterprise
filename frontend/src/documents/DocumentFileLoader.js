import React, {useEffect, useState} from 'react';
import {gql, useMutation} from "@apollo/client";
import Box from "@material-ui/core/Box";
import {LinearProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {GRAPHQL_MUTATION_DOCUMENT_FILE_UPLOAD, GRAPHQL_MUTATION_FILE_UPLOAD} from "../graphQLQueries";

function DocumentFileLoader(props) {
    const [upload, {loading, error, data}] = useMutation(GRAPHQL_MUTATION_DOCUMENT_FILE_UPLOAD);
    const [progress, setProgress] = useState(0);
    const [filename, setFilename] = useState(props.file.name);

    useEffect(() => {
        upload({
            variables: {file: props.file, id: props.id}, context: {
                useUploadLink: true,
                fetchOptions: {
                    onProgress: (e) => {
                        setProgress(Math.round(e.loaded / e.total * 100));
                    }
                },
            }
        }).then((data) => {
            setFilename(data.data.uploadDocumentFile.name);
            props.onLoad(data);
        });
    }, []);

    if (progress === 100) return filename;

    return (
        <Box display="flex" alignItems="center" flexWrap="wrap">
            <Box flexGrow={1} mr={1}>
                <LinearProgress variant="determinate" value={progress}/>
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{progress}%</Typography>
            </Box>
            <Box width="100%">
                <Typography variant="body2" color="textSecondary">{filename}</Typography>
            </Box>
        </Box>
    );
}

DocumentFileLoader.defaultProps = {
    onLoad: (data) => {
    },
}

export default DocumentFileLoader;