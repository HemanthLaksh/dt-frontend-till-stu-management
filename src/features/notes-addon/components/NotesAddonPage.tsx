"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ClipboardList,
  Clock3,
  FileText,
  History,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import Input from "@/components/ui/Input/Input";

import type {
  ApprovalStatus,
  NotesAddon,
  NotesAddonFormValues,
  NotesAddonMapping,
  NotesAddonTab,
} from "../types/notesAddon.types";

const INITIAL_ADDONS: NotesAddon[] = [
  {
    id: 1,
    name: "NEET PG Hard Copy Notes",
    description: "Printed study notes for NEET PG preparation.",
    type: "hard_copy_notes",
    version: "2026",
    active: true,
  },
  {
    id: 2,
    name: "Rapid Revision Workbook",
    description: "Revision workbook for exam preparation.",
    type: "workbook",
    version: "2.0",
    active: true,
  },
  {
    id: 3,
    name: "Clinical Flashcards",
    description: "Flashcards for high-yield clinical concepts.",
    type: "flashcard",
    version: "1.0",
    active: false,
  },
];

const INITIAL_MAPPINGS: NotesAddonMapping[] = [
  {
    id: 101,
    addonId: 1,
    planId: "PLAN-001",
    planName: "NEET PG Premium",
    duration: 12,
    title: "NEET PG Notes Bundle",
    addonType: "NOTES",
    yearOfStudy: true,
    isComplimentary: false,
    isFree: false,
    originalPrice: 2500,
    strikeThroughPrice: 3000,
    active: true,
    status: "pending",
    rejectionRemarks: "",
    createdAt: "2026-10-26",
    createdBy: "Admin",
    updatedBy: "-",
  },
  {
    id: 102,
    addonId: 2,
    planId: "PLAN-002",
    planName: "NEET PG Basic",
    duration: 6,
    title: "Revision Workbook",
    addonType: "WORKBOOK",
    yearOfStudy: false,
    isComplimentary: true,
    isFree: true,
    originalPrice: 0,
    strikeThroughPrice: 0,
    active: true,
    status: "approved",
    rejectionRemarks: "",
    createdAt: "2026-10-22",
    createdBy: "Admin",
    updatedBy: "Reviewer",
  },
  {
    id: 103,
    addonId: 3,
    planId: "PLAN-003",
    planName: "FMGE Complete",
    duration: 3,
    title: "FMGE Flashcards",
    addonType: "FLASHCARD",
    yearOfStudy: false,
    isComplimentary: false,
    isFree: false,
    originalPrice: 500,
    strikeThroughPrice: 700,
    active: true,
    status: "rejected",
    rejectionRemarks: "Please verify the pricing.",
    createdAt: "2026-10-20",
    createdBy: "Admin",
    updatedBy: "Reviewer",
  },
];

const TYPE_OPTIONS = [
  { label: "Hard Copy Notes", value: "hard_copy_notes" },
  { label: "Workbook", value: "workbook" },
  { label: "Flashcard", value: "flashcard" },
  { label: "Online Material", value: "online_material" },
];

