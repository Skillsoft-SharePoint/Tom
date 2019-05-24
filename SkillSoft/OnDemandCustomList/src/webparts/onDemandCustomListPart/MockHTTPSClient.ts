import { ISPList } from './OnDemandCustomListPartWebPart';  
  
export default class MockHttpClient {  
    private static _items: ISPList[] = [{"Customer": 'Test', "# of Credits for this Element": 1, "# of Credits Purchased": 2, "Comments": 'something', "Credit Remaining": 3 },];  
    public static get(restUrl: string, options?: any): Promise<ISPList[]> {  
      return new Promise<ISPList[]>((resolve) => {  
            resolve(MockHttpClient._items);  
        });  
    }  
} 