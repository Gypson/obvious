import React from "react";
import Alert from "../../Alert";

const Tripped = () => {
  return (
    <Alert danger title="This feature has crashed or failed to load.">
      Please try again.
    </Alert>
  );
};

export default Tripped;
