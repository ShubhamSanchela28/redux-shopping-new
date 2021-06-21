import { createStore } from "redux";
import rootReducer from "./rootreducer";
// import { persistStore } from 'redux-persist'
// import { composeWithDevTools } from "redux-devtools-extension";

// export const store = createStore(rootReducer, composeWithDevTools());

// export const persistor = persistStore(store)

// export default { store, persistor }

// import { createStore } from 'redux';
// import todoApp from '../redux/todo/reducer';


// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }


  // load string from localStarage and convert into an Object
  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }


  // create our store from our rootReducers and use loadFromLocalStorage
  const store = createStore(rootReducer, loadFromLocalStorage());
  console.log("store.getState()",store.getState());


  // listen for store changes and use saveToLocalStorage to
  // save them to localStorage
  store.subscribe(() => saveToLocalStorage(store.getState()));


  export default store

