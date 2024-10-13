function calculateTotalTarget(startDate, endDate, totalTarget, excludeDay = 5) {
    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getDaysExcluding = (start, end, excludedDay) => {
        let currentDate = new Date(start);
        let excludedDaysCount = 0;
        
        while (currentDate <= end) {
            if (currentDate.getDay() === excludedDay) {
                excludedDaysCount++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return excludedDaysCount;
    };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const results = {
        daysExcludingFridays: [],
        daysWorkedExcludingFridays: [],
        monthlyTargets: [],
        totalTarget: 0
    };

    let currentYear = start.getFullYear();
    let currentMonth = start.getMonth();

    while (currentYear < end.getFullYear() || (currentYear === end.getFullYear() && currentMonth <= end.getMonth())) {
        const monthDays = daysInMonth(currentYear, currentMonth);
        const firstOfMonth = new Date(currentYear, currentMonth, 1);
        const lastOfMonth = new Date(currentYear, currentMonth, monthDays);
        const startOfMonth = (firstOfMonth < start) ? start : firstOfMonth;
        const endOfMonth = (lastOfMonth > end) ? end : lastOfMonth;

        const totalDays = (endOfMonth - startOfMonth) / (1000 * 60 * 60 * 24) + 1;
        const excludedDays = getDaysExcluding(startOfMonth, endOfMonth, excludeDay);
        const validWorkingDays = totalDays - excludedDays;

        results.daysExcludingFridays.push(totalDays);
        results.daysWorkedExcludingFridays.push(validWorkingDays);
        
        const monthlyTarget = (validWorkingDays > 0) ? (totalTarget / (end.getMonth() - start.getMonth() + 1)) : 0;
        results.monthlyTargets.push(monthlyTarget);

        results.totalTarget += monthlyTarget;

        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    }

    return results;
}
console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));