document.getElementById("signin-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      email,
      password,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.access_token);
    document.getElementById("auth-message-register").innerText = "Signed in!";
    document.getElementById("admin-section").classList.remove("hidden");
  } else {
    document.getElementById(
      "auth-message-register"
    ).innerText = `Sign-in failed: ${data.message}`;
  }
});

document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("emailSignIn").value;
  const password = document.getElementById("passwordSignIn").value;

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.access_token);
    document.getElementById("auth-message-login").innerText = "Signed in!";
    document.getElementById("admin-section").classList.remove("hidden");
  } else {
    document.getElementById(
      "auth-message-login"
    ).innerText = `Sign-in failed: ${data.message}`;
  }
});

document
  .getElementById("fetch-rules-btn")
  .addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Not authorized");

    const response = await fetch("http://localhost:3000/coupon-rules", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (response.ok) {
      const list = document.getElementById("rules-list");
      list.innerHTML = "";
      data.forEach((rule) => {
        const li = document.createElement("li");
        li.innerText = `${rule.name} - ID ${rule.id}`;
        list.appendChild(li);
      });
      document.getElementById("public-section").classList.remove("hidden");
    } else {
      alert("Failed to fetch rules");
    }
  });

document
  .getElementById("check-coupon-btn")
  .addEventListener("click", async () => {
    const ruleId = document.getElementById("coupon-id").value;

    const response = await fetch("http://localhost:3000/coupon-checks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rule_id: ruleId }),
    });

    const data = await response.json();
    document.getElementById("coupon-message").innerText =
      data.message || "Invalid coupon.";
  });
