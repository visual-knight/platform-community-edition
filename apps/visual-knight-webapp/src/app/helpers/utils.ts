import * as md5 from 'md5';

export function getIndexBy(array: Array<{}>, { name, value }): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i][name] === value) {
      return i;
    }
  }
  return -1;
}

export function getGravatarImageHash(email: string, size: number): string {
  const emailHash = md5(email.toLowerCase());
  return `//www.gravatar.com/avatar/${emailHash}?s=${size}&d=mm`;
}
