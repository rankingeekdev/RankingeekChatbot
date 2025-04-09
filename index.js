const launcher = document.getElementById("chat-launcher");
const chatbot = document.getElementById("chatbot");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-icon");

launcher.addEventListener("click", () => {
  chatbot.style.display = "block";
  launcher.style.display = "none"; // Hide chat icon after opening
});
