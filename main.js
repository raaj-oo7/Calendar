let month = 0;

const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const currentMonthYear = document.getElementById("currentMonthYear");
const calendarDays = document.getElementById("calendarDays");
const darkThemeButton = document.getElementById("darkThemeButton");
let isDarkTheme = false;

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

    // Create the previous month's days
    let prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    let prevMonthDays = prevMonthLastDay.getDate();

    for (let i = firstDay.getDay(); i > 0; i--) {
        const day = document.createElement("li");
        day.textContent = prevMonthDays - i + 1;
        day.classList.add("date-inactive");
        calendarDays.appendChild(day);
    }

    // Create the current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {

        const day = document.createElement("li");
        day.classList.add("active");
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

    // Create the next month's days
    for (let i = 1; calendarDays.children.length < 42; i++) {
        const day = document.createElement("li");
        day.textContent = i;
        day.classList.add("date-inactive");
        calendarDays.appendChild(day);
    }
}
updateCalendar();

// Function to toggle the dark theme
function toggleDarkTheme() {
    isDarkTheme = !isDarkTheme;
    if (isDarkTheme) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }

    // Store the theme in local storage
    localStorage.setItem("darkTheme", isDarkTheme);
}

// Dark theme before refresh window then this function will be work
function loadTheme() {
    isDarkTheme = localStorage.getItem("darkTheme") === "true";
    if (isDarkTheme) {
        document.body.classList.add("dark-theme");
    }
}
loadTheme();

// Event listeners for previous and next month buttons
prevMonthButton.addEventListener("click", function () {
    month--;
    updateCalendar();
});

nextMonthButton.addEventListener("click", function () {
    month++;
    updateCalendar();
});

// Event listener for toggle theme button
darkThemeButton.addEventListener("click", function (e) {
    toggleDarkTheme();
});