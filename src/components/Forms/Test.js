import 'date-fns'
import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'

const styles = {
  grid: {
    width: '60%'
  },
}

class Test extends React.Component {
  state = {
    selectedDate: new Date('2014-08-18T21:11:55'),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  };

  render() {
    const { classes } = this.props
    const { selectedDate } = this.state

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            margin="normal"
            label="Date picker"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
          <TimePicker
            margin="normal"
            label="Time picker"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    )
  }
}



export default withStyles(styles)(Test)
