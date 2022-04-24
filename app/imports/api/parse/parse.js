class Parse {
  static timeToNum(string) {
    return (parseInt(string.substring(0, 2), 10) * 60) + parseInt(string.substring(3, 5), 10);
  }

  static timeToString(num) {
    let hours = Math.floor(num / 60);
    let suffix = 'AM';
    const minutes = num % 60;
    if (hours > 12) {
      hours -= 12;
      suffix = 'PM';
    }
    return `${hours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
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
