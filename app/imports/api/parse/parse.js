class Parse {
  timeToNum(string) {
    return (parseInt(string.substring(0, 2), 10) * 60) + parseInt(string.substring(3, 5), 10);
  }

  timeToString(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  dayToString(num) {
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
