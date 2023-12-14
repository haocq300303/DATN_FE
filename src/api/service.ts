import { IService } from "../interfaces/service";
import instance from "./config";

const getAllService = () => {
  return instance.get(`services`);
};

const getServicePitch = (idService: string) => {
  return instance.get(`pitch/service/${idService}`);
};

const createService = (service: IService) => {
  return instance.post(`services`, service);
};

const updateService = (_id: string, service: IService) => {
  return instance.patch(`services/${_id}`, service);
};

const deleteService = (idService: string) => {
  return instance.delete(`services/${idService}`);
};

export {
  getAllService,
  getServicePitch,
  createService,
  updateService,
  deleteService,
};
