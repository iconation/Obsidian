import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'

export default withStyles({
  root: {
    '&$focused': {
      color: '#dedede'
    }
  },
  focused: {}
})(InputLabel)
