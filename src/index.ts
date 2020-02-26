import { capacity, checkin, heatmap, map, whereis } from "./AppFactory";
/*
export const capacityCommand = async (req, res) => {
  const result = await capacity.execute(req);  
  res.send(result);
};

export const checkinCommand = async (req, res) => {
  const result = await checkin.execute(req);  
  res.send(result);
};

export const heatmapCommand = async (req, res) => {
  const result = await heatmap.execute(req);  
  res.send(result);
};

export const mapCommand = async (req, res) => {
  const result = await map.execute(req);  
  res.send(result);
};*/

export const whereisCommand = async (req, res) => {
  const result = await whereis.execute(req);  
  res.send(result);
};