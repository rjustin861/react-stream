import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
  useEffect(() => {
    window.gapi.load('client:auth2', async () => {
      console.log('client library has been loaded  successfully');
      await window.gapi.client.init({
        clientId:
          '616820429442-qdckla1fil1519s0r0n2kmmoih382f8g.apps.googleusercontent.com',
        scope: 'email',
      });
      const gauth = window.gapi.auth2.getAuthInstance();

      //setIsSignedIn(gauth.isSignedIn.get());
      onAuthChange(gauth.isSignedIn.get());

      gauth.isSignedIn.listen(onAuthChange);
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn)
      signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId());
    else signOut();
  };

  const onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) return null;
    else if (isSignedIn)
      return (
        <button onClick={onSignOutClick} className='ui button red google'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    else
      return (
        <button onClick={onSignInClick} className='ui button red google'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
