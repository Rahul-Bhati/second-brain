import React from "react";

const RenderHTML = ({ htmlContent }) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default RenderHTML;
