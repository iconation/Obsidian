import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export default withStyles({
  root: {
    color: 'grey',
    border: '1px solid #d9d9d9',
    padding: '10px',
    background: 'linear-gradient(to bottom, #ffffff, #f8f8f8)',
    '&:hover': {
      background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)'
    },
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)'
  },
  label: {
    textTransform: 'uppercase'
  }
})(Button)