const EMPTY_FORM: NotesAddonFormValues = {
  name: "",
  description: "",
  type: "hard_copy_notes",
  version: "",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatusBadge({ status }: { status: ApprovalStatus }) {
  const styles: Record<ApprovalStatus, string> = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rejected: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className="rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function NotesAddonPage() {
  const [addons, setAddons] = useState(INITIAL_ADDONS);
  const [mappings, setMappings] = useState(INITIAL_MAPPINGS);
  const [activeTab, setActiveTab] = useState<NotesAddonTab>("pending");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedAddonId, setSelectedAddonId] = useState("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [form, setForm] = useState<NotesAddonFormValues>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [notice, setNotice] = useState("");

  const pendingCount = mappings.filter(
    (item) => item.status === "pending",
  ).length;

  const approvedCount = mappings.filter(
    (item) => item.status === "approved",
  ).length;

  const filteredAddons = useMemo(() => {
    const query = search.trim().toLowerCase();

    return addons.filter((addon) => {
      const matchesSearch =
        !query ||
        addon.name.toLowerCase().includes(query) ||
        addon.description.toLowerCase().includes(query);

      const matchesType = typeFilter === "all" || addon.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && addon.active) ||
        (statusFilter === "inactive" && !addon.active);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [addons, search, typeFilter, statusFilter]);

  const filteredMappings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mappings.filter((mapping) => {
      const matchesSearch =
        !query ||
        mapping.title.toLowerCase().includes(query) ||
        mapping.planName.toLowerCase().includes(query) ||
        mapping.rejectionRemarks.toLowerCase().includes(query);

      const matchesAddon =
        selectedAddonId === "all" ||
        mapping.addonId === Number(selectedAddonId);

      const matchesStatus =
        statusFilter === "all" || mapping.status === statusFilter;

      const matchesTab =
        activeTab !== "pending" || mapping.status === "pending";

      return matchesSearch && matchesAddon && matchesStatus && matchesTab;
    });
  }, [mappings, search, selectedAddonId, statusFilter, activeTab]);

  function openCreateModal() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsAddonModalOpen(true);
  }

  function openEditModal(addon: NotesAddon) {
    setEditingId(addon.id);
    setForm({
      name: addon.name,
      description: addon.description,
      type: addon.type,
      version: addon.version,
    });
    setIsAddonModalOpen(true);
  }

  function saveAddon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setNotice("Please enter an add-on name.");
      return;
    }

    if (editingId !== null) {
      setAddons((current) =>
        current.map((addon) =>
          addon.id === editingId
            ? { ...addon, ...form, name: form.name.trim() }
            : addon,
        ),
      );
      setNotice("Add-on updated in local demo data.");
    } else {
      const newAddon: NotesAddon = {
        id: Math.max(0, ...addons.map((addon) => addon.id)) + 1,
        ...form,
        name: form.name.trim(),
        active: true,
      };

      setAddons((current) => [newAddon, ...current]);
      setNotice("Add-on created in local demo data.");
    }

    setIsAddonModalOpen(false);
    setForm(EMPTY_FORM);
  }

  function toggleAddon(addonId: number) {
    setAddons((current) =>
      current.map((addon) =>
        addon.id === addonId ? { ...addon, active: !addon.active } : addon,
      ),
    );
    setNotice("Add-on status updated in local demo data.");
  }

  function approveMappings(ids: number[]) {
    setMappings((current) =>
      current.map((mapping) =>
        ids.includes(mapping.id) && mapping.status === "pending"
          ? { ...mapping, status: "approved", updatedBy: "Current Admin" }
          : mapping,
      ),
    );

    setSelectedIds([]);
    setNotice(`${ids.length} mapping(s) approved in local demo data.`);
  }

  function openRejectModal(id: number | null) {
    setRejectId(id);
    setRejectRemarks("");
    setIsRejectModalOpen(true);
  }

  function rejectMappings() {
    const ids = rejectId === null ? selectedIds : [rejectId];

    if (!rejectRemarks.trim()) {
      setNotice("Rejection remarks are required.");
      return;
    }

    setMappings((current) =>
      current.map((mapping) =>
        ids.includes(mapping.id) && mapping.status === "pending"
          ? {
              ...mapping,
              status: "rejected",
              rejectionRemarks: rejectRemarks.trim(),
              updatedBy: "Current Admin",
            }
          : mapping,
      ),
    );

    setSelectedIds([]);
    setIsRejectModalOpen(false);
    setNotice(`${ids.length} mapping(s) rejected in local demo data.`);
  }

  function toggleSelection(id: number) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  function toggleSelectAll() {
    const visiblePendingIds = filteredMappings
      .filter((mapping) => mapping.status === "pending")
      .map((mapping) => mapping.id);

    const allSelected = visiblePendingIds.every((id) =>
      selectedIds.includes(id),
    );

    setSelectedIds((current) =>
      allSelected
        ? current.filter((id) => !visiblePendingIds.includes(id))
        : Array.from(new Set([...current, ...visiblePendingIds])),
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Special Modules</span>
            <span>/</span>
            <span className="text-blue-600">Notes Addon</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Notes Addon Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage add-ons, plan mappings, and approval workflows.
          </p>
        </div>

        <Button onClick={openCreateModal}>
          <span className="inline-flex items-center gap-2">
            <Plus size={16} />
            Add Add-on
          </span>
        </Button>
      </div>

      {notice && (
        <div
          role="status"
          className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800"
        >
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Add-ons"
          value={addons.length}
          icon={<FileText size={18} />}
        />
        <MetricCard
          label="Active Add-ons"
          value={addons.filter((addon) => addon.active).length}
          icon={<ShieldCheck size={18} />}
        />
        <MetricCard
          label="Pending Approvals"
          value={pendingCount}
          icon={<Clock3 size={18} />}
        />
        <MetricCard
          label="Approved Mappings"
          value={approvedCount}
          icon={<Check size={18} />}
        />
      </div>

      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("pending");
              setSelectedIds([]);
            }}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition ${
              activeTab === "pending"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Pending Approvals
            <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("addon");
              setSelectedIds([]);
            }}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition ${
              activeTab === "addon"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Addon
          </button>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              {activeTab === "pending"
                ? "Pending Mapping Approvals"
                : "Add-on Lists"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {activeTab === "pending"
                ? "Review, approve, or reject submitted mappings."
                : "Search and manage add-on plan mappings."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeTab === "pending" && (
              <>
                <Button
                  disabled={selectedIds.length === 0}
                  onClick={() => approveMappings(selectedIds)}
                >
                  <span className="inline-flex items-center gap-2">
                    <Check size={15} />
                    Approve selected
                  </span>
                </Button>
                <Button
                  disabled={selectedIds.length === 0}
                  onClick={() => openRejectModal(null)}
                >
                  <span className="inline-flex items-center gap-2">
                    <X size={15} />
                    Reject selected
                  </span>
                </Button>
              </>
            )}

            {activeTab === "addon" && (
              <Button onClick={openCreateModal}>
                <span className="inline-flex items-center gap-2">
                  <Plus size={15} />
                  Create Add-on
                </span>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 bg-slate-50/70 p-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              placeholder="Search add-ons, plans..."
            />
          </div>

          <Select
            value={statusFilter}
            onChange={(value: string) => setStatusFilter(value)}
            options={[
              { label: "All statuses", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ]}
          />

          {activeTab === "addon" ? (
            <Select
              value={typeFilter}
              onChange={(value: string) => setTypeFilter(value)}
              options={[
                { label: "All add-on types", value: "all" },
                ...TYPE_OPTIONS,
              ]}
            />
          ) : (
            <Select
              value={selectedAddonId}
              onChange={(value: string) => setSelectedAddonId(value)}
              options={[
                { label: "All add-ons", value: "all" },
                ...addons.map((addon) => ({
                  label: addon.name,
                  value: String(addon.id),
                })),
              ]}
            />
          )}

          <Button
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setTypeFilter("all");
              setSelectedAddonId("all");
            }}
          >
            Reset filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          {activeTab === "addon" ? (
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Add-on</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Version</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Description</th>
                  <th className="px-5 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAddons.map((addon) => (
                  <tr key={addon.id} className="hover:bg-slate-50/80">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">
                        {addon.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        ID: {addon.id}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                        {addon.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {addon.version || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          addon.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {addon.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-5 py-4 text-slate-500">
                      {addon.description || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => openEditModal(addon)}>
                          <span className="inline-flex items-center gap-1.5">
                            <Pencil size={14} />
                            Edit
                          </span>
                        </Button>
                        <Button onClick={() => toggleAddon(addon.id)}>
                          {addon.active ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAddons.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      <FileText
                        className="mx-auto mb-3 text-slate-300"
                        size={30}
                      />
                      No add-ons match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label="Select all visible pending mappings"
                      checked={
                        filteredMappings.length > 0 &&
                        filteredMappings
                          .filter((item) => item.status === "pending")
                          .every((item) => selectedIds.includes(item.id))
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold">Add-on / Title</th>
                  <th className="px-4 py-3 font-semibold">Plan</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Remarks</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMappings.map((mapping) => {
                  const addon = addons.find(
                    (item) => item.id === mapping.addonId,
                  );

                  return (
                    <tr key={mapping.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-4">
                        {mapping.status === "pending" && (
                          <input
                            type="checkbox"
                            aria-label={`Select mapping ${mapping.title}`}
                            checked={selectedIds.includes(mapping.id)}
                            onChange={() => toggleSelection(mapping.id)}
                          />
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {addon?.name ?? "Unknown add-on"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {mapping.title}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {mapping.planName}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {mapping.duration} months
                      </td>
                      <td className="px-4 py-4">
                        {mapping.isFree
                          ? "Free"
                          : formatCurrency(mapping.originalPrice)}
                        {!mapping.isFree && mapping.strikeThroughPrice > 0 && (
                          <p className="mt-1 text-xs text-slate-400 line-through">
                            {formatCurrency(mapping.strikeThroughPrice)}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={mapping.status} />
                      </td>
                      <td className="max-w-[200px] px-4 py-4 text-slate-500">
                        {mapping.rejectionRemarks || "—"}
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {mapping.createdAt}
                      </td>
                      <td className="px-4 py-4">
                        {mapping.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => approveMappings([mapping.id])}
                            >
                              <Check size={15} />
                            </Button>
                            <Button onClick={() => openRejectModal(mapping.id)}>
                              <X size={15} />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Reviewed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredMappings.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      <ClipboardList
                        className="mx-auto mb-3 text-slate-300"
                        size={30}
                      />
                      No mappings match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-3 text-sm text-slate-500 sm:flex-row sm:items-center">
          <span>
            Showing{" "}
            {activeTab === "addon"
              ? filteredAddons.length
              : filteredMappings.length}{" "}
            record(s)
          </span>
          <span className="inline-flex items-center gap-2">
            <History size={15} />
            Demo data only — changes are not saved to the backend.
          </span>
        </div>
      </section>

      {isAddonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="addon-modal-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <h2
                  id="addon-modal-title"
                  className="text-lg font-bold text-slate-900"
                >
                  {editingId !== null ? "Edit Add-on" : "Add New Add-on"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the add-on details below.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close add-on form"
                onClick={() => setIsAddonModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveAddon}>
              <div className="space-y-4 p-5">
                <div>
                  <label
                    htmlFor="addon-name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Add-on Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={form.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="e.g. Physics Hard Copy Notes"
                  />
                </div>

                <div>
                  <label
                    htmlFor="addon-description"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="addon-description"
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Brief description of the add-on"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={form.type}
                      onChange={(value: string) =>
                        setForm((current) => ({
                          ...current,
                          type: value as NotesAddonFormValues["type"],
                        }))
                      }
                      options={TYPE_OPTIONS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="addon-version"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Version
                    </label>
                    <Input
                      value={form.version}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setForm((current) => ({
                          ...current,
                          version: event.target.value,
                        }))
                      }
                      placeholder="e.g. 2026"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-5">
                <Button onClick={() => setIsAddonModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <span className="inline-flex items-center gap-2">
                    <Check size={15} />
                    {editingId !== null ? "Save Changes" : "Create Add-on"}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-modal-title"
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            <div className="border-b border-slate-200 p-5">
              <h2
                id="reject-modal-title"
                className="text-lg font-bold text-slate-900"
              >
                Reject Mapping(s)
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Provide a reason for rejecting the selected mapping(s).
              </p>
            </div>
            <div className="space-y-2 p-5">
              <label
                htmlFor="reject-remarks"
                className="block text-sm font-medium text-slate-700"
              >
                Rejection Remarks <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reject-remarks"
                value={rejectRemarks}
                onChange={(event) => setRejectRemarks(event.target.value)}
                rows={4}
                placeholder="Enter the reason for rejection..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-5">
              <Button onClick={() => setIsRejectModalOpen(false)}>
                Cancel
              </Button>
              <Button disabled={!rejectRemarks.trim()} onClick={rejectMappings}>
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
