import React from 'react'
import { connect } from 'react-redux'
import styles from './Homepage.module.scss'
import WalletManagement from './WalletManagement'
import TxPending from './TxPending'
import TxExecuted from './TxExecuted'
import CreateTransaction from './CreateTransaction'
import WalletInfo from './WalletInfo'

const ConnectedHomepage = ({ match }) => {
  const multisigAddress = 'cx' + match.params.multisigAddress

  return <div className={styles.root}>
    {multisigAddress && <>
      <WalletInfo multisigAddress={multisigAddress} />
      <TxPending multisigAddress={multisigAddress} />
      <CreateTransaction multisigAddress={multisigAddress} />
      <TxExecuted multisigAddress={multisigAddress} />
      <WalletManagement multisigAddress={multisigAddress} />
    </>
    }
  </div>
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHomepage)
