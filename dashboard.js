document.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("alltask")) || [];
    tasks = Array.isArray(tasks) ? tasks.flat() : [];

    // تحديد بداية ونهاية الأسبوع الحالي
    let today = new Date();
    let dayOfWeek = today.getDay(); // 0 = الأحد
    let firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    let lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    lastDayOfWeek.setHours(23, 59, 59, 999);

    // تحضير البيانات
    let taskData = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    let totalTasksThisWeek = 0;
    let completedTasksThisWeek = 0;

    const dayMap = {
      Sunday: 'Sun', Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed',
      Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat',
      'الأحد': 'Sun', 'الإثنين': 'Mon', 'الثلاثاء': 'Tue',
      'الأربعاء': 'Wed', 'الخميس': 'Thu', 'الجمعة': 'Fri', 'السبت': 'Sat'
    };

    tasks.forEach(task => {
      if (task.status && task.day && task.date) {
        let taskDate = new Date(task.date);
        if (taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek) {
          let rawDay = task.day.split(",")[0].trim();
          let day = dayMap[rawDay] || rawDay;

          if (taskData.hasOwnProperty(day)) {
            taskData[day]++;
            totalTasksThisWeek++;
            completedTasksThisWeek++;
          }
        }
      }
    });

    // حساب النسبة
    let completionPercentage = totalTasksThisWeek > 0
      ? (completedTasksThisWeek / totalTasksThisWeek) * 100
      : 0;

    // رسم الرسم البياني
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(taskData),
        datasets: [{
          label: "Completed Tasks This Week",
          data: Object.values(taskData),
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
        plugins: {
          legend: { display: true },
          tooltip: { boxPadding: 3 },
          title: {
            display: true,
            text: "Tasks Completed Per Day"
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  });