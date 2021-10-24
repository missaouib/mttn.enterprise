import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './../logo.svg';
import Copyright from "../common/Copyright";
import {gql, useMutation} from "@apollo/client";
import {useAuth} from "../auth";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useTheme} from "@material-ui/core";

const GRAPHQL_MUTATION_LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            name
            username
            token
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    btnWrapper: {
        margin: theme.spacing(1, 0),
        position: 'relative',
    },
    btnProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    alert: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
}));

function LoginPage() {
    const classes = useStyles();
    const theme = useTheme();
    const {setAuth} = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [alertShow, setAlertShow] = useState(false);

    const [login, {loading, error, data}] = useMutation(GRAPHQL_MUTATION_LOGIN, {onError});

    useEffect(() => {
        setBtnDisabled(username === '' || password === '');
    }, [username, password]);

    useEffect(() => {
        if (data) {
            setAuth(data.login);
        }
    }, [data]);

    function onError(error) {
        error.graphQLErrors.forEach(value => {
            if (value.extensions.type === "BadCredentialsException") {
                setAlertShow(true);
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        login({variables: {username: username, password: password}});
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <img src={logo} className="app-logo" alt="logo"/>
                {alertShow &&
                <Alert className={classes.alert} severity="error" variant="outlined">Wrong login or password!</Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        autoComplete="current-password"
                    />
                    <div className={classes.btnWrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={btnDisabled || loading}
                        >
                            Sign In
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.btnProgress}/>}
                    </div>

                    {/*<Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>*/}
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default LoginPage;