import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux'
import { setErrorMessage } from 'store/actions'
import core from 'themes/core.module.scss'

const ConnectedErrorSnackbar = ({ errorMessage, setErrorMessage }) => {
  const vertical = 'top'
  const horizontal = 'center'
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
    setErrorMessage(null)
  }

  errorMessage && !open && setOpen(true)

  return (errorMessage &&
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
      >
        <SnackbarContent style={{ backgroundColor: '#ffdddd' }}
          message={<div className={core.errorSnackBar}>Error: {errorMessage}</div>}
        />
      </Snackbar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    errorMessage: state.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (message) => dispatch(setErrorMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedErrorSnackbar)
