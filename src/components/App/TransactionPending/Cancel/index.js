import React from 'react'
import { connect } from 'react-redux'
import styles from './Cancel.css'
import Button from 'components/App/core/Button'
import { setErrorMessage, setInfoMessage } from 'store/actions'
import { api } from 'SCORE/API'

const Cancel = ({
  multisigAddress,
  transactionId,
  setErrorMessage,
  setInfoMessage,
  loggedWallet
}) => {
  const onCancel = async (transactionId) => {
    api.cancelTransaction(loggedWallet, multisigAddress, transactionId).then(result => {
      setInfoMessage('Transaction successfully cancelled (you may need to refresh to see the changes)')
    }).catch(err => {
      setErrorMessage(err.message)
    })
  }

  return (
    <div className={styles.root}>
      <Button className={styles.button} onClick={() => { onCancel(transactionId) }}>🗑️ Delete</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedWallet: state.loggedWallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (o) => dispatch(setErrorMessage(o)),
    setInfoMessage: (o) => dispatch(setInfoMessage(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cancel)
