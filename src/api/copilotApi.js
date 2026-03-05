const BASE_URL = "http://192.168.0.158:8000";

export const askCopilot = async (question, sessionId = null) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${BASE_URL}/copilot/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      question,
      session_id: sessionId
    })
  });

  if (!response.ok) {
    throw new Error("Copilot request failed");
  }

  return response.json();
};

export const getCopilotHistory = async () => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${BASE_URL}/copilot/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch copilot history");
  }

  return response.json();
};