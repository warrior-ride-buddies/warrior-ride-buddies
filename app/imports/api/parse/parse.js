class Parse {
  static timeToNum(string) {
    return (parseInt(string.substring(0, 2), 10) * 60) + parseInt(string.substring(3, 5), 10);
  }

  static timeToString(mins) {
    let returnVal = 'N/A';
    if (mins !== '') {
      let h = Math.floor(mins / 60);
      let m = mins % 60;
      h = h < 10 ? `0${h}` : h; // (or alternatively) h = String(h).padStart(2, '0')
      m = m < 10 ? `0${m}` : m; // (or alternatively) m = String(m).padStart(2, '0')
      returnVal = `${h}:${m}`;
    }
    return returnVal;
  }

  static stringToNumDay(string) {
    const conversion = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return conversion.indexOf(string);
  }
}

export default Parse;
