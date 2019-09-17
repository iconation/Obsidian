import { withStyles } from '@material-ui/core/styles'
import Button from 'components/App/core/Button'

export default withStyles({
  root: {
    color: '#ffffff',
    width: '100%',
    fontWeight: 'bold',
    border: '1px solid #f07c2f',
    background: 'radial-gradient(ellipse at top, #ccaf0b, #ff0000)',
    '&:hover': {
      background: 'radial-gradient(ellipse at top, #dcbf1b, #ff0000)'
    },
    boxShadow: '-1px 2px 5px 1px rgba(0, 0, 0, 0), -1px 2px 5px rgba(0, 0, 0, 0.3)'
  }
})(Button)
