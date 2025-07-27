document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("admin-login.php", {
    method: "POST",
    body: formData,
  })
    .then(res => res.text())
    .then(data => {
      if (data.trim() === "success") {
        alert("Welcome, Admin Zainab!");
        window.location.href = "admin-dashboard.html";
      } else {
        alert(data);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error during login.");
    });
});