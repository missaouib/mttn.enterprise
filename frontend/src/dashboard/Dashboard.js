import {makeStyles} from "@material-ui/core/styles";
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import logo from "../logo.svg";
import React from "react";
import Box from "@material-ui/core/Box";
import DescriptionIcon from '@material-ui/icons/Description';
import {Link as RouterLink, Redirect, Route, Switch,} from 'react-router-dom';
import Documents from "../documents/Documents";
import Document from "../documents/Document";
import AppBarTop from "./AppBarTop";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    nav: {
        width: drawerWidth,
        flexShrink: 0,
    },
    main: {
        flexGrow: 1,
    },
    logo: {
        margin: theme.spacing(2, 6),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.default,
    },
    toolbar: theme.mixins.toolbar,
    paperAnchorDockedLeft: {
        border: 'none',
    }
}));

function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBarTop drawerWidth={drawerWidth}/>
            <nav className={classes.nav}>
                <Drawer variant="permanent" open
                        classes={{
                            paper: classes.drawerPaper,
                            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
                        }}
                >
                    <img src={logo} className={classes.logo} alt="logo"/>
                    <List>
                        <ListItem button key="documents" component={RouterLink} to="/documents">
                            <ListItemIcon>
                                <DescriptionIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="Documents"/>
                        </ListItem>
                    </List>
                </Drawer>
            </nav>
            <main className={classes.main}>
                <div className={classes.toolbar}/>
                <Box boxShadow={1} bgcolor="background.paper" borderRadius={16} p={2}>
                    <Switch>
                        <Route path="/documents/:documentId">
                            <Document/>
                        </Route>
                        <Route path="/documents">
                            <Documents/>
                        </Route>
                        <Route path="/**">
                            <Redirect to="/documents"/>
                        </Route>
                    </Switch>
                </Box>
            </main>
        </div>
    );
}

export default Dashboard;