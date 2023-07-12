export const getMediaTypeFromUrl = url => {
  const extensionStartIndex = url.lastIndexOf('/');
  const extensionEndIndex = url.indexOf('?');
  const extension = url
    .substring(extensionStartIndex + 1, extensionEndIndex)
    .split('.')
    .pop();

  // Determine the media type based on the file extension
  if (extension === 'mp4') {
    return 'video';
  } else if (
    extension === 'jpg' ||
    extension === 'jpeg' ||
    extension === 'png'
  ) {
    return 'image';
  } else {
    return 'unknown';
  }
};
