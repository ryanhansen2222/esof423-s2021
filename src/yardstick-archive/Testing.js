function isValid(s) {

  const regexdigit = /\d/
  const regexdigit2 = /[!@#\$%\^&\*\(\)]/

  if (s.length < 5 || s.length > 10) {
    return false;
  }
  else if (regexdigit.test(s)) {
    return false;
  }
  else if (regexdigit2.test(s)) {
    return true;
  }
  else {
    return true;
  }
}

exports.isValid = isValid