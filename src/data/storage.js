/**
 * Local Data Service Layer for RRR Centre.
 * Manages form submissions, marketplace listings, and Admin operations in local storage.
 * Clearly marked with TODO comments for backend API integration in Stages 4 & 5.
 */

import { initialMarketplaceListings } from './sampleListings';
import { generateReferenceNumber } from '../utils/referenceGenerator';

const STORAGE_KEYS = {
  DONATIONS: 'rrr_donations_list',
  ENQUIRIES: 'rrr_enquiries_list',
  CONTACT_MESSAGES: 'rrr_contact_messages',
  JOB_APPLICATIONS: 'rrr_job_applications'
};

// Safe localStorage helpers
function getStoredArray(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function saveStoredArray(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

/**
 * Save a new donation or for-sale listing.
 */
export async function saveDonation(formData) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const referenceNumber = generateReferenceNumber();
  const newSubmission = {
    ...formData,
    id: `item-${Date.now()}`,
    refNumber: referenceNumber,
    submittedAt: new Date().toISOString(),
    status: 'pending_dropoff', // 'pending_dropoff' | 'received' | 'rehomed'
    dateAdded: new Date().toISOString().split('T')[0]
  };

  // TODO: [Backend Integration - Stage 4/5]
  // POST /api/v1/donations
  const currentDonations = getStoredArray(STORAGE_KEYS.DONATIONS, []);
  currentDonations.unshift(newSubmission);
  saveStoredArray(STORAGE_KEYS.DONATIONS, currentDonations);

  return {
    success: true,
    referenceNumber,
    item: newSubmission
  };
}

/**
 * Retrieve all marketplace listings (sample items + user approved submissions).
 */
export async function getMarketplaceListings() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  // TODO: [Backend Integration - Stage 4/5]
  // GET /api/v1/marketplace?status=available
  const userDonations = getStoredArray(STORAGE_KEYS.DONATIONS, []);
  
  // Format user donations so they conform to listing cards
  const userListings = userDonations.map((item) => ({
    id: item.id,
    refNumber: item.refNumber,
    title: {
      en: item.itemName,
      mr: item.itemName,
      hi: item.itemName
    },
    category: item.category,
    condition: item.condition,
    isDonation: item.intent === 'donate',
    price: item.intent === 'sell' ? Number(item.price || 0) : 0,
    quantity: Number(item.quantity || 1),
    village: item.village,
    dropoffPoint: 'btr-nagarpalika',
    dropoffPointNameKey: 'points.point1Title',
    description: {
      en: item.description,
      mr: item.description,
      hi: item.description
    },
    dateAdded: item.dateAdded,
    imageUrl: item.photoDataUrl || null
  }));

  return [...userListings, ...initialMarketplaceListings];
}

/**
 * Save an enquiry about a marketplace item.
 */
export async function saveItemEnquiry(enquiryData) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const enquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    status: 'pending', // 'pending' | 'contacted' | 'resolved'
    createdAt: new Date().toISOString()
  };

  // TODO: [Backend Integration - Stage 4/5]
  // POST /api/v1/enquiries
  const currentEnquiries = getStoredArray(STORAGE_KEYS.ENQUIRIES, []);
  currentEnquiries.unshift(enquiry);
  saveStoredArray(STORAGE_KEYS.ENQUIRIES, currentEnquiries);

  return { success: true, enquiryId: enquiry.id };
}

/**
 * Save a general contact message.
 */
export async function saveContactMessage(contactData) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const message = {
    ...contactData,
    id: `msg-${Date.now()}`,
    status: 'new', // 'new' | 'replied' | 'closed'
    createdAt: new Date().toISOString()
  };

  // TODO: [Backend Integration - Stage 4/5]
  // POST /api/v1/contact-messages
  const currentMessages = getStoredArray(STORAGE_KEYS.CONTACT_MESSAGES, []);
  currentMessages.unshift(message);
  saveStoredArray(STORAGE_KEYS.CONTACT_MESSAGES, currentMessages);

  return { success: true, messageId: message.id };
}

/**
 * Save a job or volunteer interest submission.
 */
