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

export async function uploadPhoto(formData, token) {
  const res = await fetch(`${API_URL}/photos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // IMPORTANT: no JSON, no content-type
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Upload failed");
  }

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