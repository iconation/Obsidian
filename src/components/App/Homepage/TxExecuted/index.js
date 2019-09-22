import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TxExecuted.module.scss'
import core from 'themes/core.module.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from 'components/App/core/TableCell'
import TableHead from 'components/App/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from 'components/App/core/Button'
import { api } from 'SCORE/API'
import {
  setErrorMessage
} from 'store/actions'
import { IconAmount, IconConverter } from 'icon-sdk-js'
import { Redirect } from 'react-router-dom'

const ConnectedTxExecuted = ({
  multisigAddress,
  owners,
  setErrorMessage
}) => {
  const [txExecuted, setTxExecuted] = useState(null)
  const [txDetailsId, setTxDetailsId] = useState(null)

  // Get transactions
  !txExecuted && api.getTransactionCount(multisigAddress, true, true).then(txCount => {
    api.getTransactionList(multisigAddress, 0, txCount, false, true).then(async txList => {
      // Get additional information
      const confirmations = await Promise.all(txList.map(tx => {
        return api.getConfirmations(multisigAddress, 0, owners.length, tx['_transaction_id']).then(confirmationsAddresses => {
          tx['_confirmationsAddresses'] = confirmationsAddresses
          return tx
        })
      }))
      setTxExecuted(confirmations)
    }).catch(err => {
      setErrorMessage(err)
    })
  })

  const onDetails = (id) => {
    setTxDetailsId(parseInt(id, 16))
  }

  return (
    <div className={styles.root}>
      {txDetailsId !== null && <Redirect to={'/' + multisigAddress + '/txexecuted/' + txDetailsId} />}
      {txExecuted &&
        <>
          <div className={[core.bigtitle, styles.title].join(' ')}>Executed Transactions</div>

          <div className={styles.tableContainer}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Confirmations</TableCell>
                  <TableCell>Value (ICX)</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {txExecuted.reverse().map(tx => (
                  <TableRow key={tx['_transaction_id']}>
                    <TableCell>
                      <div className={styles.txConfirmations}>
                        {owners.map(owner => (
                          tx['_confirmationsAddresses'].includes(owner)
                            ? <div key={owner} tooltip={owner} className={styles.txConfirmed}></div>
                            : <div key={owner} tooltip={owner} className={styles.txNotConfirmed}></div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{IconConverter.toNumber(IconAmount.of(tx['_value'], IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX))}</TableCell>
                    <TableCell>{tx['_description']}</TableCell>
                    <TableCell>
                      <Button onClick={() => onDetails(tx['_transaction_id'])}>🔎 Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    owners: state.owners
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (o) => dispatch(setErrorMessage(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedTxExecuted)
