import { environment } from "../../environments/environment";

export class Helper {
    
    static transformOrder(order: string): string
    {
        switch(order){
            case 'ascend':
                return 'asc';
            case 'descend':
                return 'desc';
            default:
                return 'asc';
        }
    }

    static formatPhoneNumber(phoneNumber: string){
        if(phoneNumber === '' || phoneNumber === null)
            return null;
        if(phoneNumber !== '' && phoneNumber !== null){
            if(phoneNumber.includes('+241')){
                return phoneNumber;
            }else{
                return '+241'+phoneNumber;
            }
        }
    }

    static formatUrl(url: string): string{
        return environment.endpoint + '/' + url;
    }

}