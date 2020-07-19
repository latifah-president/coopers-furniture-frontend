import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});




export default function CustomizedDialogs(props) {


  return (
    <div>
      <Dialog  onClose={props.handleClose}  open={props.open} role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" disableEnforceFocus>
        <DialogTitle id="dialog-title" onClose={props.handleClose}>
        Thanks for choosing to join our sales force.
        </DialogTitle>
        <DialogContent dividers id="dialog-description">
          <Typography gutterBottom>
           You’re on the way to joining a team of driven individual’s that enjoy making some extra cash from the comfort of their home.
          </Typography>
          <Typography gutterBottom>
          Coopers Home Furniture is not another one of those get rich quick schemes you see all over the internet. 
          We’ll never ask you to pay for anything. We never ask for your credit card information.
          </Typography>
          <Typography gutterBottom>
          All our payouts are handled through cash app so if you have not done so already, 
          please download cash app so that we know where to send your hard earned  money 
          after you make a sale.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button   onClick={props.handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

