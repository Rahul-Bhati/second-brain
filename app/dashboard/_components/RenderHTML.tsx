import React from "react";

interface RenderHTMLProps {
    htmlContent: string;
}

const RenderHTML: React.FC<RenderHTMLProps> = ({ htmlContent }) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default RenderHTML;
