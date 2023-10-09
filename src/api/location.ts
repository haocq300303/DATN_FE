/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "./config"

export const getAllLocation = () => {
    return instance.get(`/location`)
}
export const getOneLocation = (idLocation: any) => {
    return instance.get(`/location/${idLocation}`)
}
export const getCreatLocation = (location: any) => {
    return instance.post(`/location`, location)
}
export const getUpdateLocation = (_id: any, location: any) => {
    return instance.put(`/location/${_id}`, location)
}
export const getDeleteLocation = (idLocation: any) => {
    return instance.delete(`/location/${idLocation}`)
}