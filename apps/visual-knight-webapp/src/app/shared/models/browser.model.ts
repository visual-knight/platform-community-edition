export class Browser {
  private static browserList = {
    Chrome: ['Chrome'],
    Safari: ['Safari'],
    Firefox: ['Firefox'],
    IE: ['IE', 'internetExplorer', 'Internet Explorer'],
    Edge: ['Edge'],
    Opera: ['Opera'],
    Unknown: ['Unknown']
  };

  static getBrowserList() {
    return Object.keys(this.browserList);
  }

  static getBrowser(browserName: string): string {
    for (const key in this.browserList) {
      if (this.browserList[key]) {
        const found = this.browserList[key].find(value => value.toLowerCase() === browserName.toLowerCase());
        if (found) {
          return key;
        }
      }
    }
    return null;
  }
}
