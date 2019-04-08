import { ISPList } from './TilesWebPartWebPart';  
  
export default class MockHttpClient {  
    private static _items: ISPList[] = [{ TileTitle: 'Test Tile', TileColcor: 'Green' },];  
    public static get(restUrl: string, options?: any): Promise<ISPList[]> {  
      return new Promise<ISPList[]>((resolve) => {  
            resolve(MockHttpClient._items);  
        });  
    }  
} 