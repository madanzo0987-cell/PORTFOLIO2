// public/script.js
document.getElementById("feedbackForm").addEventListener("submit", sendData);

function sendData(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // ⚡ Use your Render backend URL here
    const API_URL = "https://portfolio2-2-gs78.onrender.com/users"; 

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
    })
    .then(data => {
        alert(data.message || "Feedback sent ✅");
        document.getElementById("feedbackForm").reset();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Error sending feedback");
    });
}
