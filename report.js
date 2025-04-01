

let tasks = JSON.parse(localStorage.getItem("alltask")) || [];
tasks = Array.isArray(tasks) ? tasks.flat() : [];


let storedDate = JSON.parse(localStorage.getItem("date")) || "";
let y = 0;
let totalTasks = 0; 
let report={
  taskname:"",
  date:"",
  
  completionPerce:0
}


tasks.forEach(task => {
    if (storedDate === task.date.split(",")[0]) { 
        totalTasks++; 
        if (task.status) { 
            y++;
        }
    }
});


let completionPercentage =0
if (totalTasks > 0) {
   completionPercentage  = ((y / totalTasks) * 100).toFixed(2);

}

let filter = JSON.parse(localStorage.getItem("filter")) || [];
filter.forEach(task => {
    if (storedDate === task.date.split(",")[0]) {
        report.taskname = task.day.split(",")[0];
        report.date = task.date.split(",")[0];
        report.completionPerce = completionPercentage;
    }
});

let report4 = JSON.parse(localStorage.getItem("report")) || [];

// تحقق من وجود التقرير بنفس التاريخ والاسم
let existingReport = report4.some(existing => existing.date === report.date && existing.taskname === report.taskname);

if (!existingReport) {
    report4.push(report);
    localStorage.setItem("report", JSON.stringify(report4));
}

console.log(report4);
