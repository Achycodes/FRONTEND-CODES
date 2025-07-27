document.getElementById('mpesaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const phone = document.getElementById('phone').value;
  const amount = document.getElementById('amount').value;
  const statusMsg = document.getElementById('statusMsg');

  fetch('mpesa-process.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ phone, amount })
  })
  .then(res => res.text())
  .then(data => {
    statusMsg.textContent = data;
  })
  .catch(err => {
    statusMsg.textContent = 'Payment failed. Try again.';
  });
});