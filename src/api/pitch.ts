import instance from "./config"

export const getAllPitch = () => {
    return instance.get(`/pitch`)
}
export const getOnePitch = (idPitch: any) => {
    return instance.get(`/pitch/${idPitch}`)
}
export const getCreatPitch = (pitch: any) => {
    return instance.post(`/pitch`, pitch)
}
export const getUpdatePitch = (_id: any, pitch: any) => {
    return instance.put(`/pitch/${_id}`, pitch)
}
export const getDeletePitch = (idPitch: any) => {
    return instance.delete(`/pitch/${idPitch}`)
}