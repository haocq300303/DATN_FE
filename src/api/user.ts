import instance from "./config";

const updateUser = (_id: string, user: any) => {
    return instance.put(`users/${_id}`, user);
  };

  export {updateUser}