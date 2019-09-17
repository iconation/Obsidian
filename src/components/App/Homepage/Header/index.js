
/*
import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './Header.css'
import { api } from 'SCORE/API'
import Balance from 'components/App/core/Balance'
import Login from './Login'
import { IconAmount, IconConverter } from 'icon-sdk-js'

const Header = ({
  multisigAddress
}) => {
  const [balance, setBalance] = useState(null)

  !balance && api.getBalance(multisigAddress).then(balance => {
    setBalance(IconConverter.toNumber(IconAmount.of(balance, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)))
  })

  return <div className={styles.root}>
    <Balance label={'MultiSig Balance (ICX)'} balance={balance} />
    <Login />
  </div>
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

*/