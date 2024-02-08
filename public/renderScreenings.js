async function fetchScreenings() {
  const id = window.location.pathname;
  const response = await fetch(`/api/screenings/screenings-details-page${id}`);
  const payload = await response.json();
  return payload;
}

const screeningTitle = document.querySelector("#screenings__title");
screeningTitle.innerText = "Kommande visningar för denna film";
const screeningsContent = document.querySelector("#screenings__content");
fetchScreenings().then((payload) => {
  payload.data.forEach((element) => {
    const screeningsListItem = document.createElement("li");
    const startTime = element.attributes.start_time.slice(0, -8);
    const startTimes = startTime.replace("T", " ");
    screeningsListItem.innerText = `${startTimes} - Salong: ${element.attributes.room}`;
    screeningsContent.appendChild(screeningsListItem);
  });
});