export async function saveJobApplication(jobData) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const application = {
    ...jobData,
    id: `job-${Date.now()}`,
    status: 'review', // 'review' | 'shortlisted' | 'assigned'
    appliedAt: new Date().toISOString()
  };

  // TODO: [Backend Integration - Stage 4/5]
  // POST /api/v1/job-applications
  const currentApps = getStoredArray(STORAGE_KEYS.JOB_APPLICATIONS, []);
  currentApps.unshift(application);
  saveStoredArray(STORAGE_KEYS.JOB_APPLICATIONS, currentApps);

  return { success: true, applicationId: application.id };
}

/**
 * Admin: Get all items for management.
 */
export async function getAdminDonations() {
  const userDonations = getStoredArray(STORAGE_KEYS.DONATIONS, []);
  return userDonations;
}

/**
 * Admin: Update item status (pending_dropoff, received, rehomed).
 */
export async function updateDonationStatus(itemId, newStatus) {
  const donations = getStoredArray(STORAGE_KEYS.DONATIONS, []);
  const updated = donations.map((item) =>
    item.id === itemId ? { ...item, status: newStatus } : item
  );
  saveStoredArray(STORAGE_KEYS.DONATIONS, updated);
  return { success: true };
}

/**
 * Admin: Delete a donation listing.
 */
export async function deleteDonation(itemId) {
  const donations = getStoredArray(STORAGE_KEYS.DONATIONS, []);
  const filtered = donations.filter((item) => item.id !== itemId);
  saveStoredArray(STORAGE_KEYS.DONATIONS, filtered);
  return { success: true };
}

/**
 * Admin: Get all item enquiries.
 */
export async function getAdminEnquiries() {
  return getStoredArray(STORAGE_KEYS.ENQUIRIES, []);
}

/**
 * Admin: Update enquiry status.
 */
export async function updateEnquiryStatus(enquiryId, newStatus) {
  const enquiries = getStoredArray(STORAGE_KEYS.ENQUIRIES, []);
  const updated = enquiries.map((enq) =>
    enq.id === enquiryId ? { ...enq, status: newStatus } : enq
  );
  saveStoredArray(STORAGE_KEYS.ENQUIRIES, updated);
  return { success: true };
}

/**
 * Admin: Get all job applications.
 */
export async function getAdminJobApplications() {
  return getStoredArray(STORAGE_KEYS.JOB_APPLICATIONS, []);
}

/**
 * Admin: Update job application status.
 */
export async function updateJobApplicationStatus(jobId, newStatus) {
  const apps = getStoredArray(STORAGE_KEYS.JOB_APPLICATIONS, []);
  const updated = apps.map((app) =>
    app.id === jobId ? { ...app, status: newStatus } : app
  );
  saveStoredArray(STORAGE_KEYS.JOB_APPLICATIONS, updated);
  return { success: true };
}

/**
 * Admin: Get all contact messages.
 */
export async function getAdminContactMessages() {
  return getStoredArray(STORAGE_KEYS.CONTACT_MESSAGES, []);
}

/**
 * Admin: Update contact message status.
 */
export async function updateContactStatus(msgId, newStatus) {
  const msgs = getStoredArray(STORAGE_KEYS.CONTACT_MESSAGES, []);
  const updated = msgs.map((msg) =>
    msg.id === msgId ? { ...msg, status: newStatus } : msg
  );
  saveStoredArray(STORAGE_KEYS.CONTACT_MESSAGES, updated);
  return { success: true };
}

/**
 * Admin: Get detailed storage metrics.
 */
export function getStorageMetrics() {
  const donations = getStoredArray(STORAGE_KEYS.DONATIONS, []);
  const received = donations.filter((d) => d.status === 'received').length;
  const rehomed = donations.filter((d) => d.status === 'rehomed').length;
  const pending = donations.filter((d) => d.status === 'pending_dropoff').length;

  return {
    donationsCount: donations.length,
    receivedCount: received,
    rehomedCount: rehomed,
    pendingCount: pending,
    enquiriesCount: getStoredArray(STORAGE_KEYS.ENQUIRIES, []).length,
    contactsCount: getStoredArray(STORAGE_KEYS.CONTACT_MESSAGES, []).length,
    jobsCount: getStoredArray(STORAGE_KEYS.JOB_APPLICATIONS, []).length
  };
}
