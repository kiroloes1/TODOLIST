document.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("alltask")) || [];
    tasks = Array.isArray(tasks) ? tasks.flat() : [];

    // تحضير البيانات
    let taskData = {};

    // إنشاء مفاتيح من التواريخ مع قيمة ابتدائية 0
    tasks.forEach(task => {
        if (task.date) {
            let date = task.date.split(",")[0];
            taskData[date] = 0;
        }
    });

    let totalTasksThisWeek = 0;
    let completedTasksThisWeek = 0;

    tasks.forEach(task => {
        if (task.status) {
            let date = task.date.split(",")[0];
            taskData[date] = (taskData[date] || 0) + 1;
        }
    });

    // ترتيب التواريخ تنازليًا للحصول على آخر 10 تواريخ
    let sortedDates = (Object.keys(taskData).sort((a, b) => new Date(b) - new Date(a)).slice(0, 7)).reverse();
    let filteredTaskData = {};
    sortedDates.forEach(date => {
        filteredTaskData[date] = taskData[date];
    });

    // رسم الرسم البياني
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(filteredTaskData),
            datasets: [{
                label: "Completed Tasks",
                data: Object.values(filteredTaskData),
                lineTension: 0.2,
                backgroundColor: 'rgba(72, 201, 176, 0.2)',
                borderColor: "#48C9B0",
                borderWidth: 3,
                fill: true,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: 1,
            plugins: {
                legend: { display: true },
                tooltip: { boxPadding: 3 },
                title: {
                    display: true,
                    text: "Tasks Completed Per Day"
                }
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 30
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
});
