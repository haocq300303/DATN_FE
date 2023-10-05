import IBanner from "../interfaces/Banner";
import instance from "./config";

const getAllBanner = () => {
  return instance.get(`banners`);
};

const getOneBanner = (idBanner: string) => {
  return instance.get(`banners/${idBanner}`);
};

const createBanner = (banner: IBanner) => {
  return instance.post(`banners`, banner);
};

const updateBanner = (_id: string, banner: IBanner) => {
  return instance.patch(`banners/${_id}`, banner);
};

const deleteBanner = (idBanner: string) => {
  return instance.delete(`banners/${idBanner}`);
};

export {
  getAllBanner,
  getOneBanner,
  createBanner,
  updateBanner,
  deleteBanner,
};
