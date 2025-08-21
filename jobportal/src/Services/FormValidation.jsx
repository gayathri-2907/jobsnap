export const signupValidation = (name, value) => {
  switch (name) {
    case "userName":
      if (value.trim().length === 0) return "Username is required";
      return "";
    case "userEmail":
      if (value.length === 0) return "Email is required";
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
        return "Invalid email format";
      return "";
    case "userPassword":
      if (value.length === 0) return "Password is required";
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value))
        return "Invalid Pattern";
      return "";
    default:
      return "";
  }
}

export const loginValidation = (name, value) => {
  switch (name) {
    case "userEmail":
      if (value.length === 0) return "Email is required";
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
        return "Invalid email format";
      return "";

    case "userPassword":
      if (value.length === 0) return "Password is required";
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value))
        return "Invalid Pattern";
      return "";

    default:
      return "";
  }
}


export const inputChecks = (type, name) => {
  if (type === "text") {
    return { required: "*Please fill this field" };
  } else if (type === "email") {
    return {
      required: "*Please fill this field",
      pattern:
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
    };
  } else if (type === "number") {
    switch (name) {
      case "mobile":
        return {
          required: "*Please fill this field",
          minLength: { value: 10, message: "*Invalid mobile number " },
          maxLength: { value: 10, message: "*Invalid mobile number" },
        };
      case "postalCode":
        return {
          required: "*Please fill this field",
          minLength: { value: 6, message: "*Invalid postal code" },
          maxLength: { value: 6, message: "*Invalid postal code" },
        };
      default:
        return { required: "*Please fill this field" };
    }
  }
};

