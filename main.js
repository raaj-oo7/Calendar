let month = 0;

const previousMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const currentMonthYear = document.getElementById("currentMonthYear");
const calendarDays = document.getElementById("calendarDays");
const themeSwitch = document.getElementById("checkbox");
const body = document.body;
const isDarkTheme = false;

// Functions
function getPreviousMonthDays(date) {
    const lastDayOfPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    return lastDayOfPreviousMonth.getDate();
}

function createPreviousMonthDays(prevMonthDays, firstDay) {
    for (let i = firstDay.getDay(); i > 0; i--) {
        const day = document.createElement("li");
        day.textContent = prevMonthDays - i + 1;
        day.classList.add("date-inactive");
        calendarDays.appendChild(day);
    }
}

function createCurrentMonthDays(lastDay, date) {
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement("li");
        day.classList.add("active");
        day.textContent = i;

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

function createNextMonthDays() {
    for (let i = 1; calendarDays.children.length < 42; i++) {
        const day = document.createElement("li");
        day.textContent = i;
        day.classList.add("date-inactive");
        calendarDays.appendChild(day);
    }
}

function createCalendarTotalDays(date) {
    calendarDays.innerHTML = "";

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const previousMonthDays = getPreviousMonthDays(date);

    createPreviousMonthDays(previousMonthDays, firstDay);
    createCurrentMonthDays(lastDay, date);
    createNextMonthDays();
}

function updateCalendar() {
    const date = new Date();

    date.setMonth(date.getMonth() + month);

    // Set the displayed month and year
    currentMonthYear.textContent = `${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`;

    // Populate the calendar with days
    createCalendarTotalDays(date);
}
updateCalendar();

const cachedTheme = localStorage.getItem('theme');

if (cachedTheme) {
    body.dataset.theme = cachedTheme;
} else {
    body.dataset.theme = 'light';
}

// Function to toggle between light and dark themes
function toggleTheme() {
    if (body.dataset.theme === "light") {
        body.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
    } else {
        body.dataset.theme = "light";
        localStorage.setItem("theme", "light");
    }
}

// Event listeners for previous and next month buttons
previousMonthButton.addEventListener("click", function () {
    month--;
    updateCalendar();
});

nextMonthButton.addEventListener("click", function () {
    month++;
    updateCalendar();
});
// Set the initial theme switch based on the cached theme
themeSwitch.checked = body.dataset.theme === "dark";

// Event listener for toggle theme button
themeSwitch.addEventListener("click", function (e) {
    toggleTheme();
    themeSwitch.checked = body.dataset.theme === "dark";
});