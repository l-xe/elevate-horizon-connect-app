export async function fetchEvents() {
  const response = await fetch("https://grmobile.onrender.com/events");
  return response.json();
}
