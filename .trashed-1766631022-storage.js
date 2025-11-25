/* storage.js – single source of truth for Testy
 *
 * Functions used in your pages:
 *  - createAccount(email, password)
 *  - loginUser(email, password)
 *  - logoutUser()
 *  - getActiveUser()
 *  - saveUserProfile(partialProfile)
 *  - getStatsForUser(userId)
 *  - recordAttempt(userId, mode, key, isCorrect)   // mode = "chapter" | "paper"
 *  - exportUserData(userId)
 *  - importUserData(jsonText)
 */

const TESTY_USERS_KEY = "testy_users_v1"; // all user accounts + profile fields
const TESTY_STATS_KEY = "testy_stats_v1"; // quiz stats
const TESTY_ACTIVE_KEY = "testy_active_user_v1"; // current user id
const TESTY_BACKUP_VER = 1;

/* ------------ small helpers ------------ */

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v == null ? fallback : v;
  } catch (_) {
    return fallback;
  }
}

function loadUsers() {
  return safeParse(localStorage.getItem(TESTY_USERS_KEY), {});
}

function saveUsers(users) {
  localStorage.setItem(TESTY_USERS_KEY, JSON.stringify(users));
}

function loadStats() {
  return safeParse(localStorage.getItem(TESTY_STATS_KEY), {});
}

function saveStats(stats) {
  localStorage.setItem(TESTY_STATS_KEY, JSON.stringify(stats));
}

function setActiveUserId(id) {
  if (id) {
    localStorage.setItem(TESTY_ACTIVE_KEY, id);
  } else {
    localStorage.removeItem(TESTY_ACTIVE_KEY);
  }
}

function getActiveUserId() {
  return localStorage.getItem(TESTY_ACTIVE_KEY) || null;
}

/* ------------ accounts / profile ------------ */

function createAccount(email, password) {
  const users = loadUsers();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  
  // no empty email
  if (!normalizedEmail) {
    return { success: false, message: "Email is required." };
  }
  
  // unique email
  const exists = Object.values(users).some(
    (u) => u.email && u.email.toLowerCase() === normalizedEmail
  );
  if (exists) {
    return { success: false, message: "An account with this email already exists." };
  }
  
  const id = "u_" + Date.now() + "_" + Math.floor(Math.random() * 1e6);
  
  const user = {
    id,
    email: normalizedEmail,
    password: String(password || ""),
    name: "",
    avatar: null, // data URL when you add avatar
    createdAt: Date.now()
  };
  
  users[id] = user;
  saveUsers(users);
  setActiveUserId(id);
  
  return { success: true, user };
}

function loginUser(email, password) {
  const users = loadUsers();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const pwd = String(password || "");
  
  const user = Object.values(users).find(
    (u) =>
    u.email &&
    u.email.toLowerCase() === normalizedEmail &&
    u.password === pwd
  );
  
  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }
  
  setActiveUserId(user.id);
  return { success: true, user };
}

function logoutUser() {
  setActiveUserId(null);
}

function getActiveUser() {
  const users = loadUsers();
  const id = getActiveUserId();
  if (!id || !users[id]) return null;
  return users[id];
}

// called from auth.html and profile.html after editing profile fields
function saveUserProfile(partialProfile) {
  const users = loadUsers();
  const id = getActiveUserId();
  if (!id || !users[id]) return { success: false, message: "No active user." };
  
  const current = users[id];
  
  const updated = {
    ...current,
    ...partialProfile,
  };
  
  // never lose these core fields
  updated.id = current.id;
  updated.email = current.email;
  updated.password = current.password;
  if (!updated.createdAt) updated.createdAt = current.createdAt || Date.now();
  
  users[id] = updated;
  saveUsers(users);
  
  return { success: true, user: updated };
}

/* ------------ quiz stats ------------ */
/* stats structure:
 * {
 *   [userId]: {
 *     chapters: { [chapterTitle]: { attempts, correct, incorrect } },
 *     papers:   { [paperTitle]:   { attempts, correct, incorrect } }
 *   }
 * }
 */

function recordAttempt(userId, mode, key, isCorrect) {
  if (!userId || !mode || !key) return;
  const stats = loadStats();
  
  if (!stats[userId]) {
    stats[userId] = { chapters: {}, papers: {} };
  }
  
  const bucketName = mode === "paper" ? "papers" : "chapters";
  const userStats = stats[userId];
  if (!userStats[bucketName]) {
    userStats[bucketName] = {};
  }
  
  if (!userStats[bucketName][key]) {
    userStats[bucketName][key] = { attempts: 0, correct: 0, incorrect: 0 };
  }
  
  const entry = userStats[bucketName][key];
  entry.attempts += 1;
  if (isCorrect) {
    entry.correct += 1;
  } else {
    entry.incorrect += 1;
  }
  
  saveStats(stats);
}

function getStatsForUser(userId) {
  const stats = loadStats();
  if (!userId || !stats[userId]) {
    return { chapters: {}, papers: {} };
  }
  return stats[userId];
}

/* ------------ export / import ------------ */

/**
 * exportUserData(userId)
 * Used in profile-view.html
 * Returns a plain JS object which profile-view then stringifies.
 */
function exportUserData(userId) {
  const users = loadUsers();
  const stats = loadStats();
  
  const user = users[userId];
  if (!user) {
    return null;
  }
  
  const userStats = stats[userId] || { chapters: {}, papers: {} };
  
  return {
    version: TESTY_BACKUP_VER,
    user: user,
    stats: userStats,
  };
}

/**
 * importUserData(jsonText)
 * Used in profile-view.html and auth.html
 * Accepts a JSON string (contents of the backup file).
 * On success:
 *  - merges user + stats into localStorage
 *  - sets imported user as the active user
 *  - returns { success: true, user }
 * On failure: throws an Error (caught by the caller).
 */
function importUserData(jsonText) {
  let data;
  try {
    data = JSON.parse(jsonText);
  } catch (e) {
    throw new Error("File is not valid JSON.");
  }
  
  if (!data || typeof data !== "object") {
    throw new Error("Backup format not recognised.");
  }
  
  if (data.version !== TESTY_BACKUP_VER) {
    throw new Error("Backup version not supported.");
  }
  
  if (!data.user || !data.user.id || !data.user.email) {
    throw new Error("Backup does not contain valid user data.");
  }
  
  const user = data.user;
  const userId = user.id;
  
  const users = loadUsers();
  const stats = loadStats();
  
  // merge / overwrite this user
  users[userId] = {
    id: userId,
    email: String(user.email).toLowerCase(),
    password: user.password || "",
    name: user.name || "",
    avatar: user.avatar || null,
    createdAt: user.createdAt || Date.now()
  };
  
  stats[userId] = data.stats && typeof data.stats === "object" ?
    {
      chapters: data.stats.chapters || {},
      papers: data.stats.papers || {}
    } :
    { chapters: {}, papers: {} };
  
  saveUsers(users);
  saveStats(stats);
  setActiveUserId(userId);
  
  return { success: true, user: users[userId] };
}