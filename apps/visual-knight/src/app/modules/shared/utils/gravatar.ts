import * as md5 from 'md5';

export function getGravatarImageHash(email: string, size: number): string {
  const emailHash = md5(email.toLowerCase());
  return `//www.gravatar.com/avatar/${emailHash}?s=${size}&d=mm`;
}
