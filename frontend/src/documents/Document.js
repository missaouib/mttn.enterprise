import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useLazyQuery, useMutation} from "@apollo/client";
import {useHistory, useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import DocumentFileFieldGroup from "./DocumentFileFieldGroup";
import {
    GRAPHQL_MUTATION_DOCUMENT_CREATE,
    GRAPHQL_MUTATION_DOCUMENT_UPDATE,
    GRAPHQL_QUERY_DOCUMENT
} from "../graphQLQueries";
import Title from "../dashboard/Title";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import DatePickerField from "../common/DatePickerField";

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

class DocumentInput {
    constructor(id, {title, description, date}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

const initFormData = {
    title: "",
    description: "",
    date: new Date().toJSON().slice(0, 10),
}

function Document() {
    const classes = useStyles();
    let {documentId} = useParams();
    let history = useHistory();
    const [isNew, setNew] = useState(documentId === 'new');
    const [document, setDocument] = useState(null);
    const [formData, setFormData] = useState(initFormData);

    const [load, {
        loading: loadLoading,
        error: loadError,
        data: loadData
    }] = useLazyQuery(GRAPHQL_QUERY_DOCUMENT, {variables: {id: documentId}});

    const [create, {
        loading: createLoading,
        error: createError,
        data: createData
    }] = useMutation(GRAPHQL_MUTATION_DOCUMENT_CREATE);

    const [update, {
        loading: updateLoading,
        error: updateError,
        data: updateData
    }] = useMutation(GRAPHQL_MUTATION_DOCUMENT_UPDATE);

    useEffect(() => {
        if (!document && !isNew) {
            load();
        }
    }, []);

    useEffect(() => {
        if (loadData) {
            setDocument({...loadData.document, date: loadData.document.date});
        }
    }, [loadData]);

    useEffect(() => {
        if (document) {
            if (isNew) {
                history.push(document.id);
                setNew(false);
            }
            setFormData({...document});
        }
    }, [document]);


    function handleSave(value, redirect) {
        const document = {...value.data.createDocument} || {...value.data.updateDocument};
        redirect ? history.push("/documents") : setDocument(document);
    }

    function handleSubmit(redirect = false) {
        const documentInput = new DocumentInput(isNew ? null : documentId, {...formData});

        if (isNew) {
            create({variables: {document: documentInput}}).then(value => {
                handleSave(value, redirect);
            });
        } else {
            update({variables: {id: documentId, document: documentInput}}).then((value) => {
                handleSave(value, redirect);
            });
        }
    }

    if (!document && !isNew) return null;

    return (
        <Grid container spacing={1}>
            <Grid item container xs={12} justifyContent="space-between">
                <Grid item><Title>{isNew ? 'New document' : 'Edit document'}</Title></Grid>
                <Grid item>
                    <Button
                        onClick={() => {
                            handleSubmit(true);
                        }}
                        variant="outlined"
                        color="primary"
                        startIcon={<SaveIcon/>}>
                        Save
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        id="title-input"
                        label="Title"
                        value={formData.title}
                        fullWidth
                        onChange={({target}) => {
                            setFormData({...formData, title: target.value});
                        }}
                        variant="outlined"/>
                    <TextField
                        id="description-input"
                        label="Description"
                        value={formData.description}
                        fullWidth
                        onChange={({target}) => {
                            setFormData({...formData, description: target.value});
                        }}
                        multiline
                        rows={4}
                        variant="outlined"/>
                    <DatePickerField initValue={formData.date} onChange={(data) => {
                        setFormData({...formData, date: data.toJSON().slice(0, 10)});
                    }}/>
                    <DocumentFileFieldGroup
                        document={document}
                        onChange={() => {
                            if (isNew) handleSubmit();
                        }}/>
                </form>
            </Grid>
        </Grid>
    );
}

export default Document;