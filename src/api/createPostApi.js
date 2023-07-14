import API from './api';

export const createPost = async (
  channelId,
  title,
  description,
  file,
  thumbnail,
  songId,
) => {
  try {
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('file', file);
    form.append('thumbnail', thumbnail);
    form.append('songId', songId);

    const response = await API.post(`/channel/${channelId}/post`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
