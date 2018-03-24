import React from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import SvgIcon from 'material-ui/SvgIcon';

import Sound from 'react-sound';
import cowMp3 from './cow.mp3';
import turkeyMp3 from './turkey.mp3';

import BidTrickButton from './BidTrickButton.js'

// import { withStyles } from 'material-ui/styles';
//
// const styles = theme => {
//   return {
//     button: {
//       marginLeft: theme.spacing.unit,
//       marginRight: theme.spacing.unit,
//     }
//   }
// };

class TricksButtonsBar extends React.Component {
  render() {
    const { classes, increments, bidOrTricks, currentRound, bidRestriction, sumOfBids, isStarted, lastRound, players, currentPlayer } = this.props;

    if(!isStarted) {
      return null;
    }
    if(lastRound) {
      return <span>Game over</span>;
    }


    let listButtons = [];
    if(bidOrTricks === 'bid') {
      // listButtons = Array.from(Array(parseInt(increments[currentRound], 10) + 1), (_, i) => <Button className={classes.button} disabled={bidRestriction && sumOfBids===i} fab mini key={i} children={i} color='primary' onClick={() => this.props.onBidClick(i)}></Button>);
      listButtons = Array.from(Array(parseInt(increments[currentRound], 10) + 1), (_, i) => <BidTrickButton disabled={bidRestriction && sumOfBids===i} fab mini key={i} value={i} buttonType='bid' onClick={() => this.props.onBidClick(i)}></BidTrickButton>);
      const i = Number(increments[currentRound]);
      listButtons.push(<BidTrickButton disabled={bidRestriction && sumOfBids===i} fab mini key={i+'cow'} value={i} buttonType='bid' onClick={() => this.props.onBidClick(i, true)} isCow></BidTrickButton>);
      // listButtons.push(<Button className={classes.button} key='cow' disabled={bidRestriction && sumOfBids===i} fab mini children='V' color='primary' onClick={() => this.props.onBidClick(i, true)}><CowIcon /></Button>);
    }
    else {
      // listButtons = Array.from(Array(parseInt(increments[currentRound], 10) + 1), (_, i) => <Button className={classes.button} fab mini key={i} children={i} color='secondary' onClick={() => this.props.onTricksClick(i)}></Button>);
      listButtons = Array.from(Array(parseInt(increments[currentRound], 10) + 1), (_, i) => <BidTrickButton disabled={bidRestriction && sumOfBids===i} fab mini key={i} value={i} buttonType='trick' onClick={() => this.props.onTricksClick(i)}></BidTrickButton>);
    }

    const bidRestrictionText = bidRestriction ? <span>You cannot bid {sumOfBids}</span> : <span></span>;

    return (
      <Grid container spacing={24}>
        <Grid item xs>
          <span>Round {currentRound + 1}, with {increments[currentRound]} cards.</span>
          <br />
          {bidOrTricks === 'bid' ? 'Bid' : 'Tricks'} for {players[currentPlayer]}?
          <br />
          {bidRestrictionText}
        </Grid>
        <Grid item xs>
          {listButtons}
        </Grid>
        {/* <Sound url={cowMp3} playStatus={this.props.playCow ? Sound.status.PLAYING : Sound.status.STOPPED} />
        <Sound url={turkeyMp3} playStatus={this.props.playTurkey ? Sound.status.PLAYING : Sound.status.STOPPED} /> */}
        <PlaySound url={cowMp3} playStatus={this.props.playCow ? Sound.status.PLAYING : Sound.status.STOPPED}/>
        <PlaySound url={turkeyMp3} playStatus={this.props.playTurkey ? Sound.status.PLAYING : Sound.status.STOPPED}/>
      </Grid>
    );
  }
}

const CowIcon = () => (
  <SvgIcon>
    <path d="M10.5,18A0.5,0.5 0 0,1 11,18.5A0.5,0.5 0 0,1 10.5,19A0.5,0.5 0 0,1 10,18.5A0.5,0.5 0 0,1 10.5,18M13.5,18A0.5,0.5 0 0,1 14,18.5A0.5,0.5 0 0,1 13.5,19A0.5,0.5 0 0,1 13,18.5A0.5,0.5 0 0,1 13.5,18M10,11A1,1 0 0,1 11,12A1,1 0 0,1 10,13A1,1 0 0,1 9,12A1,1 0 0,1 10,11M14,11A1,1 0 0,1 15,12A1,1 0 0,1 14,13A1,1 0 0,1 13,12A1,1 0 0,1 14,11M18,18C18,20.21 15.31,22 12,22C8.69,22 6,20.21 6,18C6,17.1 6.45,16.27 7.2,15.6C6.45,14.6 6,13.35 6,12L6.12,10.78C5.58,10.93 4.93,10.93 4.4,10.78C3.38,10.5 1.84,9.35 2.07,8.55C2.3,7.75 4.21,7.6 5.23,7.9C5.82,8.07 6.45,8.5 6.82,8.96L7.39,8.15C6.79,7.05 7,4 10,3L9.91,3.14V3.14C9.63,3.58 8.91,4.97 9.67,6.47C10.39,6.17 11.17,6 12,6C12.83,6 13.61,6.17 14.33,6.47C15.09,4.97 14.37,3.58 14.09,3.14L14,3C17,4 17.21,7.05 16.61,8.15L17.18,8.96C17.55,8.5 18.18,8.07 18.77,7.9C19.79,7.6 21.7,7.75 21.93,8.55C22.16,9.35 20.62,10.5 19.6,10.78C19.07,10.93 18.42,10.93 17.88,10.78L18,12C18,13.35 17.55,14.6 16.8,15.6C17.55,16.27 18,17.1 18,18M12,16C9.79,16 8,16.9 8,18C8,19.1 9.79,20 12,20C14.21,20 16,19.1 16,18C16,16.9 14.21,16 12,16M12,14C13.12,14 14.17,14.21 15.07,14.56C15.65,13.87 16,13 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13 8.35,13.87 8.93,14.56C9.83,14.21 10.88,14 12,14M14.09,3.14V3.14Z" />
  </SvgIcon>
);

const PlaySound = (props) => <Sound url={props.url} playStatus={props.playStatus} />;

// export default withStyles(styles)(TricksButtonsBar);
export default (TricksButtonsBar);
