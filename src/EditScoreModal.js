import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';

import BidTrickButton from './BidTrickButton.js'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class EditScoreModal extends React.Component {
  render() {
    const { classes, editRound, editPlayer, editTricks, editBid, open } = this.props;

    if(!open) {
      return null;
    }

    let listBidButtons = [];
    listBidButtons = Array.from(Array(parseInt(editRound, 10) + 1), (_, i) => <BidTrickButton disabled={false} fab mini key={i} value={i} buttonType='bid' onClick={() => this.props.onEditBidClick(editRound, editPlayer, i)}></BidTrickButton>);
    listBidButtons.push(<BidTrickButton disabled={false} fab mini key={editRound + 'cow'} value={Number(editRound)} buttonType='bid' onClick={() => this.props.onEditBidClick(editRound, editPlayer, editRound, true)} isCow></BidTrickButton>);

    let listTrickButtons = [];
    if(editTricks !== "") {
      listTrickButtons = Array.from(Array(parseInt(editRound, 10) + 1), (_, i) => <BidTrickButton disabled={false} fab mini key={i} value={i} buttonType='trick' onClick={() => this.props.onEditTrickClick(editRound, editPlayer, i)}></BidTrickButton>);
    }

    return (
      <Modal open={open} onClose={this.props.onModalClose}>
        <div style={getModalStyle()} className={classes.paper}>
          {/* Round {editRound} - Player {editPlayer} - Edit score */}
          Edit score
          <br/><br/>
          {listBidButtons}
          <br/><br/>
          {listTrickButtons}
        </div>
      </Modal>
    )
  }

}

export default withStyles(styles)(EditScoreModal);
