const launcher = document.getElementById("chat-launcher");
const chatbot = document.getElementById("chatbot");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-icon");

const apiKey =
  ""; // Replace with your actual API key

// Show chatbot
launcher.addEventListener("click", () => {
  chatbot.style.display = "flex";
  launcher.style.display = "none";
});

// Hide chatbot on outside click
document.addEventListener("click", (e) => {
  const isClickInside =
    chatbot.contains(e.target) || launcher.contains(e.target);
  if (!isClickInside && chatbot.style.display === "flex") {
    chatbot.style.display = "none";
    launcher.style.display = "block";
  }
});

// Send message to OpenAI and display messages
async function sendMessage(userMessage) {
  const userDiv = document.createElement("div");
  userDiv.className = "message user-message";
  userDiv.innerHTML = `
    <img src="./icons/avatar.png" class="avatar" alt="User" />
    <span>${userMessage}</span>
  `;
  messagesDiv.appendChild(userDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a friendly, knowledgeable, and professional virtual assistant for a company named "Rankingeek Marketing Agency" (https://www.rankingeek.com). Your job is to greet visitors warmly, provide helpful and accurate information about Rankingeek's services, and maintain a conversational, human-like tone.
  
  Rankingeek specializes in digital marketing, including:
  - Search Engine Optimization (SEO)
  - Pay-Per-Click (PPC) advertising
  - Social Media Marketing (SMM)
  - Content Marketing
  - Website Design & Development
  - Branding and Graphic Design
  - Email Marketing
  - AI-powered business tools
  
  Always introduce yourself as the Rankingeek Assistant. Keep your responses clear and professional, but friendly. If a user asks something unrelated to Rankingeek or its services, politely redirect the conversation by saying something like, "I'm here to help with anything related to Rankingeek's services. Could you please ask something about our offerings?"`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    const reply =
      data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

    const botDiv = document.createElement("div");
    botDiv.className = "message bot-message";
    botDiv.innerHTML = `
      <img src="./icons/botlogo.png" class="avatar" alt="Bot" />
      <span>${reply}</span>
    `;
    messagesDiv.appendChild(botDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);

    const botDiv = document.createElement("div");
    botDiv.className = "message bot-message";
    botDiv.innerHTML = `
      <img src="./icons/chat.png" class="avatar" alt="Bot" />
      <span>Sorry, something went wrong while contacting our assistant.</span>
    `;
    messagesDiv.appendChild(botDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Send on click
sendBtn.addEventListener("click", () => {
  const message = input.value.trim();
  if (message) {
    input.value = "";
    sendMessage(message);
  }
});

// Send on Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const message = input.value.trim();
    input.value = "";
    sendMessage(message);
  }
});
