export class Helper {
    
    static transformOrder(order: string): string
    {
        switch(order){
            case 'ascend':
                return 'asc';
            case 'descend':
                return 'desc';
            default:
                return null;
        }
    }
}