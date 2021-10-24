import {createTheme} from "@material-ui/core";

export const theme = createTheme({
    palette: {
        background: {
            default: '#F2F2F0',
        },
        primary: {
            main: '#ec2626',
        },
        secondary: {
            main: '#666666',
        },
    },
    overrides: {
        MuiTableHead: {
            root: {
                background: '#F2F2F0',
            },
        },
        MuiInputBase: {
            input: {
                background: '#ffffff',
            },
        },
    },
})
