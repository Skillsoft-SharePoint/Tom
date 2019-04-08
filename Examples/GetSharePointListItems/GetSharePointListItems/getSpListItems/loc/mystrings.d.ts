declare interface IGetSpListItemsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'getSpListItemsStrings' {
  const strings: IGetSpListItemsStrings;
  export = strings;
}
