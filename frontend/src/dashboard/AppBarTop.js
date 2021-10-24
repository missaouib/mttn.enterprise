import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, InputBase, Toolbar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme, props) => ({
    root: {
        width: props => `calc(100% - ${props.drawerWidth}px)`,
        marginLeft: props => props.drawerWidth,
        backgroundColor: theme.palette.background.default,
    },
    growSection: {
        flexGrow: 1,
    },
    searchSection: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.common.white,
        marginRight: theme.spacing(2),
        marginLeft: 0,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.main
    },
    searchInput: {
        '& > input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            background: 'none',
            width: '100%',
        }
    }
}));

function AppBarTop(props) {
    const classes = useStyles(props);

    function handleSearch() {
        alert('This feature is not yet available!')
    }

    return (
        <AppBar position="fixed" elevation={0} className={classes.root}>
            <Toolbar disableGutters>
                <section className={classes.growSection}/>
                <section className={classes.searchSection}>
                    <div className={classes.searchIcon}><SearchIcon/></div>
                    <InputBase placeholder="Search…" className={classes.searchInput}
                               onChange={handleSearch}
                               inputProps={{'aria-label': 'search'}}/>
                </section>
                <section>
                    <IconButton aria-haspopup="true">
                        <AccountCircle/>
                    </IconButton>
                </section>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarTop;