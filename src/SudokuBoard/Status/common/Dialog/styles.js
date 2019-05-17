import { isWidthUp } from '@material-ui/core/withWidth';

export default {
  root: ({width, index, isReadOnly}) => {
    return {
      marginTop: isWidthUp('sm', width) ? -600 : null,
    };
  },
};
