/* eslint-disable no-alert */
/* eslint-disable import/prefer-default-export */

"use strict";

require("./src/assets/scss/init.scss");
require('default-passive-events');
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    "This app has been updated. " + "Reload to display the latest version?"
  );
  if (answer === true) {
    window.location.reload();
  }
};
