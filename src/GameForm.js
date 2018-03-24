import React from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import './index.css';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    backgroundColor: 'red',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});


class GameForm extends React.Component {
  handlePlayersChange = (event) => {
    this.props.onPlayersChange(event.target.value);
    event.preventDefault();
  }

  handleIncrementsChange = (event) =>  {
    this.props.onIncrementsChange(event.target.value);
    event.preventDefault();
  }

  render() {
    const { players, increments, classes, isStarted } = this.props;

    let button = null;
    if(isStarted) {
      button = <ResetButton onClick={this.props.onResetClick} />
    }
    else {
      button = <StartButton onClick={this.props.onStartClick} isSubmitEnabled={this.props.isSubmitEnabled} />
    }

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField className={classes.textField} id='players' label='Players' disabled={isStarted} value={players} onChange={this.handlePlayersChange} margin="normal" />
        <TextField className={classes.textField} id='increments' label='Cards' disabled={isStarted} value={increments} onChange={this.handleIncrementsChange} margin="normal" />
        {button}
      </form>
    );
  }
}

const StartButton = props => <Button raised color='primary' onClick={props.onClick} children='Go !' disabled={!props.isSubmitEnabled}/>

const ResetButton = props => <Button raised color='secondary' onClick={props.onClick} children='Reset' />

export default withStyles(styles)(GameForm);
