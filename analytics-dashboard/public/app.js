/**
 * ============================================================================
 * Analytics Dashboard — Client-Side Application Logic
 * ============================================================================
 *
 * Responsibilities:
 *   1. Fetch summary stats and all table data from the Express API.
 *   2. Render summary cards and data tables.
 *   3. Manage tab switching.
 *   4. Auto-refresh data every 30 seconds.
 *   5. Format dates into human-readable strings.
 *
 * All DOM element IDs referenced here are defined in index.html.
 * ============================================================================
 */

/* ── Configuration ──────────────────────────────────────────────────────── */

/** How often (in milliseconds) the dashboard re-fetches data from the API */
const AUTO_REFRESH_INTERVAL_MS = 30_000;

/* ── DOM References ─────────────────────────────────────────────────────── */

/** The "last refreshed at" badge in the header */
const elLastRefresh = document.getElementById("last-refresh");

/** Manual refresh button */
const elBtnRefresh = document.getElementById("btn-refresh");

/** Tab buttons */
const elTabs = document.querySelectorAll(".tab");

/** Tab panels */
const elPanels = document.querySelectorAll(".panel");

/**
 * In-memory cache of the latest chat messages array so the modal can
 * look up full content by index without re-fetching.
 */
let cachedChatMessages = [];

/* ── Utility Helpers ────────────────────────────────────────────────────── */

/**
 * Formats an ISO-8601 timestamp into a concise, locale-aware string.
 *
 * @param {string|null} isoString — The ISO timestamp to format.
 * @returns {string} — A human-readable date/time string, or "—" if null.
 */
function formatDate(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Safely escapes HTML to prevent XSS when inserting untrusted data into
 * the DOM via innerHTML.
 *
 * @param {string|null|undefined} str — The raw string to escape.
 * @returns {string} — The HTML-escaped string, or "—" if falsy.
 */
function esc(str) {
  if (!str) return "—";
  const el = document.createElement("span");
  el.textContent = str;
  return el.innerHTML;
}

/**
 * Truncates a string to the given length and appends an ellipsis if it
 * was longer.
 *
 * @param {string|null} str — The string to truncate.
 * @param {number} maxLen — Maximum allowed length before truncation.
 * @returns {string} — The (possibly truncated) string.
 */
function truncate(str, maxLen = 80) {
  if (!str) return "—";
  return str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
}

/* ── Data Fetching ──────────────────────────────────────────────────────── */

/**
 * Fetches JSON from an API route with basic error handling.
 *
 * @param {string} url — The URL to fetch.
 * @returns {Promise<any>} — The parsed JSON response.
 */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API ${url} returned ${res.status}`);
  }
  return res.json();
}

/**
 * Fetches all data (stats + each table) in parallel and renders
 * the dashboard.  Called on page load and every AUTO_REFRESH_INTERVAL_MS.
 */
async function refreshAllData() {
  try {
    /* Fire all five requests in parallel */
    const [stats, visitors, visits, contacts, chatMessages, newsletter] = await Promise.all(
      [
        fetchJSON("/api/stats"),
        fetchJSON("/api/visitors"),
        fetchJSON("/api/visits"),
        fetchJSON("/api/contacts"),
        fetchJSON("/api/chat-messages"),
        fetchJSON("/api/newsletter-subscribers"),
      ]
    );

    /* Render summary cards */
    renderStats(stats);

    /* Render each data table */
    renderVisitors(visitors);
    renderVisits(visits);
    renderContacts(contacts);
    renderChatMessages(chatMessages);
    renderNewsletter(newsletter);

    /* Update "last refreshed" badge */
    elLastRefresh.textContent =
      "Updated " +
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
  } catch (err) {
    console.error("Failed to refresh dashboard data:", err);
    elLastRefresh.textContent = "⚠ Refresh failed";
  }
}

/* ── Rendering Functions ────────────────────────────────────────────────── */

/**
 * Populates the four summary cards with their respective counts.
 *
 * @param {{ visitors: number, visits: number, contacts: number, chatMessages: number }} stats
 */
function renderStats(stats) {
  document.getElementById("stat-visitors").textContent = stats.visitors;
  document.getElementById("stat-visits").textContent = stats.visits;
  document.getElementById("stat-contacts").textContent = stats.contacts;
  document.getElementById("stat-chatMessages").textContent = stats.chatMessages;
  document.getElementById("stat-newsletter").textContent = stats.newsletter;
}

/**
 * Renders the Visitors table body.
 *
 * @param {Array} rows — Visitor records from the API.
 */
function renderVisitors(rows) {
  const tbody = document.querySelector("#table-visitors tbody");
  const emptyState = document.querySelector("#panel-visitors .empty-state");

  if (!rows.length) {
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  tbody.innerHTML = rows
    .map(
      (r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td title="${esc(r.fingerprint)}">${esc(truncate(r.fingerprint, 24))}</td>
      <td>${r.visit_count ?? 0}</td>
      <td>${formatDate(r.first_seen_at)}</td>
      <td>${formatDate(r.last_seen_at)}</td>
    </tr>`
    )
    .join("");
}

