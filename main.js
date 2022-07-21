let currentStatus = "weekly";
const statusButtons = document.querySelectorAll(".status-button");
const spendsField = document.querySelector(".spends");

const displayData = (data) => {
  data.map((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="card-bg" style="background: ${item.img_bg}"><img src="${
      item.img
    }" /></div>
            <div class="card-body">
                <div class="title-con"><h3 class="card-title">${
                  item.title
                }</h3><img src="${item.menu_icon}"/></div>
                <div class="time-details"><h1 class="card-time">${
                  currentStatus === "weekly"
                    ? item.timeframes.weekly.current
                    : currentStatus === "daily"
                    ? item.timeframes.daily.current
                    : item.timeframes.monthly.current
                }hrs</h1>
                <p class="last-week">Last Week - ${
                  currentStatus === "weekly"
                    ? item.timeframes.weekly.previous
                    : currentStatus === "daily"
                    ? item.timeframes.daily.previous
                    : item.timeframes.monthly.previous
                }hrs</p></div>
            </div>
        `;
    spendsField.appendChild(card);
  });
};
let data;
const res = await fetch("./data.json");
data = await res.json();
displayData(data);

statusButtons.forEach((item) => {
  item.addEventListener("click", () => {
    statusButtons.forEach((button) => {
      button.classList.remove("active");
    });
    item.classList.add("active");
    currentStatus = item.value;
    spendsField.innerHTML = "";
    displayData(data);
  });
});
