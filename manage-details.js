document.addEventListener('DOMContentLoaded', () => {
  fetchVehicles();

  document.getElementById('addVehicleForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('add-vehicle.php', {
      method: 'POST',
      body: formData
    }).then(() => {
      e.target.reset();
      fetchVehicles();
    });
  });
});

function fetchVehicles() {
  fetch('fetch-vehicles.php')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('vehicleTableBody');
      table.innerHTML = '';
      data.forEach(vehicle => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${vehicle.license_plate}</td>
          <td>${vehicle.make} ${vehicle.model}</td>
          <td>${vehicle.type}</td>
          <td>${vehicle.registration_date}</td>
          <td>${vehicle.expiry_date}</td>
          <td class="${vehicle.status === 'Renewed' ? 'status-renewed' : 'status-pending'}">${vehicle.status}</td>
          <td><input type="checkbox" ${vehicle.reminder == 1 ? 'checked' : ''} onchange="toggleReminder(${vehicle.id}, this.checked)"></td>
          <td><button class="edit" onclick="openEditModal(${vehicle.id})">Edit</button></td>
        `;
        table.appendChild(row);
      });
    });
}

function openEditModal(id) {
  fetch(`get-vehicle.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
      const form = document.getElementById('editVehicleForm');
      form.id.value = data.id;
      form.make.value = data.make;
      form.model.value = data.model;
      form.type.value = data.type;
      form.registration_date.value = data.registration_date;
      form.expiry_date.value = data.expiry_date;
      form.status.value = data.status;
      document.getElementById('editModal').style.display = 'block';
    });
}

function toggleReminder(id, state) {
  fetch('toggle-reminder.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, reminder: state ? 1 : 0 })
  });
}