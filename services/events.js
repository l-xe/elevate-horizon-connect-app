export default function fetchEvents() {
  return fetch("https://grmobile.onrender.com/events")
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}
