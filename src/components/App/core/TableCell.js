import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

export default withStyles({
  root: {
    color: '#4d4d4d',
    border: '1px solid #d9d9d9',
    textAlign: 'center',
    fontWeight: 'inherit',
    backgroundColor: '#fffe'
  }
})(TableCell)
