import user from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (email: string, password: string) => {
  const u = await user.findOne({ email });
  if (!u) throw new Error("user not found");
  const isMatch = await bcrypt.compare(password, u.password);
  if (!isMatch) throw new Error("password is not correct");

  if (!u.approuve) throw new Error("your account is not approved");

  const data = {
    id: u._id,
    email: u.email,
    role: u.role,
  };

  const token = jwt.sign(data, process.env.JWT_SECRET || "secret", {
    expiresIn: "24h",
  });

  return token;
};
export const register = async (data: any) => {
  const u = await user.create(data);
  return u;
};
export const approuve = (id: string) => {
  return user.findByIdAndUpdate(
    id,
    { approuve: true },
    {
      new: true,
    }
  );
};
export const reject = (id: string) => {
  return user.findByIdAndDelete(id);
  return "oki";
};
export const getall = () => {
  return user.find({
    approuve: false,
  });
};
export const getMyData = (id: string) => {
  return user.findById(id);
};
