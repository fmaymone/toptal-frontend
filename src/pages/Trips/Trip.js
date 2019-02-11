import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Activity } from 'rmw-shell'
import { withTheme, withStyles } from '@material-ui/core/styles'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import TripForm from '../../components/Forms/Trip';
import { withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withFirebase } from 'firekit-provider'
import { isLoading } from 'firekit'
import { change, submit } from 'redux-form';
import isGranted from 'rmw-shell/lib/utils/auth';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';


const styles = theme => ({

})


class Trip extends Component {

  validate = (values) => {
    const { intl } = this.props;
    const errors = {}
    errors.destination = !values.destination ? intl.formatMessage({ id: 'error_required_field' }) : '';
    errors.start_date = !values.start_date ? intl.formatMessage({ id: 'error_required_field' }) : '';

    return errors
  }

  handleClose = () => {
    const { setDialogIsOpen } = this.props;
    setDialogIsOpen('delete_trip', false);
  }

  handleDelete = () => {

    const { history, match, firebaseApp } = this.props;
    const uid = match.params.uid;
    const path = `/trips/${this.props.auth.uid}/`;
    if (uid) {
      firebaseApp.database().ref().child(`${path}${uid}`).remove().then(() => {
        this.handleClose();
        history.goBack();
      })
    }
  }

  handleSave = async (values) => {
    
    axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NDk5NzYyMDR9.nFjiVC4vcHyimZ8wauW1VraoXRydIz7rYIoFXHp7c_A';
    axios.defaults.headers.common['Accept'] = 'application/vnd.trips.v1+json';
    await axios.post(`https://toptal-backend-fmaymone.c9users.io/trips`, values) 
    .then(res => {
      console.log(res)
    })
   
  }


  render() {

    const {
      history,
      intl,
      setDialogIsOpen,
      dialogs,
      match,
      submit,
      isGranted,
      isAuthorised,
      firebaseApp,
      uid,
      isLoading,
      auth
    } = this.props;

    const path = `/trips/${auth.uid}/`;

    return (
      <Activity
        isLoading={isLoading}
        iconStyleRight={{ width: '50%' }}
        appBarContent={
          <div style={{ display: 'flex' }}>
            {((!uid && isAuthorised) || (!!uid && isAuthorised)) &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {submit('trip')}}
              >
                <Icon className="material-icons" >save</Icon>
              </IconButton>
            }

            {(isAuthorised) &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => { setDialogIsOpen('delete_trip', true) }}
              >
                <Icon className="material-icons" >delete</Icon>
              </IconButton>
            }
          </ div>
        }

        onBackClick={() => { history.goBack() }}
        title={intl.formatMessage({ id: match.params.uid ? 'edit_trip' : 'create_trip' })}>

        <div style={{ margin: 15, display: 'flex' }}>
          <TripForm onSubmit={this.handleSave} 
            onSubmitSuccess={values => {
              history.push("/trips");
            }}
            onDelete={values => {
              history.push("/trips");
            }}
          />
        </div>

        <Dialog
          open={dialogs.delete_trip === true}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-comment"
        >
          <DialogTitle id="alert-dialog-title">{intl.formatMessage({ id: 'delete_company_title' })}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-comment">
              {intl.formatMessage({ id: 'delete_company_message' })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" >
              {intl.formatMessage({ id: 'cancel' })}
            </Button>
            <Button onClick={this.handleDelete} color="secondary" >
              {intl.formatMessage({ id: 'delete' })}
            </Button>
          </DialogActions>
        </Dialog>
      </Activity>
    );
  }
}

Trip.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const { auth, intl, dialogs } = state;
  const { match } = ownProps

  const uid = match.params.uid
  const path = `/trips/${auth.uid}/`;
  return {
    intl,
    dialogs,
    uid,
    isGranted: grant => isGranted(state, grant),
    isLoading: isLoading(state, `${path}/${uid}`),
    isAuthorised: auth.isAuthorised,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen, change, submit }
)(injectIntl(withRouter(withFirebase(withTheme()(withStyles(styles, { withTheme: true })(Trip))))))
