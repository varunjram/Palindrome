const inputdate = document.getElementById("inputDate");
const validatebtn = document.getElementById("validate");
const output = document.getElementById("output");

// output.innerText = "Awesome";

function reverseStr(str) {
  let reversedStr = str.split("").reverse().join("");
  return reversedStr;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function dateToString(date) {
  let dateStr = {day: "", month: "", year: ""};

  let {day, month, year} = date;

  if (day < 10) {
    dateStr.day = "0" + day;
  } else {
    dateStr.day = day;
  }
  if (month < 10) {
    dateStr.month = "0" + month;
  } else {
    dateStr.month = month;
  }
  dateStr.year = year.toString();
  return dateStr;
}

function getALlDateFormat(date) {
  let dateobj = dateToString(date);

  let {day, month, year} = dateobj;

  let ddmmyyyy = day + month + year;
  let mmddyyyy = month + day + year;
  let yyyymmdd = year + month + day;
  let ddmmyy = day + month + year.slice(-2);
  let mmddyy = month + day + year.slice(-2);
  let yymmdd = year.slice(-2) + month + day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
  let listOfDateFormates = getALlDateFormat(date);

  let palindrome = false;

  for (let i = 0; i < listOfDateFormates.length; i++) {
    if (isPalindrome(listOfDateFormates[i])) {
      palindrome = true;
      break;
    }
  }

  return palindrome;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
function getNextdate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindrome(date) {
  let counter = 0;
  let nextDate = getNextdate(date);

  while (1) {
    counter++;
    let palindrome = checkPalindrome(nextDate);
    if (palindrome) {
      break;
    }
    nextDate = getNextdate(nextDate);
  }
  return [counter, nextDate];
}

function clickHandler() {
  let bdayStr = inputdate.value;

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    let isPalindrome = checkPalindrome(date);
    if (isPalindrome) {
      output.innerText = "Yay! Your Biethday is a palindrome 🎉✨🎆👏👏👏";
    } else {
      let [counter, {day, month, year}] = getNextPalindrome(date);
      //   console.log(getNextPalindrome(date));
      output.innerText = `Sorry your birthday is not a Palindrome. Next nearest date is ${day}-${month}-${year}, and you have missed this by ${counter} Days`;
    }
  }
}

validatebtn.addEventListener("click", () => clickHandler());
