import React from 'react'
import { connect } from 'react-redux'
import styles from './Revoke.css'
import Button from 'components/App/core/Button'
import { setErrorMessage, setInfoMessage } from 'store/actions'
import { api } from 'SCORE/API'

const Revoke = ({
  multisigAddress,
  transactionId,
  setErrorMessage,
  setInfoMessage,
  loggedWallet
}) => {
  const onRevoke = async (transactionId) => {
    api.revokeTransaction(loggedWallet, multisigAddress, transactionId).then(result => {
      setInfoMessage('Transaction successfully revoked (you may need to refresh to see the changes)')
    }).catch(err => {
      setErrorMessage(err.message)
    })
  }

  return (
    <div className={styles.root}>
      <Button className={styles.button} onClick={() => { onRevoke(transactionId) }}>❌ Revoke</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Revoke)
