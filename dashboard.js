document.addEventListener("DOMContentLoaded", function () {
    fetch("fetch-dashboard-data.php")
        .then(response => response.json())
        .then(data => {
            // Update stat cards
            document.getElementById("totalCars").innerText = data.totalCars;
            document.getElementById("remindersSent").innerText = data.remindersSent;
            document.getElementById("registrationsRenewed").innerText = data.registrationsRenewed;
            document.getElementById("pendingRenewals").innerText = data.pendingRenewals;

            // Render recent registrations table
            const tableBody = document.getElementById("recentRegistrations");
            tableBody.innerHTML = "";
            data.recentRegistrations.forEach(reg => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${reg.license_plate}</td>
                    <td>${reg.make}</td>
                    <td>${reg.model}</td>
                    <td>${reg.registration_date}</td>
                `;
                tableBody.appendChild(row);
            });

            // ======== Registrations Overview (Line Chart) ========
            const lineLabels = data.lineChartData.map(item => {
                const monthNum = parseInt(item.month);
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return monthNames[monthNum - 1]; // Month index starts at 0
            });

            const lineData = data.lineChartData.map(item => parseInt(item.total));

            const lineCtx = document.getElementById("lineChart").getContext("2d");
            new Chart(lineCtx, {
                type: "line",
                data: {
                    labels: lineLabels,
                    datasets: [{
                        label: "Registrations Overview",
                        data: lineData,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: "#007bff"
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // ======== Registrations by Type (Pie Chart) ========
            const pieLabels = data.pieChartData.map(item => item.type);
            const pieData = data.pieChartData.map(item => parseInt(item.total));

            // Calculate total for percentages
            const totalVehicles = pieData.reduce((sum, val) => sum + val, 0);
            const piePercentages = pieData.map(val => ((val / totalVehicles) * 100).toFixed(1));

            const pieCtx = document.getElementById("pieChart").getContext("2d");
            new Chart(pieCtx, {
                type: "pie",
                data: {
                    labels: pieLabels.map((label, i) => `${label} (${piePercentages[i]}%)`),
                    datasets: [{
                        label: "Registrations by Type",
                        data: pieData,
                        backgroundColor: [
                            "#36a2eb", // blue
                            "#9966ff", // purple
                            "#ffcd56"  // yellow
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error fetching dashboard data:", error);
        });
});