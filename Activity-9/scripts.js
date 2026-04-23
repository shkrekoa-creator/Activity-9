console.log("=== Activity 9: Contact Form Validation ===");

const form = document.getElementById("contactForm");

const state = {
  name: false,
  email: false,
  message: false
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// VALIDATION FUNCTIONS
function validateName(value) {
  if (value.trim() === "") {
    return { valid: false, message: "Name is required" };
  }
  return { valid: true, message: "" };
}

function validateEmail(value) {
  if (value.trim() === "") {
    return { valid: false, message: "Email is required" };
  }
  if (!emailRegex.test(value)) {
    return { valid: false, message: "Invalid email format" };
  }
  return { valid: true, message: "" };
}

function validateMessage(value) {
  if (value.trim() === "") {
    return { valid: false, message: "Message is required" };
  }
  if (value.length < 10) {
    return { valid: false, message: "Minimum 10 characters required" };
  }
  return { valid: true, message: "" };
}

// SHOW ERROR / SUCCESS
function showMessage(field, result) {
  const error = document.getElementById(field + "Error");
  const input = document.getElementById(field);

  error.classList.remove("show");
  input.classList.remove("valid", "invalid");

  if (!result.valid) {
    error.textContent = result.message;
    error.classList.add("show");
    input.classList.add("invalid");
  } else {
    input.classList.add("valid");
  }
}

// VALIDATE FIELD
function validateField(field, value) {
  let result;

  if (field === "name") result = validateName(value);
  if (field === "email") result = validateEmail(value);
  if (field === "message") result = validateMessage(value);

  state[field] = result.valid;
  showMessage(field, result);
  updateButton();
}

// ENABLE/DISABLE BUTTON
function updateButton() {
  const btn = document.getElementById("submitBtn");
  btn.disabled = !(state.name && state.email && state.message);
}

// REAL-TIME VALIDATION
["name", "email", "message"].forEach(field => {
  const input = document.getElementById(field);

  input.addEventListener("input", e => {
    validateField(field, e.target.value);
  });

  input.addEventListener("blur", e => {
    validateField(field, e.target.value);
  });
});

// FORM SUBMIT
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  let valid = true;

  ["name", "email", "message"].forEach(field => {
    const value = formData.get(field);
    validateField(field, value);
    if (!state[field]) valid = false;
  });

  if (valid) {
    console.log("Form Submitted Successfully");

    for (let [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    document.getElementById("formSuccess").classList.remove("hidden");
  }
});

console.log("App Ready");