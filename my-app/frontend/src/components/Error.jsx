import { useErrorValue } from "./ErrorContext";
import { useErrorDispatch } from "./ErrorContext";
import { Alert } from "@mui/material";

const Error = () => {
  const error = useErrorValue();
  const errorDispatch = useErrorDispatch();
  let style = {};
  if (error) {
    style = { display: "" };
    setTimeout(() => {
      errorDispatch({ type: "REMOVE" });
    }, 5000);
  } else {
    style = { display: "none" };
  }

  return (
    <Alert severity="error" style={style} className="error">
      {error}
    </Alert>
  );
};

export default Error;
