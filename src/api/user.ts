import instance from './config';

const updateUser = (_id: string, user: any) => {
  return instance.put(`users/${_id}`, user);
};

const checkBookingLimit = (idUser: string, IdPitch: any) => {
  return instance.get(`booking-limit/${idUser}?pitch_id=${IdPitch}`);
};

export { updateUser, checkBookingLimit };
