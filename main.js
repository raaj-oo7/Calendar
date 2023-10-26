let month = 0;

const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const currentMonthYear = document.getElementById("currentMonthYear");
const calendarDays = document.getElementById("calendarDays");

// Function to update the calendar display
function updateCalendar() {
    let date = new Date();

    date.setMonth(date.getMonth() + month);

    // Set the displayed month and year
    currentMonthYear.textContent = `${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`;

    calendarDays.innerHTML = '';
    // Calculate the first day of the month
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //  previous and next month's date repeat in current month's dates are empty spaces
    for (let i = firstDay.getDay(); i > 0; i--) {
        const emptySpace = document.createElement("li");
        calendarDays.appendChild(emptySpace);
    }

    // Create the current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {

        const day = document.createElement("li");
        day.textContent = i;
        
        // Check the current day is today
        if (
            date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth() &&
            i === new Date().getDate()
        ) {
            day.style.backgroundColor = "red";
            day.style.color = "white";
        }

        calendarDays.appendChild(day);
    }
}
updateCalendar();

// Event listeners for previous and next month buttons
prevMonthButton.addEventListener("click", function () {
    month--;
    updateCalendar();
});

nextMonthButton.addEventListener("click", function () {
    month++;
    updateCalendar();
});