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

  static dayToString(num) {
    let day = '';
    switch (num) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
    default:
      day = 'undefined';
      break;
    }
    return day;
  }
}

export default Parse;
