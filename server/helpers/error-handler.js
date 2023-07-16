//error handlers.
const authErrorHandler = (result) => {
  switch (result) {
    case "USER_ERROR":
      return "Full Name is incorrect or not registered as an employee.";
    case "EMAIL_ERROR":
      return "Email is incorrect or not registered as an employee.";
    case "NON_EXIST":
      return "No Such Employee Exists, If You Think That It Is An Error Please Contact Human Resource Department.";
    case "TOKEN_EXPIRED":
      return "Token Has Been Expired.";
    default:
  }
};

module.exports = { authErrorHandler };
