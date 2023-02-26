let login = false;

const registerForm = document.querySelector("#form-register");
const loginForm = document.querySelector("#form-login");

const loginLink = document.querySelector("#link-login");
loginLink.addEventListener("click", displayLoginForm, false);

const registerLink = document.querySelector("#link-register");
registerLink.addEventListener("click", displayLoginForm, false);

document
	.querySelector("#passwordD")
	.addEventListener("keyup", checkPasswordStrength);

function displayLoginForm(event) {
	login = !login;
	toggleClass(registerForm, loginForm, registerLink, loginLink);
}

function toggleClass(...element) {
	element.forEach((el) => {
		el.classList.toggle(el.id.includes("link") ? "active" : "d-none");
	});
}

function getFormData(element) {
  const formObj = new FormData(element);
  const formData = {};
  for (const [key, value] of formObj) {
    formData[key] = value;
  }
  return formData;
}

registerForm.children[0].addEventListener(
	"submit",
	(event) => {
    const formData = getFormData(registerForm.children[0]);

    // do something with the data
		console.log(formData);

		if (!event.target.checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
		}

		event.target.classList.add("was-validated");
	},
	false
);

const loginUserField = document.querySelector("#floatingInput")
const loginPassField = document.querySelector("#floatingPassword")

loginForm.children[0].addEventListener("submit", (event) => {
	event.preventDefault();
	event.stopPropagation();

	const formData = getFormData(loginForm.children[0]);

  if ((formData["login-username"] !== "user") || (formData["login-password"] !== "password")) {
    loginUserField.classList.add("is-invalid");
    loginPassField.classList.add("is-invalid");
  } else {
    loginUserField.classList.remove("is-invalid");
    loginPassField.classList.remove("is-invalid");
  }

  // do something with the data
	console.log(formData);

	event.target.reset();
}, false);

function checkPasswordStrength() {
	const password = document.getElementById("passwordD").value;
	const indicator = document.getElementById("password-strength-bar");
	let strength = 0;

	if (password.length < 8) {
		strength = password.length * 3;
	} else if (
		password.match(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=\\|[\]{};:,./?]).{8,}$/
		)
	) {
		strength = 100;
	} else {
		strength = 50;
	}

	indicator.style.width = strength + "%";
	if (strength < 50) {
		indicator.style.backgroundColor = "red";
	} else if (strength < 90) {
		indicator.style.backgroundColor = "orange";
	} else {
		indicator.style.backgroundColor = "green";
	}
}
