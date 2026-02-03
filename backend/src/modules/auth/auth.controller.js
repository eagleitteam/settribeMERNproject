import { createUser } from "./auth.service.js";

export const register = async (req, res) => {
  const user = await createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user
  });
};
