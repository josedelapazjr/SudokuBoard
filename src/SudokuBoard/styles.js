import { isWidthUp } from '@material-ui/core/withWidth/index';

export default {
  root: ({ width }) => {
    return {
      margin: '0 auto',
      width: isWidthUp('md', width) ? 800 : 400,
    };
  },
  header: {
    
  },
  tableContainer: {
    border: '2px solid black',
  }
};
