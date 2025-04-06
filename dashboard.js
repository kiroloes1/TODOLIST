document.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("alltask")) || [];
    tasks = Array.isArray(tasks) ? tasks.flat() : [];

    // تحديد بداية ونهاية الأسبوع الحالي
    let today = new Date();
    let dayOfWeek = today.getDay(); // 0 = الأحد
    // let firstDayOfWeek = new Date(today);
    // firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
    // firstDayOfWeek.setHours(0, 0, 0, 0);

    // let lastDayOfWeek = new Date(firstDayOfWeek);
    // lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    // lastDayOfWeek.setHours(23, 59, 59, 999);

    // تحضير البيانات
  

    let taskData = {};

    // إنشاء مفاتيح من التواريخ مع قيمة ابتدائية 0
    tasks.forEach(task => {
        if (task.date) {
            let date = task.date.split(",")[0] ;
            taskData[date] = 0;
        }
    });
   
    let totalTasksThisWeek = 0;
    let completedTasksThisWeek = 0;

 

 
tasks.forEach(task => {
    if (task.date) {
        let date = task.date.split(",")[0]
        taskData[date] = (taskData[date] || 0) + 1;
    }
});



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