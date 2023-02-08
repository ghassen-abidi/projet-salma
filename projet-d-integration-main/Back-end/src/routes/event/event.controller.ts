import { Handler } from "express";
import * as service from "./event.service";

export const create: Handler = async (req: any, res) => {
  const body = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("no file");
  }

  const data = await service.create(body, file.filename);
  return res.send(data);
};

export const getall: Handler = async (req, res) => {
  const data = await service.getall();
  return res.send(data);
};

//unchecked
export const unchecked: Handler = async (req, res) => {
  const data = await service.unchecked();
  return res.send(data);
};

//approuve
export const approuve: Handler = async (req, res) => {
  const id = req.params.id;
  const data = await service.approuve(id);
  return res.send(data);
};
//reject
export const reject: Handler = async (req, res) => {
  const id = req.params.id;
  const data = await service.reject(id);
  return res.send(data);
};

export const getAllEvent: Handler = async (req, res) => {
  const data = await service.getAllEvent();
  return res.send(data);
};

//get event by id
export const getEventById: Handler = async (req, res) => {
  const id = req.params.id;
  const data = await service.getEventById(id);
  return res.send(data);
};
