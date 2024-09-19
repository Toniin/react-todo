/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const Store = React.createContext({} as {
  state: any;
  dispatch: React.Dispatch<any>;
});

export function useStore() {
  return React.useContext(Store);
}

export default Store;