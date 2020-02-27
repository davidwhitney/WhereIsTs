import { capacity, checkin, heatmap, map, whereis } from "./AppFactory";
import { SlackRequest } from './Slack/SlackRequest';

export const whereisCommand = async (req, res) => {
  
  try { 

      console.log("Incoming Request:")
      console.log(req.path);
      console.log(req.body);
      console.log(req.query);

      const slackRequest = req.body as SlackRequest;
      let result: any = null;

      if (slackRequest.command === "/whereis") {    
        result = await whereis.execute(slackRequest);
      } else if(slackRequest.command === "/capacity") {    
        result = await capacity.execute(slackRequest);
      } else if(req.path.indexOf("/Map") !== -1) {
        const mapResult = await map.execute(req); 
        res.status(mapResult.status);
        res.setHeader('Content-Type', mapResult.ContentType);
        res.send(...mapResult.FileContents);
        return;        
      } else if(req.path.indexOf("/HeatMap") !== -1) {
        result = await heatmap.execute(req); 
      } else if(req.path.indexOf("/Checkin") !== -1) {
        result = await checkin.execute(req);
      }

      console.log(result);
      res.send(result);

  } catch (ex) {

      console.error(ex);      
      res.status(500).send(ex);
  }

};