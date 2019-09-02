export class Hexcolor {
  // Hash any string into an integer value
  // Then we'll use the int and convert to hex.
  private static hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  // Convert an int to hexadecimal with a max length
  // of six characters.
  private static intToARGB(i) {
    let hex =
      ((i >> 24) & 0xff).toString(16) +
      ((i >> 16) & 0xff).toString(16) +
      ((i >> 8) & 0xff).toString(16) +
      (i & 0xff).toString(16);
    // Sometimes the string returned will be too short so we
    // add zeros to pad it out, which later get removed if
    // the length is greater than six.
    hex += '000000';
    return hex.substring(0, 6);
  }

  // Extend the string type to allow converting to hex for quick access.
  public static toHexColour(str: string) {
    return this.intToARGB(this.hashCode(str));
  }

  public static shadeColor(color, percent) {
    const f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      '#' +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  }
}
