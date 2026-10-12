import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  getStorageMetrics,
  getAdminDonations,
  updateDonationStatus,
  deleteDonation,
  getAdminEnquiries,
  updateEnquiryStatus,
  getAdminContactMessages,
  updateContactStatus,
  getAdminJobApplications,
  updateJobApplicationStatus,
} from '../data/storage';
import {
  Package,
  MessageSquare,
  Briefcase,
  Layers,
  Trash2,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  LayoutDashboard,
  Phone,
  MapPin,
  CalendarDays,
  Tag,
  User,
} from 'lucide-react';

// ── Status badge helper ──────────────────────────────────────────────────────

const STATUS_META = {
  // donations
  pending_dropoff: { label: 'Pending Drop-off', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  received:        { label: 'Received',          color: 'bg-rrr-blue-100 text-rrr-blue-800 border-rrr-blue-300' },
  rehomed:         { label: 'Re-homed ✓',        color: 'bg-rrr-green-100 text-rrr-green-800 border-rrr-green-300' },
  // enquiries / contacts
  pending:         { label: 'Pending',            color: 'bg-amber-100 text-amber-800 border-amber-300' },
  contacted:       { label: 'Contacted',          color: 'bg-rrr-blue-100 text-rrr-blue-800 border-rrr-blue-300' },
  resolved:        { label: 'Resolved ✓',         color: 'bg-rrr-green-100 text-rrr-green-800 border-rrr-green-300' },
  new:             { label: 'New',                color: 'bg-red-100 text-red-800 border-red-300' },
  replied:         { label: 'Replied',            color: 'bg-rrr-blue-100 text-rrr-blue-800 border-rrr-blue-300' },
  closed:          { label: 'Closed ✓',           color: 'bg-gray-100 text-gray-700 border-gray-300' },
  // jobs
  review:          { label: 'Under Review',       color: 'bg-amber-100 text-amber-800 border-amber-300' },
  shortlisted:     { label: 'Shortlisted ★',     color: 'bg-rrr-blue-100 text-rrr-blue-800 border-rrr-blue-300' },
  assigned:        { label: 'Assigned ✓',         color: 'bg-rrr-green-100 text-rrr-green-800 border-rrr-green-300' },
};

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || { label: status, color: 'bg-gray-100 text-gray-700 border-gray-300' };
  return (
    <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${meta.color}`}>
      {meta.label}
    </span>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, value, label, colorClass }) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${colorClass} text-center`}>
      <Icon className="w-5 h-5 mb-1 opacity-70" />
      <p className="text-2xl font-black leading-none">{value}</p>
      <p className="text-[11px] font-semibold mt-1 leading-tight">{label}</p>
    </div>
  );
}

// ── Confirm Delete Dialog ────────────────────────────────────────────────────

