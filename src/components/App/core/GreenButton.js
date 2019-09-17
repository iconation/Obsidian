import { withStyles } from '@material-ui/core/styles'
import Button from 'components/App/core/Button'

export default withStyles({
  root: {
    color: 'grey',
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '10px',
    background: 'linear-gradient(to bottom, #ffffff, #f8f8f8)',
    '&:hover': {
      background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)'
    },
    boxShadow: '-1px 2px 5px 1px rgba(0, 0, 0, 0), -1px 2px 5px rgba(0, 0, 0, 0.3)'
  }
})(Button)
