// src/api/api.js
const API_URL = import.meta.env.VITE_API_URL || "https://photoapp-api-mussawirali-axemgqaehchccwes.swedencentral-01.azurewebsites.net/";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---------- AUTH ----------
export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Invalid email or password");
  return res.json();
}


// ---------- PHOTOS ----------
export async function getPhotos(search) {
  let url = `${API_URL}/photos`;
  if (search) url += `?search=${encodeURIComponent(search)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load photos");
  return res.json();
}


// ------- PHOTO DETAILS --------
export async function getPhotoDetails(id) {
  const res = await fetch(`${API_URL}/photos/${id}`);
  if (!res.ok) throw new Error("Failed to load photo details");
  return res.json();
}

// ------- UPLOAD PHOTO -------
export async function uploadPhoto({ title, description, file }) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not logged in");
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("photo", file); // field name must match backend

  const res = await fetch(`${API_URL}/photos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // DO NOT set Content-Type here, browser will set the boundary for FormData
    },
    body: formData,
  });

  if (!res.ok) {
    let msg = "Upload failed";

    // Try to read JSON error once
    try {
      const data = await res.json();
      if (data && data.message) {
        msg = data.message;
      }
    } catch (e) {
      // If JSON parsing fails, we just stick with the default message.
      // Don't call res.text() here – body can only be read once.
    }

    throw new Error(msg);
  }

  // Success path – read body once as JSON
  return res.json();
}



// ------- COMMENTS -------
export async function getComments(id) {
  const res = await fetch(`${API_URL}/photos/${id}/comments`);
  if (!res.ok) throw new Error("Failed to load comments");
  return res.json();
}

export async function addComment(id, comment, token) {
  const res = await fetch(`${API_URL}/photos/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
}

// ------- RATINGS -------
export async function getRatings(id) {
  const res = await fetch(`${API_URL}/photos/${id}/ratings`);
  if (!res.ok) throw new Error("Failed to load ratings");
  return res.json();
}

export async function addRating(id, score, comment, token) {
  const res = await fetch(`${API_URL}/photos/${id}/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ score, comment }),
  });
  if (!res.ok) throw new Error("Failed to submit rating");
  return res.json();
}