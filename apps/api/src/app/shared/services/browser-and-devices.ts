export enum Browser {
  INTERNET_EXPLORER = 'Internet Explorer',
  FIREFOX = 'Firefox',
  SAFARI = 'Safari',
  CHROME = 'Chrome',
  OPERA = 'Opera'
}

export enum OS {
  WINDOWS = 'Windows',
  MACOS = 'Mac OS',
  PUPPETEER = 'Puppeteer'
}

export enum Platform {
  ANDROID = 'Android',
  IOS = 'iOS'
}

export type UNKNOWN = 'Unknown';

export function getBrowser(name: string): Browser | UNKNOWN {
  if (!name) {
    return 'Unknown';
  }
  if (name.toLowerCase().includes('chrome')) {
    return Browser.CHROME;
  }
  if (name.toLowerCase().includes('firefox')) {
    return Browser.FIREFOX;
  }
  if (name.toLowerCase().includes('opera')) {
    return Browser.OPERA;
  }
  if (name.toLowerCase().includes('safari')) {
    return Browser.SAFARI;
  }
  if (/ie|internet explorer|iexplorer|explorer/.test(name.toLowerCase())) {
    return Browser.INTERNET_EXPLORER;
  }
  return 'Unknown';
}

export function getDevice(name: string): OS | Platform | UNKNOWN {
  if (!name) {
    return 'Unknown';
  }
  if (/mac|os x/.test(name.toLowerCase())) {
    return OS.MACOS;
  }
  if (/win|xp/.test(name.toLowerCase())) {
    return OS.WINDOWS;
  }
  if (/puppeteer/.test(name.toLowerCase())) {
    return OS.PUPPETEER;
  }

  return 'Unknown';
}

function getMobileBrowser(name: string) {
  if (/iPhone|iPad/.test(name)) {
    return Browser.SAFARI;
  }
  return Browser.CHROME;
}

export function getBrowserAndDevice(
  desiredCapabilities: DesiredCapabilities
): { deviceName: string; browserName: Browser | UNKNOWN; version: string } {
  // mobile device
  const mobileDeviceName =
    desiredCapabilities.device || desiredCapabilities.deviceName;
  const version =
    desiredCapabilities.os_version ||
    desiredCapabilities.platformVersion ||
    desiredCapabilities.version ||
    'Unknown';
  if (desiredCapabilities.device || desiredCapabilities.deviceName) {
    return {
      deviceName: mobileDeviceName,
      browserName: getMobileBrowser(mobileDeviceName),
      version
    };
  }
  // desktop
  const platform = desiredCapabilities.platform || desiredCapabilities.os;
  return {
    deviceName: getDevice(platform),
    browserName: getBrowser(desiredCapabilities.browserName),
    version
  };
}

export class DesiredCapabilities {
  device?: string;
  browserName?: string;
  deviceName?: string;
  platformName?: string;
  platformVersion?: string;
  platform?: string;
  os?: string;
  os_version?: string;
  version?: string;
}
