import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DocumentFileLoader from "./DocumentFileLoader";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {useApolloClient, useMutation} from "@apollo/client";
import DeleteIcon from '@material-ui/icons/Delete';
import {GRAPHQL_MUTATION_DOCUMENT_FILE_REMOVE} from "../graphQLQueries";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: theme.spacing(1),
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    fileInput: {
        display: 'none',
    },
}));

function DocumentFileFieldGroup(props) {
    const classes = useStyles();
    const [documentFiles, setDocumentFiles] = useState([]);
    const [countLoading, setCountLoading] = useState(0);
    const client = useApolloClient();

    const [remove, {
        loading: removeLoading,
        error: removeError,
        data: removeData
    }] = useMutation(GRAPHQL_MUTATION_DOCUMENT_FILE_REMOVE);

    useEffect(() => {
        if (props.document) {
            setDocumentFiles([...documentFiles, ...props.document.files]);
        }
    }, [props.document]);

    useEffect(() => {
        if (!countLoading && documentFiles.length) {
            setDocumentFiles([...documentFiles]);
            client.refetchQueries({
                include: ["Documents"],
            });
        }
    }, [countLoading]);

    if (props.disabled) return null;

    return (
        <Grid container className={classes.root} justifyContent="space-between">
            <Grid item>
                <Typography component="h6" gutterBottom>
                    Files:
                </Typography>
            </Grid>
            <Grid item>
                <input
                    id="document-file"
                    className={classes.fileInput}
                    multiple
                    type="file"
                    onChange={({target: {files}}) => {
                        files && setDocumentFiles([...documentFiles, ...files]);
                        setCountLoading(files.length);
                        props.onChange();
                    }}
                />
                <label htmlFor="document-file">
                    <Button variant="outlined"
                            color="primary"
                            component="span"
                            disabled={Boolean(countLoading)}
                            startIcon={<CloudUploadIcon/>}>
                        Upload
                    </Button>
                </label>
            </Grid>
            {documentFiles.length > 0 && props.document &&
            <Grid item xs={12}>
                <List dense>
                    {documentFiles.map((file, i) => (
                        <ListItem key={i.toString()}>
                            <ListItemAvatar>
                                <Avatar>
                                    <InsertDriveFileIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText style={{overflowWrap: "break-word"}} primary={file && file instanceof File && props.document.id ?
                                <DocumentFileLoader key={i.toString()} file={file} id={props.document.id} onLoad={
                                    (data) => {
                                        documentFiles.splice(i, 1, data.data.uploadDocumentFile);
                                        setCountLoading(state => state - 1);
                                    }
                                }/> : file.name
                            }/>
                            <ListItemSecondaryAction onClick={() => {
                                remove({variables: {fileId: file.id}});
                                documentFiles.splice(i, 1);
                                setDocumentFiles([...documentFiles]);
                            }}>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>}
        </Grid>
    );
}

export default DocumentFileFieldGroup;