import React from "react";

const BlogDetailsPage = ({ dataByID }) => {

  const contentRender = dataByID[`blog-content`][0].content;


  return (
    <div className="flex justify-center items-center">
      <div className=" " dangerouslySetInnerHTML={{ __html: contentRender }} />
    </div>
  );
};

export default BlogDetailsPage;
