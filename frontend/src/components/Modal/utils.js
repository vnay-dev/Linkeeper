export const createID = () => {
  var milliSec = new Date().getTime();
  var idFormat = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  var uuid = idFormat.replace(/[xy]/g, function (c) {
    var r = (milliSec + Math.random() * 16) % 16 | 0; // learn...
    milliSec = Math.floor(milliSec / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
