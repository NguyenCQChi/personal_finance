/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '@styles/style.css';
import { theme } from '@styles/index';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
// import { wrapper } from '@stores';

function MyApp({ Component, ...rest } : { Component: any }) {
  // const { store, props } = wrapper.useWrapperStore(rest)
  // const { pageProps } = props;

  return (
    // <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component/>
      </ThemeProvider>
    /* </Provider> */
  )
}

export default MyApp;