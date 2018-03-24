import React from 'react';

import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

// import { withStyles } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles';

class ScoresTable extends React.Component {
  getCellStyle = (tricks, bid) => {
    const { theme } = this.props;
    let cellStyle = {};
    if(Number.isInteger(tricks) && Number.isInteger(bid)) {
      if(tricks === bid) {
        cellStyle = {backgroundColor: theme.palette.primary.light};
      }
      else {
        cellStyle = {backgroundColor: theme.palette.secondary.light};
      }
    }

    if(Number.isInteger(tricks) || Number.isInteger(bid)) {
      cellStyle = {...cellStyle, cursor: 'pointer'};
    }

    return cellStyle;
  }

  render() {
    const { isStarted, players, scores } = this.props;

    if(!isStarted) {
      return null;
    }

    return (
      <Grid container spacing={24}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell># Cards</TableCell>
              {players.map(p => {
                return <TableCell key={p}>{p}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map(n => {
              return (
                <TableRow key={n.rowId}>
                  <TableCell>{n.rowId}</TableCell>
                  {n.results.map((currentElement, index) => {
                    return (<TableCell onClick={() => this.props.onCellClick(n, currentElement, index)} style={this.getCellStyle(currentElement.tricks, currentElement.bid)} key={n.rowId + '-' + index}>{currentElement.tricks} / {currentElement.bid}</TableCell>);
                  })}
                </TableRow>
              );
            })}
            <TotalRow scores={scores} players={players} />
          </TableBody>
        </Table>
      </Grid>
    );
  }
}

class TotalRow extends React.Component {
  render() {
    const { players, scores } = this.props;

    let total = new Array(players.length).fill(0);
    for(const score of scores) {
      for(const player in players) {
        if(Number.isInteger(score.results[player].bid) && Number.isInteger(score.results[player].tricks)) {
          const diff = score.results[player].bid - score.results[player].tricks;
          if(diff === 0) {
            total[player] = total[player] + (score.results[player].bid * 5) + 10 + (score.results[player].cow ? 10 : 0);
          }
          else {
            total[player] = total[player] + (Math.abs(diff) * -1 * 5) - (score.results[player].cow ? 10 : 0);
          }
        }
      }
    }

    return (
      <TableRow key='total'>
        <TableCell>Total</TableCell>
        {total.map((currentElement, index) => {
          return <TableCell key={index}>{currentElement}</TableCell>;
        })}
      </TableRow>
    )
  }
}

export default withTheme()(ScoresTable);
// export default withStyles(styles)(ScoresTable);
