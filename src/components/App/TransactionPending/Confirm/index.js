import React from 'react'
import { connect } from 'react-redux'
import styles from './Confirm.css'
import Button from 'components/App/core/Button'
import { setErrorMessage, setInfoMessage } from 'store/actions'
import { api } from 'SCORE/API'

const Confirm = ({
  multisigAddress,
  transactionId,
  setErrorMessage,
  setInfoMessage,
  loggedWallet
}) => {
  const onConfirm = async (transactionId) => {
    api.confirmTransaction(loggedWallet, multisigAddress, transactionId).then(result => {
      setInfoMessage('Transaction successfully confirmed (you may need to refresh to see the changes)')
    }).catch(err => {
      setErrorMessage(err.message)
    })
  }

  return (
    <div className={styles.root}>
      <Button onClick={() => { onConfirm(transactionId) }}>✔️ Confirm</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
