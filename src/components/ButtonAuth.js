import React from 'react';
import Button from 'react-bootstrap/Button';
import { getRequestToken, getAccessToken } from '../services/Authorization';

class ButtonAuth extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.requestToken = this.requestToken.bind(this);
    this.authorizeUser = this.authorizeUser.bind(this);

    this.state = {
      isLoading: false
    };
  }

  requestToken() {
    this.setState({ isLoading: true }, () => {
      getRequestToken().then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  authorizeUser() {
    this.setState({ isLoading: true }, () => {
      getAccessToken().then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  render() {
    const { isLoading } = this.state;
    // console.log('getRequestToken:' + getRequestToken());
    // console.log('getAccessToken:' + getAccessToken());
    return (
      <div>
        <h2>Authorization of the user 1-st step</h2>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? this.requestToken : null}
        >
          {isLoading ? 'Loading…' : 'Click to authorize'}
        </Button>

        <h2>Athorization 2-nd step</h2>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? this.authorizeUser : null}
        >
          {isLoading ? 'Loading…' : 'Click to authorize'}
        </Button>
      </div>
    );
  }
}

export default ButtonAuth;
