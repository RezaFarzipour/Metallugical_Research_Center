// const getUrlExtension = (url) => {
//   return url.split(/[#?]/)[0].split(".").pop().trim();
// };

const getFilename = (url: string | undefined) => {
  // const  filename = url.substr( url.lastIndexOf("/") + 1);
  return url?.split("/").pop();
};

export const imageUrlToFile = async (imgUrl: string | undefined) => {
  // var imgExt = getUrlExtension(imgUrl);

  if (imgUrl) {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const filename = getFilename(imgUrl) ?? "default.jpg"; // یا نام پیش‌فرض دلخواه
    const file = new File([blob], filename, {
      type: blob.type,
    });
    return file;
  }
  
};
