const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNii-d-rK0eCKFHL0J7Tcwf3J1i3BSMybnxWgdzr4cZhf_0ZQ_CKhJDUnAzup0fi9guWFk5Z7VUXpw/pub?gid=0&single=true&output=tsv";
async function fetchData() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  const rows = text.split("\n").map((row) => row.split("\t"));
  return rows; // First row contains headers
}

const loadingIndicator = document.getElementById("loading-indicator");
const contentElement = document.getElementById("content");
async function updateLeaderboard() {
  const data = await fetchData();

  // Loop through the top 3 participants (or any other number)
  for (let i = 1; i <= 10; i++) {
    if (data[i]) {
      // Ensure that the row exists
      const name = data[i][0];
      const wage = data[i][1];
      const prize = data[i][2];

      // Dynamically target the elements for top 1, top 2, etc.
      const topName = document.getElementById(`top-${i}-name`);
      const topWage = document.getElementById(`top-${i}-wage`);
      const topPrize = document.getElementById(`top-${i}-prize`);

      topName.innerHTML = "";
      topWage.innerHTML = "";
      topPrize.innerHTML = "";

      // Update the content of these elements
      topName.innerHTML = name;
      topWage.innerHTML = `$ ${wage}`;
      if (i < 4) topPrize.innerHTML = prize;
      else topPrize.innerHTML = `$ ${prize}`;
    }
  }
  loadingIndicator.style.display = "none";
  contentElement.style.display = "block";
}

// Initial call to update leaderboard
updateLeaderboard();

// Update leaderboard every  12 hours
setInterval(updateLeaderboard, 60000);

// Set the target date
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 31); // Countdown for 14 days

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  } else {
    clearInterval(interval);
    document.querySelector(".countdown").innerHTML = "<h2>Time's Up!</h2>";
  }
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);
updateCountdown();
