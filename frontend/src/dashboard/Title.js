import Typography from "@material-ui/core/Typography";
import React from "react";

function Title(props){
    return(
        <Typography variant="h5" component="h1">
            {props.children}
        </Typography>
    );
}

export default Title;