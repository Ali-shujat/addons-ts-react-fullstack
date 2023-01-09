import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
interface myProps{
  title: string, body: string, hideConfirmDeleteHandler: () => void, confirmDeleteHandler : () => void
}
const DeleteConfirmation: React.FC<myProps> = (props)=> {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
    //  open={props.confirmDeleteHandler()}
    //  onClose={props.hideConfirmDeleteHandler()}
    open={true}
     
    >

      <DialogTitle>{props.title}</DialogTitle>

      <DialogContentText>{props.body}</DialogContentText>
      <DialogActions>
        <Button
          variant="contained" color="success"
          onClick={() => {
            props.hideConfirmDeleteHandler();
          }}
        >
          Close
        </Button>
        <Button
          variant="outlined" color="error"
          onClick={() => {
            props.confirmDeleteHandler();
          }}
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog></div>
  )
}

export default DeleteConfirmation