document.addEventListener('DOMContentLoaded', () => {
  fetch('admin-dashboard-data.php')
    .then(res => res.json())
    .then(data => {
      document.getElementById('vehiclesCount').textContent = data.totalVehicles;
      document.getElementById('paidUsers').textContent = data.paidUsers;
      document.getElementById('totalAmount').textContent = data.totalAmount;
      document.getElementById('pendingCount').textContent = data.pendingRenewals;

      // Render pie chart
      const ctx = document.getElementById('vehicleTypeChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(data.vehicleTypes),
          datasets: [{
            data: Object.values(data.vehicleTypes),
            backgroundColor: ['#007bff', '#28a745', '#ffc107']
          }]
        },
        options: {
          responsive: true
        }
      });
    });
});