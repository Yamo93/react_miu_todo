import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

  return (
      <Dialog open={props.dialogShown} onClose={props.closeEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ändra uppgift</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fyll i fältet nedan och ändra uppgiften:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ändra uppgift" 
            type="text" 
            onChange={props.editedChange} 
            value={props.editedValue} 
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeEdit} color="primary">
            Avbryt
          </Button>
          <Button onClick={(id, value) => props.edited(props.editID, props.editedValue)} color="primary">
            Ändra
          </Button>
        </DialogActions>
      </Dialog>
  );
}