/**
 * Renders the Visits table body.
 *
 * @param {Array} rows — Visit records from the API.
 */
function renderVisits(rows) {
  const tbody = document.querySelector("#table-visits tbody");
  const emptyState = document.querySelector("#panel-visits .empty-state");

  if (!rows.length) {
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  tbody.innerHTML = rows
    .map(
      (r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${esc(r.page)}</td>
      <td>${esc(r.locale)}</td>
      <td>${esc(r.browser)}</td>
      <td>${esc(r.os)}</td>
      <td>${esc(r.country)}</td>
      <td>${esc(r.city)}</td>
      <td>${esc(r.ip_address)}</td>
      <td title="${esc(r.referrer)}">${esc(truncate(r.referrer, 30))}</td>
      <td>${formatDate(r.visited_at)}</td>
    </tr>`
    )
    .join("");
}

/**
 * Renders the Contacts table body.
 *
 * @param {Array} rows — Contact records from the API.
 */
function renderContacts(rows) {
  const tbody = document.querySelector("#table-contacts tbody");
  const emptyState = document.querySelector("#panel-contacts .empty-state");

  if (!rows.length) {
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  tbody.innerHTML = rows
    .map(
      (r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${esc(r.name)}</td>
      <td>${esc(r.email)}</td>
      <td>${esc(r.company)}</td>
      <td title="${esc(r.message)}">${esc(truncate(r.message, 60))}</td>
      <td>${formatDate(r.submitted_at)}</td>
    </tr>`
    )
    .join("");
}

/**
 * Renders the Chat Messages table body.
 *
 * @param {Array} rows — Chat message records from the API.
 */
function renderChatMessages(rows) {
  const tbody = document.querySelector("#table-chats tbody");
  const emptyState = document.querySelector("#panel-chats .empty-state");

  if (!rows.length) {
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  /* Cache messages so the modal can access full content by index */
  cachedChatMessages = rows;

  tbody.innerHTML = rows
    .map(
      (r, i) => `
    <tr class="clickable-row" data-chat-index="${i}">
      <td>${i + 1}</td>
      <td>
        <span class="role-badge ${r.role === "user" ? "role-user" : "role-assistant"}">
          ${esc(r.role)}
        </span>
      </td>
      <td title="Click to view full message">${esc(truncate(r.content, 80))}</td>
      <td>${esc(r.page)}</td>
      <td>${esc(r.locale)}</td>
      <td title="${esc(r.session_id)}">${esc(truncate(r.session_id, 12))}</td>
      <td>${formatDate(r.sent_at)}</td>
    </tr>`
    )
    .join("");

  /* Attach click handlers to each chat row */
  tbody.querySelectorAll(".clickable-row").forEach((row) => {
    row.addEventListener("click", () => {
      const idx = parseInt(row.dataset.chatIndex, 10);
      openChatModal(cachedChatMessages[idx]);
    });
  });
}

/**
 * Renders the Newsletter Subscribers table body.
 *
 * @param {Array} rows — Newsletter subscriber records from the API.
 */
function renderNewsletter(rows) {
  const tbody = document.querySelector("#table-newsletter tbody");
  const emptyState = document.querySelector("#panel-newsletter .empty-state");

  if (!rows.length) {
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  tbody.innerHTML = rows
    .map(
      (r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${esc(r.email)}</td>
      <td>${esc(r.locale)}</td>
      <td>${formatDate(r.subscribed_at)}</td>
    </tr>`
    )
    .join("");
}

/* ── Tab Switching ──────────────────────────────────────────────────────── */

/**
 * Map of tab `data-tab` values to the panel element IDs they control.
 */
const TAB_PANEL_MAP = {
  visitors: "panel-visitors",
  visits: "panel-visits",
  contacts: "panel-contacts",
  chats: "panel-chats",
  newsletter: "panel-newsletter",
};

/**
 * Activates the requested tab and shows its associated panel.
 *
 * @param {string} tabName — The `data-tab` attribute value to activate.
 */
function switchTab(tabName) {
  /* Deactivate all tabs and panels */
  elTabs.forEach((t) => t.classList.remove("active"));
  elPanels.forEach((p) => p.classList.remove("active"));

  /* Activate the selected tab */
  const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
  if (activeTab) activeTab.classList.add("active");

  /* Show the corresponding panel */
  const activePanel = document.getElementById(TAB_PANEL_MAP[tabName]);
  if (activePanel) activePanel.classList.add("active");
}

/* ── Chat Message Detail Modal ──────────────────────────────────────── */

/**
 * Opens a modal overlay showing the full content of a chat message.
 *
 * @param {object} msg — A chat_messages row from the API.
 */
function openChatModal(msg) {
  if (!msg) return;

  /* Build modal HTML */
  const roleClass = msg.role === "user" ? "role-user" : "role-assistant";
  const html = `
    <div class="modal-overlay" id="detail-modal">
      <div class="modal-panel">
        <div class="modal-header">
          <h2>
            <span class="role-badge ${roleClass}">${esc(msg.role)}</span>
            Chat Message
          </h2>
          <button class="modal-close" id="modal-close-btn" title="Close">✕</button>
        </div>
        <dl class="modal-meta">
          <dt>Page</dt>   <dd>${esc(msg.page)}</dd>
          <dt>Locale</dt> <dd>${esc(msg.locale)}</dd>
          <dt>Session</dt><dd>${esc(msg.session_id)}</dd>
          <dt>Sent at</dt><dd>${formatDate(msg.sent_at)}</dd>
        </dl>
        <div class="modal-content">${esc(msg.content)}</div>
      </div>
    </div>`;

  /* Insert into DOM */
  document.body.insertAdjacentHTML("beforeend", html);

  /* Close on button click, overlay click, or Escape key */
  const overlay = document.getElementById("detail-modal");
  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", handleModalEscape);
}

/**
 * Removes the detail modal from the DOM.
 */
function closeModal() {
  const overlay = document.getElementById("detail-modal");
  if (overlay) overlay.remove();
  document.removeEventListener("keydown", handleModalEscape);
}

/**
 * Keyboard handler that closes the modal when Escape is pressed.
 */
function handleModalEscape(e) {
  if (e.key === "Escape") closeModal();
}

/* ── Event Listeners ────────────────────────────────────────────────────── */

/* Tab click handler */
elTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchTab(tab.dataset.tab);
  });
});

/**
 * Summary card click handler — clicking a card switches to its
 * corresponding tab panel (e.g. clicking "Visitors" card opens the
 * Visitors table).
 */
document.querySelectorAll(".card[data-tab]").forEach((card) => {
  card.addEventListener("click", () => {
    switchTab(card.dataset.tab);
  });
});

/* Manual refresh button */
elBtnRefresh.addEventListener("click", () => {
  refreshAllData();
});

/* ── Initialisation ─────────────────────────────────────────────────────── */

/* Fetch data immediately on page load */
refreshAllData();

/* Set up auto-refresh interval */
setInterval(refreshAllData, AUTO_REFRESH_INTERVAL_MS);
