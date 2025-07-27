document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const password = form.password.value;
  const confirmPassword = form.confirm_password.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const data = {
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    password: password
  };

  fetch("zainabokoth.wuaze.com/signup.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Account created! You will be redirected to login.");
        window.location.href = "user-login.html";
      } else {
        alert(data.message || "Signup failed.");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong.");
    });
});
