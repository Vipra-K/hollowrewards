const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRL35iLwF3Yg17JNbRA752DP5x3mCNK69bQjrFe2kv8aLwObyU4C9C6dhxq-cs_InYyPvvncvuMomro/pub?gid=0&single=true&output=csv";
async function fetchData() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  const rows = text.split("\n").map((row) => row.split(","));
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
      if (topName) topName.innerHTML = name;
      if (topWage) topWage.innerHTML = `$ ${wage}`;
      if (topPrize) topPrize.innerHTML = prize;
    }
  }
  loadingIndicator.style.display = "none";
  contentElement.style.display = "block";
}

// Initial call to update leaderboard
updateLeaderboard();

// Update leaderboard every  12 hours
setInterval(updateLeaderboard, 43200000);
