import { capacity, checkin, heatmap, map, whereis, FileResult } from './AppFactory';
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

      } else if(req.path.indexOf("/check-in") !== -1) {
        result = await checkin.execute(req);

      } else if(req.path.indexOf("/map") !== -1) {
        const mapResult = await map.execute(req);
        return imageFile(res, mapResult);       

      } else if(req.path.indexOf("/heatmap") !== -1) {
        const mapResult = await heatmap.execute(req); 
        return imageFile(res, mapResult); 
      }

      console.log(result);
      res.send(result);

  } catch (ex) {
      console.error(ex);      
      res.status(500).send(ex);
  }
};

const imageFile = (res, fileResult: FileResult) => {
  res.setHeader('Content-Type', fileResult.ContentType);
  res.send(fileResult.FileContents);  
};