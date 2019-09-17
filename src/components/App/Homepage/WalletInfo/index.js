import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './WalletInfo.module.scss'
import Balance from 'components/App/core/Balance'
import { IconAmount, IconConverter } from 'icon-sdk-js'
import { api } from 'SCORE/API'

const ConnectedWalletInfo = ({ multisigAddress }) => {
    const [balance, setBalance] = useState(null)

    !balance && api.getBalance(multisigAddress).then(balance => {
        setBalance(IconConverter.toNumber(IconAmount.of(balance, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)))
    })

    return <div className={styles.root}>
        <Balance label={'MultiSig Balance (ICX)'} balance={balance} />
    </div>
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedWalletInfo)
