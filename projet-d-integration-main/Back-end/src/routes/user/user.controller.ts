import { Handler } from "express";
import * as service from "./user.service";

export const login: Handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await service.login(email, password);
    return res.send({ token });
  } catch (e: any) {
    return res.status(400).send({ message: e.message });
  }
};
export const register: Handler = async (req, res) => {
  const body = req.body;
  const data = await service.register(body);
  return res.send(data);
};
export const approuve: Handler = async (req, res) => {
  const id = req.params.id;
  const data = await service.approuve(id);
  return res.send(data);
};
export const reject: Handler = async (req, res) => {
  const id = req.params.id;
  const data = await service.reject(id);
  return res.send(data);
};
export const getall: Handler = async (req, res) => {
  const data = await service.getall();
  return res.send(data);
};
export const getMyData: Handler = async (req: any, res) => {
  const data = await service.getMyData(req.user.id);
  return res.send(data);
};
