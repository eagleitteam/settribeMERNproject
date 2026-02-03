import User from "./auth.model.js";

export const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};
