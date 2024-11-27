import { createContext, useReducer, useContext } from "react";

const errorReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload;
    case "REMOVE":
      return null;
    default:
      return state;
  }
};

const ErrorContext = createContext();

export const ErrorContextProvider = (props) => {
  const [error, errorDispatch] = useReducer(errorReducer, null);

  return (
    <ErrorContext.Provider value={[error, errorDispatch]}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export const useErrorValue = () => {
  const errorAndDispatch = useContext(ErrorContext);
  return errorAndDispatch[0];
};

export const useErrorDispatch = () => {
  const errorAndDispatch = useContext(ErrorContext);
  return errorAndDispatch[1];
};

export default ErrorContext;
