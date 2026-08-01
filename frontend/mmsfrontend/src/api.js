// Centralized API helper for the MMS frontend
export const API = 'http://localhost:5000';

// Build headers with optional Authorization token for protected endpoints
export const getAuthHeaders = (json = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (json) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
};

// Utility to normalize a Prisma Event record to the legacy field names the UI expects
export const normalizeEvent = (ev) => ({
  ...ev,
  _id: ev.id,
  eventName: ev.title,
  eventDescription: ev.description,
  eventRegistrationLink: ev.registrationLink,
  eventImage: ev.image,
});

// Utility to normalize a Prisma Announcement record to legacy field names
export const normalizeAnnouncement = (a) => ({
  ...a,
  _id: a.id,
  announcementTitle: a.title,
  announcementDetails: a.details,
});

// Utility to normalize a Prisma Member record to include legacy _id alias
export const normalizeMember = (m) => ({
  ...m,
  _id: m.id,
});

// Utility to normalize a Prisma PaymentInfo record to include legacy _id alias
export const normalizePaymentOption = (p) => ({
  ...p,
  _id: p.id,
});

