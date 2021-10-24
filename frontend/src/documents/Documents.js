import Typography from '@material-ui/core/Typography';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Link as RouterLink, useRouteMatch,} from 'react-router-dom';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import {useMutation, useQuery} from "@apollo/client";
import {GRAPHQL_MUTATION_DOCUMENT_REMOVE, GRAPHQL_QUERY_DOCUMENTS} from "../graphQLQueries";
import DocumentFileList from "./DocumentFileList";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Link from "@material-ui/core/Link";
import Title from "../dashboard/Title";
import SearchPanel from "./SearchPanel";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Documents() {
    let {url} = useRouteMatch();
    const classes = useStyles();

    const {loading, error, data, refetch} = useQuery(GRAPHQL_QUERY_DOCUMENTS, {
        variables: {offset: 0, limit: 50, sort: 'id'},
        fetchPolicy: 'network-only'
    });

    const [remove, {
        loading: removeLoading,
        error: removeError,
        data: removeData
    }] = useMutation(GRAPHQL_MUTATION_DOCUMENT_REMOVE, {
        refetchQueries: [
            'Documents'
        ],
    });

    if (loading) return null;

    return (
        <Grid container direction="column" spacing={4}>
            <Grid container item spacing={4}>
                <Grid item><Title>Documents</Title></Grid>
                <Grid item><SearchPanel onSubmit={(searchText) => refetch({search: searchText})}/></Grid>
                <Grid item xs/>
                <Grid item>
                    <Button variant="outlined" color="primary" component={RouterLink} to={`${url}/new`}
                            startIcon={<AddIcon/>}>
                        New document
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                {data.documents.content.length
                    ? <TableContainer component={Paper}>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Files</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.documents.content.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            <Link noWrap component={RouterLink}
                                                  to={`${url}/${row.id}`}>{row.title}</Link>
                                        </TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell
                                            align="right">{new Date(...(row.date.split('-'))).toLocaleDateString()}</TableCell>
                                        <TableCell align="right">
                                            <DocumentFileList files={row.files} type="horizontal"/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => {
                                                    remove({variables: {id: row.id}});
                                                }}
                                                aria-label="delete">
                                                <DeleteOutlineIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Typography variant="body1">No data</Typography>
                }
            </Grid>
        </Grid>
    );
}

export default Documents;