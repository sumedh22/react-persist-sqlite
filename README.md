# redux-persist-cordova-sqlite

> use sqlite with redux persist in cordova based apps

[![NPM](https://img.shields.io/npm/v/redux-persist-cordova-sqlite.svg)](https://www.npmjs.com/package/redux-persist-cordova-sqlite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-persist-cordova-sqlite
```

## Usage

```jsx

store.js

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import {sqlLiteStorage} from 'redux-persist-cordova-sqlite';



export default () => {
  const persistConfig = {
    key: 'root',
    storage: sqlLiteStorage()
  }
  const persistedReducer = persistReducer(persistConfig, reducer);

  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};

~.~.~.~.~.~.~

App.jsx

import getStoreAndPersistor from 'store'

export default function App() {
  const { store, persistor } = getStoreAndPersistor();
  return (
    <Provider store={store}>
      <PersistGate loading={<div></div>} persistor={persistor}>
        <HashRouter>
          <Main />
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

```

## License

MIT © [sumedh22](https://github.com/sumedh22)
