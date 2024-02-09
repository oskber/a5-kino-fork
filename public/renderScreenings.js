async function fetchScreenings() {
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(`/api/movies/${id}/screenings`);
  const payload = await response.json();
  return payload;
}

const screeningTitle = document.querySelector("#screenings__title");
screeningTitle.innerText = "Kommande visningar för denna film";
const screeningsContent = document.querySelector("#screenings__content");
fetchScreenings().then((payload) => {
  payload.forEach((element) => {
    const startTime = element.attributes.start_time.slice(0, -8);
    const startTimes = startTime.split("T");
    const screeningsListItem = document.createElement("li");
    screeningsListItem.innerText = `${startTimes[0]} ${startTimes[1]} - Salong: ${element.attributes.room}`;
    screeningsContent.appendChild(screeningsListItem);
  });
});
