import { capacity, checkin, heatmap, map, whereis } from "./AppFactory";
import { SlackRequest } from './Slack/SlackRequest';
import { SlackResponse } from './Slack/SlackResponse';

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
};

export const whereisCommand = async (req, res) => {
  const slackRequest = req.body as SlackRequest;
  let result: SlackResponse | null = null;
  
  if (slackRequest.command === "/whereis") {    
    result = await whereis.execute(slackRequest);
  }

  if(slackRequest.command === "/capacity") {    
    result = await capacity.execute(slackRequest);
  }
  
  res.send(result);
};