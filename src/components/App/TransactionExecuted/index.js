import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TransactionExecuted.css'
import core from 'themes/core.module.scss'
import { api } from 'SCORE/API'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from 'components/App/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { IconAmount, IconConverter } from 'icon-sdk-js'
import GoHomepage from 'components/App/GoHomepage'

const ConnectedTransactionExecuted = ({ match }) => {
  const [tx, setTx] = useState(null)
  const multisigAddress = 'cx' + match.params.multisigAddress
  const transactionId = match.params.id

  !tx && api.getTransactionInfo(multisigAddress, transactionId).then(tx => {
    console.log(tx)
    setTx(tx)
  })

  return <>
    <GoHomepage multisigAddress={multisigAddress} />

    <div className={core.mediumtitle}>Transaction {transactionId}</div>
    {tx &&
      <Table size='small'>
        <TableBody>

          <TableRow key={tx['_transaction_id'] + 'destination'}>
            <TableCell className={styles.dark}>Destination</TableCell>
            <TableCell>{tx['_destination']}</TableCell>
          </TableRow>

          <TableRow key={tx['_transaction_id'] + 'value'}>
            <TableCell className={styles.dark}>Value (ICX)</TableCell>
            <TableCell>{IconConverter.toNumber(IconAmount.of(tx['_value'], IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX))}</TableCell>
          </TableRow>

          <TableRow key={tx['_transaction_id'] + 'method'}>
            <TableCell className={styles.dark}>Method</TableCell>
            <TableCell className={core.tt}>{tx['_method']}</TableCell>
          </TableRow>

          <TableRow key={tx['_transaction_id'] + 'params'}>
            <TableCell className={styles.dark}>Parameters</TableCell>
            <TableCell className={core.tt}>{tx['_params']}</TableCell>
          </TableRow>

          <TableRow key={tx['_transaction_id'] + 'description'}>
            <TableCell className={styles.dark}>Description</TableCell>
            <TableCell>{tx['_description']}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    }
  </>
}

const mapStateToProps = state => {
  return {
    multisigAddress: state.multisigAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedTransactionExecuted)
