import { SlList } from "./seller_listing";
import { UsList } from "./user_listing";
import { User_prelist } from "./user_pre_listing";
export const List = ({user_type}) =>{
    
    if (user_type=='Seller'){
        console.log(1);
        return(
            <SlList/>
        );
    }
    else{
        
        return(

            <User_prelist/>

        )
    }
}