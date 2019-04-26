import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class RootSpinner extends React.Component {
  render() {
    return (
      <div className='root-spinner-container'>
        <CircularProgress className='root-spinner' />
      </div>
    );
  }
}

export default RootSpinner;
