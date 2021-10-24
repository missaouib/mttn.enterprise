import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme, props) => ({
    root: {
        display: "flex",
    },
    input: {
        height: 36, // Fix: TextField equal height with buttons
        marginRight: theme.spacing(1)
    }
}));

function SearchPanel(props) {
    const classes = useStyles();
    const [search, setSearch] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(search)
    }

    return (
        <div className={classes.root}>
            <form noValidate onSubmit={handleSubmit}>
                <TextField id="search-input" InputProps={{
                    className: classes.input,
                    endAdornment: <InputAdornment>
                        <IconButton
                            onClick={() => setSearch(null)}
                        ><ClearIcon/></IconButton>
                    </InputAdornment>,
                }} variant="outlined"
                           label="Search..."
                           size="small"
                           onChange={({target}) => setSearch(target.value)}
                />
                <Button type="submit" variant="outlined" color="primary"><SearchIcon/></Button>
            </form>
        </div>
    );
}

export default SearchPanel;