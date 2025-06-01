import React from "react";

const BlogDetailsPage = ({ dataByID }) => {
  console.log(dataByID, "dataByID");
  const contentRender = dataByID[`blog-content`][0].content;
  console.log(contentRender, "contentRender");

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: contentRender }} />
    </div>
  );
};

export default BlogDetailsPage;
