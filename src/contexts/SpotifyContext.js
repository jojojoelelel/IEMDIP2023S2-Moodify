import React, {createContext, useContext, useState, useEffect} from 'react';

const SpotifyContext = createContext();

const SpotifyContextProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState();
};
