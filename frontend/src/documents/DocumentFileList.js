import {Chip, List, ListItem, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Box from "@material-ui/core/Box";
import * as streamSaver from "streamsaver";
import {WritableStream} from "web-streams-polyfill/ponyfill";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
    },
    item: {
        maxWidth: 180,
        padding: theme.spacing(0.5),
        '& > *': {
            overflow: "hidden",
        },
    },

}));

function DocumentFileList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {props.files.map((file, i) => (
                <ListItem dense disableGutters key={i} className={classes.item}>
                    <Tooltip title={file.name} placement="top-start">
                        <Chip size="small"
                              icon={<InsertDriveFileIcon/>}
                              label={
                                  <Box
                                      component="span"
                                      textOverflow="ellipsis"
                                      overflow="hidden"
                                  >{file.name}</Box>
                              }
                              onClick={() => {
                                  const fileStream = streamSaver.createWriteStream(file.name);

                                  fetch(`${process.env.REACT_APP_DOCUMENT_DOWNLOAD_URI}?filename=${file.name}`, {
                                      method: 'GET',
                                      headers: {
                                          'Authorization': `Bearer ${localStorage.getItem("token")}`,
                                      },
                                  })
                                      .then(res => {
                                          const readableStream = res.body;

                                          if (WritableStream && readableStream.pipeTo) {
                                              return readableStream.pipeTo(fileStream);
                                          }

                                          const writer = fileStream.getWriter();

                                          const reader = res.body.getReader();
                                          const pump = () => reader.read()
                                              .then(res => res.done
                                                  ? writer.close()
                                                  : writer.write(res.value).then(pump));

                                          pump();
                                      })
                              }}
                              variant="outlined"
                        />
                    </Tooltip>

                </ListItem>
            ))}
        </List>
    );
}

export default DocumentFileList;