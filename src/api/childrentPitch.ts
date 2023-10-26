/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "./config"

export const getAllChildrentPitch = () => {
    return instance.get(`childrentPicth`)
}
export const getOneChildrentPitch = (idPitch: any) => {
    return instance.get(`childrentPicth/${idPitch}`)
}
export const getCreatChildrentPitch = (pitch: any) => {
    return instance.post(`childrentPicth`, pitch)
}
export const getUpdateChildrentPitch = (_id: any, pitch: any) => {
    return instance.put(`childrentPicth/${_id}`, pitch)
}
export const getDeleteChildrentPitch = (idPitch: any) => {
    return instance.delete(`childrentPicth/${idPitch}`)
}