import { withStyles } from '@material-ui/core/styles'
import Button from 'components/App/core/Button'

export default withStyles({
  root: {
    color: '#cdcdcd',
    fontWeight: 'bold',
    border: '1px solid #39020c',
    background: 'radial-gradient(ellipse at top, #6d051e, #3a0000)',
    '&:hover': {
      background: 'radial-gradient(ellipse at top, #7d152e, #3a0000)'
    },
    boxShadow: '-1px 2px 5px 1px rgba(0, 0, 0, 0), -1px 2px 5px rgba(0, 0, 0, 0.3)'
  }
})(Button)
