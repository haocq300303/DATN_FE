/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "./config";

export const getAllShift = () => {
  return instance.get(`/shift`);
};
export const getAllShiftFindOpponent = () => {
  return instance.get(`/shift/find-opponent/all`);
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

export const getShiftBookedByChildPitchAndNumberShift = (
  idChildPitch: string,
  number_shift: number
) => {
  return instance.get(
    `shift/shift-booked/child-pitch-number-shift/${idChildPitch}?number_shift=${number_shift}`
  );
};
