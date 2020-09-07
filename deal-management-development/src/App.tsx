import React from "react";
import "./App.scss";
import ThemeProvider from "./theme/ThemeProvider";
import { StoreProvider } from "easy-peasy";
import store from "./store/index";
import RouteHandler from "./navigation/RouteHandler";
import { ReactQueryConfigProvider } from "react-query";

const queryConfig = { refetchAllOnWindowFocus: false };

function App() {
  return (
    <ThemeProvider direction="ltr">
      <StoreProvider store={store}>
        <ReactQueryConfigProvider config={queryConfig}>
          <RouteHandler />
        </ReactQueryConfigProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
