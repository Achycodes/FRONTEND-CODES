document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("login.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // ✅ Store username in localStorage
      localStorage.setItem("username", formData.get("username"));

      // ✅ Redirect to dashboard
      window.location.href = data.redirect;
    } else {
      alert(data.message);
    }
  })
  .catch(err => {
    console.error("Fetch error:", err);
    alert("Something went wrong. Check console.");
  });
});