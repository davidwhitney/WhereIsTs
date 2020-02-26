import { capacity, checkin, heatmap, map, whereis } from "./AppFactory";

module.exports.capacityCommand = async (req, res) => {
  const result = await capacity.execute(req);  
  res.send(result);
};

module.exports.checkinCommand = async (req, res) => {
  const result = await checkin.execute(req);  
  res.send(result);
};

module.exports.heatmapCommand = async (req, res) => {
  const result = await heatmap.execute(req);  
  res.send(result);
};

module.exports.mapCommand = async (req, res) => {
  const result = await map.execute(req);  
  res.send(result);
};

module.exports.whereisCommand = async (req, res) => {
  const result = await whereis.execute(req);  
  res.send(result);
};