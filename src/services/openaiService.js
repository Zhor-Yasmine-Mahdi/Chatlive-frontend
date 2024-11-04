import axios from "axios";

const getAIResponse = async (message) => {
  try {
    const response = await axios.post("http://localhost:5000/api/chat/ai-response", { message });
    return response.data.aiResponse;
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    return "Error: Unable to fetch response from AI.";
  }
};

export default getAIResponse;
