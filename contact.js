document.getElementById("contactForm").addEventListener("submit", function(e) {
  const email = document.querySelector("input[name='email']").value;
  const message = document.querySelector("textarea[name='message']").value;

  if (!email.includes("@") || message.length < 5) {
    alert("Please enter a valid email and message.");
    e.preventDefault();
  }
});