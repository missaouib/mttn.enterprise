import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            <Link color="inherit" href="https://www.mettatron.ru">
                LLC Group METTATRON
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;