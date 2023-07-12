import API from './api';

export const createPostApi = async (
  channelId,
  title,
  description,
  file,
  thumbnail,
) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('thumbnail', thumbnail);

    const endpoint = `/channel/${channelId}/post`;

    const response = await API.post(endpoint, formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
