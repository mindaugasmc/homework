import React, { useEffect } from 'react';
import '@babel/polyfill';

export const Authorize = React.createContext();
const baseURL = 'https://api.themoviedb.org/4';
const apiKey = '5e4d9534da84b3f842a76658ee849dbd';
const readAccessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTRkOTUzNGRhODRiM2Y4NDJhNzY2NThlZTg0OWRiZCIsInN1YiI6IjVjZTJhNDM2OTI1MTQxM2U2NWI5YWNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PjF68y-ld_jC35CprQwz3upYa0qQ3ceCGFNYaWs_ELs';

let request_token;

export const getRequestToken = async () => {
  try {
    const response = await fetch(`${baseURL}/auth/request_token`, {
      method: 'POST',
      body: JSON.stringify({
        redirect_to: 'http://localhost:8080'
        // redirect_to: 'http://www.themoviedb.org/'
      }),
      headers: {
        Authorization: `Bearer ${readAccessToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    console.log(response);

    if (response.status !== 200) {
      console.log('Error from getting request token');
      throw new Error('Error from getting request token');
    }

    const responseJson = await response.json();

    // document.cookie = responseJson.request_token;
    document.cookie = 'request_token=' + responseJson.request_token;

    console.log(responseJson);

    window.location.replace(
      `https://www.themoviedb.org/auth/access?request_token=${
        responseJson.request_token
      }`
    );
  } catch ({ message }) {
    //   setError(message);
    console.log(message);
  }
};

const getCookie = cname => {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const getAccessToken = async () => {
  // debugger;
  request_token = getCookie('request_token');
  try {
    const response = await fetch(`${baseURL}/auth/access_token`, {
      method: 'POST',
      body: JSON.stringify({
        request_token: request_token
      }),
      headers: {
        Authorization: `Bearer ${readAccessToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    console.log(response);

    document.cookie =
      'request_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    if (response.status !== 200) {
      console.log('Error from getting request token');
      throw new Error('Error from getting access token');
    }

    const { success, access_token, account_id } = await response.json();

    // console.log(`Response json: ${responseJson}`);
    console.log(success);
    console.log(access_token);
    console.log(account_id);

    if (success) {
      document.cookie = 'access_token=' + access_token;
      document.cookie = 'account_id=' + account_id;
      console.log('Authorization was successful');
    } else {
      throw new Error('Error: Authorization was unsuccessful');
    }
  } catch ({ message }) {
    //   setError(message);
    console.log(message);
  }
};

const Authorization = () => {
  // useEffect(() => {
  //   request_token = getCookie('request_token');
  //   getAccessToken(request_token);
  // }, []);
};

export default Authorization;
