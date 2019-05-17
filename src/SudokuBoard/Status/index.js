import React from 'react';
import PropTypes from 'prop-types';
import InProgress from './InProgress';
import Success from './Success';


const Status = ({isOpen, isComplete, classes, handleClose}) => (
  <div>
    {isComplete ? <Success isOpen={isOpen} handleClose={handleClose}/> : <InProgress isOpen={isOpen} />}
  </div>
);

Status.propTypes = {
  isOpen: PropTypes.bool,
  isComplete: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Status;