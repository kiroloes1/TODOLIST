document.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("alltask")) || [];
  tasks = Array.isArray(tasks) ? tasks.flat() : [];

  // تحديد بداية ونهاية الأسبوع الحالي
  let today = new Date();
  let firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // الأحد
  let lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6)); // السبت

  // استخراج بيانات المهام لهذا الأسبوع فقط
  let taskData = {
      Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0
  };
  let totalTasksThisWeek = 0;
  let completedTasksThisWeek = 0;

  tasks.forEach(task => {
      if (task.status && task.day && task.date) {
          let taskDate = new Date(task.date); // تأكد أن لديك `date` في بيانات المهمة بتنسيق YYYY-MM-DD
          if (taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek) {
              let day = task.day.split(",")[0];
              if (taskData.hasOwnProperty(day)) {
                  taskData[day]++;
                  totalTasksThisWeek++;
                  if (task.status) completedTasksThisWeek++; // حساب المهام المكتملة
              }
          }
      }
  });

  // حساب النسبة المئوية للمهام المكتملة
  let completionPercentage = totalTasksThisWeek > 0 ? (completedTasksThisWeek / totalTasksThisWeek) * 100 : 0;

  // إعداد الرسم البياني
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: Object.keys(taskData), // أسماء الأيام
          datasets: [{
              label: "Completed Tasks This Week",
              data: Object.values(taskData), // عدد المهام المكتملة لكل يوم
              lineTension: 0.2,
              backgroundColor: 'rgba(72, 201, 176, 0.2)',
              borderColor: "#48C9B0",
              borderWidth: 3,
              fill: true,
              pointRadius: 4
          }]
      },
      options: {
          plugins: {
              legend: { display: true },
              tooltip: { boxPadding: 3 },
              title: {
                  display: true,
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
