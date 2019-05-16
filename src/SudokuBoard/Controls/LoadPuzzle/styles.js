import { isWidthUp } from '@material-ui/core/withWidth/index';

export default {
  root: ({width}) => {
    return{
      marginTop: isWidthUp('sm', width) ? -600 : null,
    }
  },
  text: ({width}) => {
    return {
      minWidth: isWidthUp('sm', width) ? 550 : null,
    };
  }, 
  input: {
    fontSize: 12,
  },
};
