import { locationFinder, urlHelper } from "./Dependencies";
import { WhereIsCommand } from "./WhereIsCommand";

exports.whereIsCommand = async (req, res) => {
    const command = new WhereIsCommand(locationFinder, urlHelper);
    const result = await command.execute(req);  
    res.status(200).send(result);
};