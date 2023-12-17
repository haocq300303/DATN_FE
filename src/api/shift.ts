/* eslint-disable @typescript-eslint/no-explicit-any */
import IShift from '~/interfaces/shift';
import instance from './config';

export const getAllShift = () => {
  return instance.get(`/shift`);
};
export const getAllShiftFindOpponent = (query?: string) => {
  return instance.get(`/shift/find-opponent/all${query ?? ''}`);
};
export const getAllShiftFindOpponentByPitch = (idPitch: any) => {
  return instance.get(`/shift/find-opponent/pitch/${idPitch}`);
};
export const getOneShift = (idShift: any) => {
  return instance.get(`/shift/${idShift}`);
};
export const getCreatShift = (Shift: any) => {
  return instance.post(`/shift`, Shift);
};
export const getUpdateShift = (_id: any, Shift: any) => {
  return instance.put(`/shift/${_id}`, Shift);
};
export const getDeleteShift = (idShift: any) => {
  return instance.delete(`/shift/${idShift}`);
};
export const matchOpponent = (data: any) => {
  return instance.post(`shift/match-opponent`, data);
};
export const findOpponent = (idShift: string, data: any) => {
  return instance.put(`shift/find-opponent/${idShift}`, data);
};

export const getShiftDefaultByPitch = (idPitch: string) => {
  return instance.get(`shift/default/pitch/${idPitch}`);
};

export const getShiftBookedByChildPitchAndNumberShift = (idChildPitch: string, number_shift: number) => {
  return instance.get(`shift/shift-booked/child-pitch-number-shift/${idChildPitch}?number_shift=${number_shift}`);
};

export const changeFindOpponent = (idShift: string, data: any) => {
  return instance.put(`shift/find-opponent/${idShift}`, data);
};
export const updateFindOpponent = (idShift: string, data: any) => {
  return instance.put(`shift/find-opponent/${idShift}`, data);
};

export const getShiftsByPitch = (idPitch: string, query: string) => {
  return instance.get(`shift/pitch/${idPitch}${query}`);
};

export const createShiftDefault = (shift: any) => {
  return instance.post(`/shift/default`, shift);
};

export const deleteShiftDefault = (shiftId: string) => {
  return instance.delete(`/shift/default/${shiftId}`);
};

export const updateShiftDefault = (shiftId: string, shift: any) => {
  return instance.put(`/shift/default/${shiftId}`, shift);
};

export const bookMultipleDay = (shift: IShift) => {
  return instance.post(`/shift/book-multiple-day`, shift);
};

export const bookOneShiftFullMonth = (shift: IShift) => {
  return instance.post(`/shift/book-one-shift-full-month`, shift);
};

export const bookChildrenPicthFullMonth = (shift: IShift) => {
  return instance.post(`/shift/book-childrenPicth-full-month`, shift);
};

export const cancelBooking = (shiftId: any, id_booking: any) => {
  return instance.put(`/shift/cancel-booking/${shiftId}?id_booking=${id_booking}`);
};
