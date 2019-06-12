import { ISPList } from './OnDemandCreditListWebPart';  
  
export default class MockHttpClient {  
    private static _items: ISPList[] = [{"Customer": 'Test', "# of Credits for this Element": 1, "# of Credits Purchased": 2, "Comments": 'something', "Credit Remaining": 3,"L_x002d_Customer":'Test',"L_x002d_CreditsPurchased":'5',"L_x002d_CreditsForElement":'3',"L_x002d_CreditRemaining":'2',"Opportunity_x0020_ID":'1234'  },];  
    public static get(restUrl: string, options?: any): Promise<ISPList[]> {  
      return new Promise<ISPList[]>((resolve) => {  
            resolve(MockHttpClient._items);  
        });  
    }  
} 