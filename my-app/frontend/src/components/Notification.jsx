import { useNotificationValue } from "./NotificationContext";
import { useNotificationDispatch } from "./NotificationContext";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useNotificationValue();
  console.log("NOTIFICATION FORM", notification);
  const notificationDispatch = useNotificationDispatch();
  let style = {};
  if (notification) {
    style = { display: "" };
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE" });
    }, 5000);
  } else {
    style = { display: "none" };
  }

  return (
    <Alert severity="success" style={style} className="notification">
      {notification}
    </Alert>
  );
};

export default Notification;
