import React from "react";

const Error = ({ touched, message }) => {
    if (!touched) {
        return <div className="from-message invalid"> </div>;
    }
    if (message) {
        return <div className="from-message invalid">{message}</div>;
    }
    return <div className="from-message valid"> </div>;
};

export default Error;
