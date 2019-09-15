export class Device {
  private static deviceList = {
    MacOS: ['Mac Os', 'MacOS'],
    Windows: ['Windows'],
    Linux: ['Linux'],
    iOS: ['iOS'],
    Android: ['Android'],
    Unknown: ['Unknown']
  };

  static getDeviceList() {
    return Object.keys(this.deviceList);
  }

  static getDevice(deviceName: string): string {
    for (const key in this.deviceList) {
      if (this.deviceList[key]) {
        const found = this.deviceList[key].find(value => value.toLowerCase() === deviceName.toLowerCase());
        if (found) {
          return key;
        }
      }
    }
    return null;
  }
}
