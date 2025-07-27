document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const password = form.password.value;
  const confirmPassword = form.confirm_password.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const formData = new FormData(form);

  fetch("signup.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      if (data.trim() === "success") {
        alert("Account created! You will be redirected to login.");
        window.location.href = "user-login.html";
      } else {
        alert(data);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong.");
    });
});