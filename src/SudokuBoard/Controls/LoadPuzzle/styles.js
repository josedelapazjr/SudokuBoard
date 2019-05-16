import { isWidthUp } from '@material-ui/core/withWidth/index';

export default {
  root: ({width}) => {
    return{
      marginTop: isWidthUp('sm', width) ? -600 : null,
    }
  },
  text:  {
    minWidth: 550,
  },
  input: {
    fontSize: 12,
  },
};
