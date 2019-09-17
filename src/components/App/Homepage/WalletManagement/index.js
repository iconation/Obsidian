import React from 'react'
import { connect } from 'react-redux'
import core from 'themes/core.module.scss'
import styles from './WalletManagement.module.scss'
import Owners from './Owners'
import Requirement from './Requirement'
import {
  setErrorMessage
} from 'store/actions'

const WalletManagement = ({
  multisigAddress,
  setErrorMessage
}) => {
  return (
    <div className={styles.root}>
      <div className={[core.bigtitle, styles.title].join(' ')}>Wallet Settings</div>
      <Owners multisigAddress={multisigAddress} />
      <Requirement multisigAddress={multisigAddress} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (o) => dispatch(setErrorMessage(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletManagement)
