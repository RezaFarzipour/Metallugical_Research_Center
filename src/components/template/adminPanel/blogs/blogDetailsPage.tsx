import React from "react";

const BlogDetailsPage = ({ dataByID }) => {
  const contentRender = dataByID[`blog-content`][0].content;

  return (
    <div className="max-w-screen-lg min-h-screen flex justify-center items-center  mx-auto">
      <div
        className="blogUl__disc blogUl__decimal"
        dangerouslySetInnerHTML={{ __html: contentRender }}
      />
    </div>
  );
};

export default BlogDetailsPage;
