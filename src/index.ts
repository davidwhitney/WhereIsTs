import { whereis, map, heatmap } from "./Dependencies";

export const whereIsCommand = async (req, res) => {
  const result = await whereis.execute(req);  
  res.send(result);
};

export const mapCommand = async (req, res) => {
  const result = await map.execute(req);  
  res.send(result);
};

export const heatMapCommand = async (req, res) => {
  const result = await heatmap.execute(req);  
  res.send(result);
};