const launcher = document.getElementById("chat-launcher");
const chatbot = document.getElementById("chatbot");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-icon");

// Replace with your actual OpenAI API Key
const apiKey = "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";

// Show chatbot and hide launcher
launcher.addEventListener("click", () => {
  chatbot.style.display = "flex";
  launcher.style.display = "none";
});

// Send message function
async function sendMessage(userMessage) {
  // User message
  const userDiv = document.createElement("div");
  userDiv.className = "message user-message";
  userDiv.innerHTML = `
    <img src="./icons/avatar.png" class="avatar" alt="User" />
    <span>${userMessage}</span>
  `;
  messagesDiv.appendChild(userDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Fetch GPT response
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
  const reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

  // Bot message
  const botDiv = document.createElement("div");
  botDiv.className = "message bot-message";
  botDiv.innerHTML = `
    <img src="./icons/admin.png" class="avatar" alt="Bot" />
    <span>${reply}</span>
  `;
  messagesDiv.appendChild(botDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send via button
sendBtn.addEventListener("click", () => {
  const message = input.value.trim();
  if (message) {
    input.value = "";
    sendMessage(message);
  }
});

// Send via Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const message = input.value.trim();
    input.value = "";
    sendMessage(message);
  }
});
