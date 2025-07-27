document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const firstName = formData.get('first_name');
    const secondName = formData.get('second_name');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://zainabokoth.wuaze.com/signup.php", {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      if (!response.ok) throw new Error("Signup failed.");

      const result = await response.text();
      alert("Signup successful: " + result);
    } catch (err) {
      console.error(err);
      alert("Signup error: " + err.message);
    }
  });
});
