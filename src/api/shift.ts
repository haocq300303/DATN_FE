/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "./config"

export const getAllShift = () => {
    return instance.get(`/shift`)
}
export const getOneShift = (idShift: any) => {
    return instance.get(`/shift/${idShift}`)
}
export const getCreatShift = (Shift: any) => {
    return instance.post(`/shift`, Shift)
}
export const getUpdateShift = ( _id: any, Shift: any) => {
    return instance.put(`/shift/${_id}`, Shift)
}
export const getDeleteShift = (idShift: any) => {
    return instance.delete(`/shift/${idShift}`)
}