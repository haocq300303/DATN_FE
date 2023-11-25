import instance from "./config"

export const getAllFeedback = () => {
    return instance.get(`feedback`)
}
export const totalStarByPitch = (idPitch: any) => {
    return instance.get(`feedback/totalStarByPitch/${idPitch}`)
}
export const creatFeedback = (feedback: any) => {
    return instance.post(`feedback`, feedback)
}
export const updateFeedback = (feedback?: any) => {
    return instance.put(`feedback/${feedback.id}`, feedback)
}
export const deleteFeedback = (idFeedback?: any) => {
    return instance.delete(`feedback/${idFeedback}`)
}