const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("https://YOUR-RENDER-URL.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    alert(data.message);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message");
  }
});
