export const postRegistration = async (eventId, userName, userEmail) => {
  const response = await fetch("https://grmobile.onrender.com/registrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId: eventId.toString(),
      name: userName,
      email: userEmail,
    }),
  });
  return response.json();
};

export const registerForEvent = async (eventId, userName, userEmail) => {
  return new Promise(async (resolve) => {
    try {
      await postRegistration(eventId, userName, userEmail).then(() => {
        resolve({ success: true, message: "Registration Successful" });
      });
    } catch (error) {
      resolve({ success: false, message: "Registration Unsuccessful" });
    }
  });
};

export const getRegistrationsForEvent = async (eventId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const eventRegs = registrations.filter((r) => r.eventId === eventId);
      resolve(eventRegs);
    }, 300);
  });
};
