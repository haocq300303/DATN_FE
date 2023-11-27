import instance from './config';

const getRoleById = (id: string) => {
  return instance.get(`roles/${id}`);
};

export { getRoleById };
