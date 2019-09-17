import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './CreateTransaction.css'
import Button from 'components/App/core/Button'
import { Redirect } from 'react-router-dom'

const CreateTransaction = ({ multisigAddress, loggedWallet }) => {
  const [redirect, setRedirect] = useState(false)

  const onCreate = () => {
    setRedirect(true)
  }

  return <div className={styles.root}>
    {redirect && <Redirect to={'/' + multisigAddress + '/create'} />}
    {loggedWallet && <Button onClick={() => { onCreate() }}>➕ Create New Tx</Button>}
  </div>
}

const mapStateToProps = state => {
  return {
    loggedWallet: state.loggedWallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)
