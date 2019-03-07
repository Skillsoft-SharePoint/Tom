# Dev
changelinks.js
  the changelinks.js file in the SRC/LogoRedirect/loc/ folder
  has to go into Marketing Site Assest Lirary
  it is used in the onint function in LogoRedirectApplicationCustomizer.ts (same folder)

LogoRedirectApplicationCustomizer.ts
  /* The following line has a the changelinks.js file. tis location on the tennat is where it pulls from, the file
  in this project is located in the src/extensions/LogoRedirect/Loc folder */
  private _externalJsUrl: string = "https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/changeLink.js";