function ConfirmDelete({ itemRef, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
          <h3 className="font-black text-rrr-earth-900">Delete this record?</h3>
        </div>
        <p className="text-sm text-gray-700">
          This will permanently delete record <strong>{itemRef}</strong> from local storage.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 min-h-[44px] rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 focus-ring"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 min-h-[44px] rounded-xl border-2 border-gray-300 text-gray-800 font-bold text-sm hover:bg-gray-50 focus-ring"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Donations Tab ────────────────────────────────────────────────────────────

function DonationsTab({ onRefresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getAdminDonations();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatus = async (id, newStatus) => {
    await updateDonationStatus(id, newStatus);
    load();
    onRefresh();
  };

  const handleDelete = async () => {
    await deleteDonation(deleteTarget.id);
    setDeleteTarget(null);
    load();
    onRefresh();
  };

  if (loading) return <p className="text-center py-10 text-gray-500 text-sm">Loading donations…</p>;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <Package className="w-10 h-10 text-gray-300 mx-auto" />
        <p className="text-gray-500 text-sm">No donation or sale submissions yet.</p>
      </div>
    );
  }

  return (
    <>
      {deleteTarget && (
        <ConfirmDelete
          itemRef={deleteTarget.refNumber}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <p className="font-black text-rrr-earth-900 text-sm">{item.itemName}</p>
                <p className="text-[11px] text-gray-500 font-mono">{item.refNumber}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${item.intent === 'donate' ? 'bg-rrr-green-100 text-rrr-green-800 border-rrr-green-300' : 'bg-orange-100 text-orange-800 border-orange-300'}`}>
                  {item.intent === 'donate' ? 'Donation' : `Sell ₹${item.price}`}
                </span>
                <StatusBadge status={item.status} />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
              <span className="flex items-center gap-1"><User className="w-3 h-3 shrink-0" />{item.name}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 shrink-0" />{item.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" />{item.village}</span>
              <span className="flex items-center gap-1"><Tag className="w-3 h-3 shrink-0" />{item.category} · {item.condition}</span>
              <span className="col-span-2 flex items-center gap-1">
                <CalendarDays className="w-3 h-3 shrink-0" />
                {new Date(item.submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>

            {item.description && (
              <p className="text-xs text-gray-600 italic border-l-2 border-rrr-green-300 pl-2">{item.description}</p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <label className="text-[11px] font-bold text-gray-600 shrink-0">Update Status:</label>
              <div className="relative flex-1 min-w-[160px]">
                <select
                  value={item.status}
                  onChange={(e) => handleStatus(item.id, e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg text-xs font-semibold px-2 py-1.5 pr-7 bg-white focus-ring"
                  aria-label={`Update status for ${item.refNumber}`}
                >
                  <option value="pending_dropoff">Pending Drop-off</option>
                  <option value="received">Received</option>
                  <option value="rehomed">Re-homed</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
              </div>
              <button
                onClick={() => setDeleteTarget(item)}
                className="min-h-[36px] px-3 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 focus-ring"
                aria-label={`Delete ${item.refNumber}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Enquiries Tab ────────────────────────────────────────────────────────────

function EnquiriesTab({ onRefresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setItems(await getAdminEnquiries());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatus = async (id, newStatus) => {
    await updateEnquiryStatus(id, newStatus);
    load();
    onRefresh();
  };

  if (loading) return <p className="text-center py-10 text-gray-500 text-sm">Loading enquiries…</p>;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <Layers className="w-10 h-10 text-gray-300 mx-auto" />
        <p className="text-gray-500 text-sm">No marketplace enquiries yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((enq) => (
        <div key={enq.id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="font-black text-rrr-earth-900 text-sm">{enq.itemTitle || 'Marketplace Item'}</p>
              <p className="text-[11px] text-gray-500 font-mono">{enq.id}</p>
            </div>
            <StatusBadge status={enq.status} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
            <span className="flex items-center gap-1"><User className="w-3 h-3 shrink-0" />{enq.name}</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 shrink-0" />{enq.phone}</span>
            <span className="col-span-2 flex items-center gap-1">
              <CalendarDays className="w-3 h-3 shrink-0" />
              {new Date(enq.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          {enq.message && (
            <p className="text-xs text-gray-600 italic border-l-2 border-rrr-blue-300 pl-2">{enq.message}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <label className="text-[11px] font-bold text-gray-600 shrink-0">Update Status:</label>
            <div className="relative flex-1 min-w-[160px]">
              <select
                value={enq.status}
                onChange={(e) => handleStatus(enq.id, e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg text-xs font-semibold px-2 py-1.5 pr-7 bg-white focus-ring"
                aria-label={`Update status for enquiry ${enq.id}`}
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Contact Messages Tab ─────────────────────────────────────────────────────

function ContactTab({ onRefresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setItems(await getAdminContactMessages());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatus = async (id, newStatus) => {
    await updateContactStatus(id, newStatus);
    load();
    onRefresh();
  };

  if (loading) return <p className="text-center py-10 text-gray-500 text-sm">Loading messages…</p>;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <MessageSquare className="w-10 h-10 text-gray-300 mx-auto" />
        <p className="text-gray-500 text-sm">No contact messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((msg) => (
        <div key={msg.id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="font-black text-rrr-earth-900 text-sm">{msg.subject || 'General'}</p>
              <p className="text-[11px] text-gray-500 font-mono">{msg.id}</p>
            </div>
            <StatusBadge status={msg.status} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
            <span className="flex items-center gap-1"><User className="w-3 h-3 shrink-0" />{msg.name}</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 shrink-0" />{msg.phone}</span>
            {msg.email && <span className="col-span-2 text-gray-500">{msg.email}</span>}
            <span className="col-span-2 flex items-center gap-1">
              <CalendarDays className="w-3 h-3 shrink-0" />
              {new Date(msg.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          {msg.message && (
            <p className="text-xs text-gray-600 italic border-l-2 border-purple-300 pl-2">{msg.message}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <label className="text-[11px] font-bold text-gray-600 shrink-0">Update Status:</label>
            <div className="relative flex-1 min-w-[160px]">
              <select
                value={msg.status}
                onChange={(e) => handleStatus(msg.id, e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg text-xs font-semibold px-2 py-1.5 pr-7 bg-white focus-ring"
                aria-label={`Update status for message ${msg.id}`}
              >
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Job Applications Tab ─────────────────────────────────────────────────────

function JobsTab({ onRefresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setItems(await getAdminJobApplications());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatus = async (id, newStatus) => {
    await updateJobApplicationStatus(id, newStatus);
    load();
    onRefresh();
  };

  if (loading) return <p className="text-center py-10 text-gray-500 text-sm">Loading applications…</p>;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
        <p className="text-gray-500 text-sm">No job applications yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((app) => (
        <div key={app.id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="font-black text-rrr-earth-900 text-sm">{app.name}</p>
              <p className="text-[11px] text-gray-500 font-mono">{app.id}</p>
            </div>
            <StatusBadge status={app.status} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 shrink-0" />{app.phone}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" />{app.village}</span>
            <span className="col-span-2 flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              Availability: {app.availability}
            </span>
            <span className="col-span-2 flex items-center gap-1">
              <CalendarDays className="w-3 h-3 shrink-0" />
              {new Date(app.appliedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          {app.skills && (
            <p className="text-xs text-gray-600 italic border-l-2 border-orange-300 pl-2">{app.skills}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <label className="text-[11px] font-bold text-gray-600 shrink-0">Update Status:</label>
            <div className="relative flex-1 min-w-[160px]">
              <select
                value={app.status}
                onChange={(e) => handleStatus(app.id, e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg text-xs font-semibold px-2 py-1.5 pr-7 bg-white focus-ring"
                aria-label={`Update status for applicant ${app.name}`}
              >
                <option value="review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="assigned">Assigned</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Dashboard Page ──────────────────────────────────────────────────────

const TABS = [
  { id: 'donations', label: 'Donations / Items', icon: Package },
  { id: 'enquiries', label: 'Enquiries',          icon: Layers },
  { id: 'messages',  label: 'Messages',           icon: MessageSquare },
  { id: 'jobs',      label: 'Job Applications',   icon: Briefcase },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('donations');
  const [metrics, setMetrics] = useState(() => getStorageMetrics());
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshMetrics = useCallback(() => {
    setMetrics(getStorageMetrics());
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="max-w-3xl mx-auto pb-24 space-y-6">
      {/* ── Page Header ── */}
      <div className="bg-white rounded-3xl border-2 border-rrr-green-300 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rrr-green-100 text-rrr-green-800 flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-rrr-earth-900 leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">RRR Centre · Butibori Nagar Parishad</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshMetrics}
              className="min-h-[40px] px-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 focus-ring flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <Link
              to="/"
              className="min-h-[40px] px-3 rounded-xl bg-rrr-earth-900 text-white hover:bg-black focus-ring flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Public Site
            </Link>
          </div>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={Package}
          value={metrics.donationsCount}
          label="Total Items"
          colorClass="bg-rrr-green-50 border-rrr-green-200 text-rrr-green-900"
        />
        <StatCard
          icon={Clock}
          value={metrics.pendingCount}
          label="Pending Drop-off"
          colorClass="bg-amber-50 border-amber-200 text-amber-900"
        />
        <StatCard
          icon={CheckCircle2}
          value={metrics.rehomedCount}
          label="Re-homed"
          colorClass="bg-rrr-blue-50 border-rrr-blue-200 text-rrr-blue-900"
        />
        <StatCard
          icon={Layers}
          value={metrics.enquiriesCount}
          label="Enquiries"
          colorClass="bg-purple-50 border-purple-200 text-purple-900"
        />
        <StatCard
          icon={MessageSquare}
          value={metrics.contactsCount}
          label="Messages"
          colorClass="bg-indigo-50 border-indigo-200 text-indigo-900"
        />
        <StatCard
          icon={Briefcase}
          value={metrics.jobsCount}
          label="Job Applications"
          colorClass="bg-orange-50 border-orange-200 text-orange-900"
        />
        <StatCard
          icon={CheckCircle2}
          value={metrics.receivedCount}
          label="Received at Centre"
          colorClass="bg-teal-50 border-teal-200 text-teal-900"
        />
        <StatCard
          icon={XCircle}
          value={metrics.donationsCount - metrics.receivedCount - metrics.rehomedCount - metrics.pendingCount}
          label="Other Status"
          colorClass="bg-gray-50 border-gray-200 text-gray-700"
        />
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-sm overflow-hidden">
        {/* Tab bar */}
        <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-none">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-3 text-xs font-bold border-b-2 transition-colors focus-ring shrink-0 ${
                activeTab === id
                  ? 'border-rrr-green-600 text-rrr-green-700 bg-rrr-green-50'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
              aria-selected={activeTab === id}
              role="tab"
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4 sm:p-5" role="tabpanel">
          {activeTab === 'donations'  && <DonationsTab  key={`d-${refreshKey}`} onRefresh={refreshMetrics} />}
          {activeTab === 'enquiries'  && <EnquiriesTab  key={`e-${refreshKey}`} onRefresh={refreshMetrics} />}
          {activeTab === 'messages'   && <ContactTab    key={`m-${refreshKey}`} onRefresh={refreshMetrics} />}
          {activeTab === 'jobs'       && <JobsTab       key={`j-${refreshKey}`} onRefresh={refreshMetrics} />}
        </div>
      </div>

      {/* ── TODO extension notice ── */}
      {/* TODO: [Stage 4 / 5] - Replace localStorage calls with REST API via /api/v1/admin/* */}
      {/* TODO: [Stage 4 / 5] - Add JWT RouteGuard so only authenticated Nagar Parishad staff can access this page */}
      {/* TODO: [Stage 4 / 5] - Add CSV/Excel export button for each tab */}
      {/* TODO: [Stage 4 / 5] - Add search/filter controls per tab */}
      <div className="text-center text-[11px] text-gray-400 px-4">
        Data is stored locally in this browser. Stage 4 will connect this dashboard to the municipal backend API.
      </div>
    </div>
  );
}
