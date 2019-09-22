import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TransactionExecuted.module.scss'
import core from 'themes/core.module.scss'
import { api } from 'SCORE/API'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from 'components/App/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { IconAmount, IconConverter } from 'icon-sdk-js'
import GoHomepage from 'components/App/GoHomepage'
import {
  setErrorMessage,
  setOwnersList
} from 'store/actions'


const ConnectedTransactionExecuted = ({ match, owners, setOwnersList }) => {
  const [tx, setTx] = useState(null)
  const multisigAddress = 'cx' + match.params.multisigAddress
  const transactionId = match.params.id

  owners.length == 0 && api.getWalletOwnerCount(multisigAddress).then(ownersCount => {
    api.getWalletOwners(multisigAddress, 0, ownersCount).then(owners => {
      setOwnersList(owners)
    }).catch(err => {
      setErrorMessage(err)
    })
  }).catch(err => {
    setErrorMessage(err)
  })

  owners.length != 0 && !tx && api.getTransactionInfo(multisigAddress, transactionId).then(tx => {
    return api.getConfirmations(multisigAddress, 0, owners.length, tx['_transaction_id']).then(confirmationsAddresses => {
      tx['_confirmationsAddresses'] = confirmationsAddresses
      setTx(tx)
    })
  })

  return <>
    <GoHomepage multisigAddress={multisigAddress} />

    <div className={core.mediumtitle}>Transaction {transactionId}</div>
    {tx &&
      <Table size='small'>
        <TableBody>

          <TableRow key={tx['_transaction_id'] + 'confirmation'}>
            <TableCell className={styles.dark}>Confirmations</TableCell>
            <TableCell>
              <div className={styles.txConfirmations}>
                {owners.map(owner => (
                  tx['_confirmationsAddresses'].includes(owner)
                    ? <div key={owner} tooltip={owner} className={styles.txConfirmed}></div>
                    : <div key={owner} tooltip={owner} className={styles.txNotConfirmed}></div>
                ))}
              </div>
            </TableCell>
          </TableRow>

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
    owners: state.owners
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOwnersList: (o) => dispatch(setOwnersList(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedTransactionExecuted)
