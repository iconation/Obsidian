import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux'
import { setInfoMessage } from 'store/actions'
import core from 'themes/core.module.scss'

const ConnectedInfoSnackbar = ({ infoMessage, setInfoMessage }) => {
  const vertical = 'top'
  const horizontal = 'center'
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
    setInfoMessage(null)
  }

  infoMessage && !open && setOpen(true)

  return (infoMessage &&
    <div>
      <Snackbar
        className={core.infoSnackBar}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
      >
        <SnackbarContent style={{ backgroundColor: '#ddffdd' }}
          message={<div className={core.infoSnackBar}>Info: {infoMessage}</div>}
        />
      </Snackbar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    infoMessage: state.infoMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInfoMessage: (message) => dispatch(setInfoMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedInfoSnackbar)
