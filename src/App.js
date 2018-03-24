import React from 'react';

import GameForm from './GameForm.js'
import TricksButtonsBar from './TricksButtonsBar.js'
import ScoresTable from './ScoresTable.js'
import EditScoreModal from './EditScoreModal.js'

import './index.css';

const initialState = {
	players: ['Tom','Dam','Ren','Princesse'],
	increments: ['2','4','6','8','10','12','13','11','9','7','5','3','1'],
  scores: [],
	isSubmitEnabled: true,
	isResetEnabled: false,
	isStarted: false,
	bidOrTricks: 'bid',
  openModal: false
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	onPlayersChange = (value) => {
		this.setState({players: value.split(',')});

		if(this.state.players.length < 3 || this.state.players.length > 5) {
			console.log('Invalid number of players');
			this.setState({isSubmitEnabled: false});
		}
		else {
			this.setState({isSubmitEnabled: true});
		}
	}

	onIncrementsChange = (value) => {
		this.setState({increments: value.split(',')});
	}

	onStartClick = () => {
		const { players, increments } = this.state;

		let scores = [];
		for (let i of increments) {
			let results = [];
			for (let p of players) {
				results.push({tricks: '', bid: ''});
			}
			scores.push({rowId: i, results: results});
		}
		const dealer = players.length-1;
		const currentPlayer = (dealer + 1) % players.length;

		this.setState({players, increments, dealer, currentPlayer, scores, isStarted: true, currentRound: 0});
	}

	onResetClick = () => {
		this.setState(initialState);
	}

	onBidClick = (bid, playCow) => {
		const playTurkey = false;
		let scores = Object.assign([], this.state.scores);
		scores[this.state.currentRound].results[this.state.currentPlayer].bid = bid;
		if(playCow) {
			scores[this.state.currentRound].results[this.state.currentPlayer].cow = true;
		}

		let bidOrTricks = 'bid';
		if(this.state.currentPlayer === this.state.dealer) {
			bidOrTricks = 'tricks';
		}

		const currentPlayer = (this.state.currentPlayer + 1) % this.state.players.length;

		// disabled button for last player in the round: when sum of bids equal current round
		const lastPlayer = (this.state.dealer) % this.state.players.length;
		let sumOfBids = 0;
		let bidRestriction = false;
		if(currentPlayer === lastPlayer) {
			for(let r of scores[this.state.currentRound].results) {
				if(Number.isInteger(r.bid)) {
					sumOfBids = sumOfBids + r.bid;
				}
			}
			if(sumOfBids <= this.state.increments[this.state.currentRound]) {
				bidRestriction = true;
				sumOfBids = this.state.increments[this.state.currentRound] - sumOfBids;
			}
		}

		this.setState({scores, currentPlayer, bidOrTricks, bidRestriction, sumOfBids, playCow, playTurkey});
	}

	onTricksClick = (tricks) => {
		let {currentRound, dealer, currentPlayer, players, increments } = this.state;

		let scores = Object.assign([], this.state.scores);
		scores[this.state.currentRound].results[this.state.currentPlayer].tricks = tricks;

		let playTurkey = false;
		const playCow = false;
		if(Math.abs(tricks - scores[this.state.currentRound].results[this.state.currentPlayer].bid) >= 2) {
			playTurkey = true;
		}

		let bidOrTricks = 'tricks';
		if(currentPlayer === dealer) {
			bidOrTricks = 'bid';

			currentRound++;
			dealer = (dealer + 1) % players.length;
			currentPlayer = (dealer + 1) % players.length;
		}
		else {
			currentPlayer = (currentPlayer + 1) % players.length;
		}

		let lastRound = false;
		if(currentRound === increments.length) {
			lastRound = true;
		}

		this.setState({scores, currentPlayer, currentRound, bidOrTricks, dealer, playCow, playTurkey, lastRound});
	}

  onCellClick = (rowClicked, b, columnClicked) => {
    // console.log(a);
    // console.log(b);
    // console.log(c);
    // console.log(this.state.scores);

    const scores = this.state.scores;
    console.log(scores);
    for(let score of scores) {
      if(score.rowId === rowClicked.rowId && (score.results[columnClicked].tricks !== "" || score.results[columnClicked].bid !== "")) {
        this.setState({openModal: true, editRound: rowClicked.rowId, editPlayer: columnClicked, editTricks: score.results[columnClicked].tricks, editBid: score.results[columnClicked].bid});
      }
    }

    // <Modal> setState showModal props: Player Round
  }

  onModalClose = () => {
    this.setState({openModal: false});
  }

  onEditBidClick = (round, player, newValue, isCow) => {
    let scores = Object.assign([], this.state.scores);
    scores.filter(score => score.rowId === round).map(score => {
              score.results[player].bid = Number(newValue);
              if(isCow) score.results[player].cow = true;
            });
    this.setState({scores, openModal: false});
  }

  onEditTrickClick = (round, player, newValue) => {
    let scores = Object.assign([], this.state.scores);
    scores.filter(score => score.rowId === round).map(score => score.results[player].tricks = newValue);
    this.setState({scores, openModal: false});
  }

	render() {
		const { players, increments, isStarted, currentRound, currentPlayer, isSubmitEnabled, openModal, editRound, editBid, editTricks, editPlayer } = this.state;

		return (
			<div>
        <EditScoreModal open={openModal} onModalClose={this.onModalClose} editRound={editRound} editPlayer={editPlayer} editBid={editBid} editTricks={editTricks} onEditBidClick={this.onEditBidClick} onEditTrickClick={this.onEditTrickClick}/>
				<GameForm players={players.join()} increments={increments.join()} isStarted={isStarted} onPlayersChange={this.onPlayersChange} onIncrementsChange={this.onIncrementsChange} onStartClick={this.onStartClick} onResetClick={this.onResetClick} isSubmitEnabled={isSubmitEnabled}/>
				<br />
				<TricksButtonsBar players={players} increments={increments} isStarted={isStarted} currentRound={currentRound} currentPlayer={currentPlayer} onBidClick={this.onBidClick} onTricksClick={this.onTricksClick} bidOrTricks={this.state.bidOrTricks} dealer={this.state.dealer} sumOfBids={this.state.sumOfBids} bidRestriction={this.state.bidRestriction} playCow={this.state.playCow} playTurkey={this.state.playTurkey} lastRound={this.state.lastRound}/>
				<br />
				<ScoresTable players={players} increments={increments} isStarted={isStarted} scores={this.state.scores} bidOrTricks={this.state.bidOrTricks} onCellClick={this.onCellClick}/>
			</div>
		)
	}
}

export default App;
