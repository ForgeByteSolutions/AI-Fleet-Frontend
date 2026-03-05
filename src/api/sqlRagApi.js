const BASE_URL = "http://192.168.0.158:8000";

export const askSqlRag = async (question, sessionId = null) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${BASE_URL}/api/v1/sql-rag/ask`, {
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
    try {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Server responded with ${response.status}`);
    } catch (e) {
      if (e.message.includes("Server responded with") || e.message.includes("An error occurred")) throw e;
      throw new Error(`SQL-RAG request failed with status ${response.status}`);
    }
  }

  return response.json();
};

export const getSqlRagHistory = async () => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${BASE_URL}/api/v1/sql-rag/history`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch SQL-RAG history");
  }

  return response.json();
};
