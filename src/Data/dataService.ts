import backgrounds from "./background.json"
import { IBackGroundItem } from "../Components/Background/BackgroundModel.jsx";
 
export class DataService {
    public loadBackground()
    {
        return backgrounds.map((img: IBackGroundItem) => {
            img.source = "./Images/Background gallery/" + img.source;
            return img;
        });
    }
}
export default new DataService()