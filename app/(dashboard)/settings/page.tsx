"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  MapPin,
  X,
  Plus,
  Upload,
  Linkedin,
  Calendar,
  Video,
  MessageSquare,
  Users,
  Zap,
  Briefcase,
  Monitor,
  Brain,
  Shield,
  Sparkles,
  UserPlus,
  Pencil,
  Trash2,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const initialTeamMembers = [
  { id: "1", name: "Amaan Shahana", email: "amaan@wisehire.io", role: "Admin", permissions: "Full Access", status: "active" as const, initials: "AS" },
  { id: "2", name: "Sarah Chen", email: "sarah@wisehire.io", role: "Recruiter", permissions: "Hiring", status: "active" as const, initials: "SC" },
  { id: "3", name: "James Wilson", email: "james@wisehire.io", role: "Hiring Manager", permissions: "Review & Decide", status: "active" as const, initials: "JW" },
  { id: "4", name: "Elena Rodriguez", email: "elena@wisehire.io", role: "Recruiter", permissions: "Hiring", status: "active" as const, initials: "ER" },
  { id: "5", name: "David Kumar", email: "david@wisehire.io", role: "Coordinator", permissions: "Scheduling", status: "invited" as const, initials: "DK" },
];

const initialIntegrations = [
  { id: "1", name: "LinkedIn", category: "Job Board", description: "Post jobs and sync applicants from LinkedIn", status: "connected" as const, icon: "Linkedin" },
  { id: "2", name: "Google Calendar", category: "Calendar", description: "Sync interview schedules with Google Calendar", status: "connected" as const, icon: "Calendar" },
  { id: "3", name: "Zoom", category: "Video", description: "Generate video meeting links for interviews", status: "connected" as const, icon: "Video" },
  { id: "4", name: "Slack", category: "Messaging", description: "Get hiring notifications in Slack channels", status: "not_connected" as const, icon: "MessageSquare" },
  { id: "5", name: "BambooHR", category: "HRIS", description: "Sync employee data and onboarding workflows", status: "not_connected" as const, icon: "Users" },
  { id: "6", name: "Zapier", category: "Automation", description: "Connect WiseHire with 5,000+ apps", status: "not_connected" as const, icon: "Zap" },
  { id: "7", name: "Indeed", category: "Job Board", description: "Post jobs and receive applications from Indeed", status: "connected" as const, icon: "Briefcase" },
  { id: "8", name: "Microsoft Teams", category: "Video", description: "Schedule and conduct interviews via Teams", status: "not_connected" as const, icon: "Monitor" },
];

const iconMap: Record<string, React.ElementType> = {
  Linkedin,
  Calendar,
  Video,
  MessageSquare,
  Users,
  Zap,
  Briefcase,
  Monitor,
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function SettingsPage() {
  /* ---- Company Tab State ---- */
  const [companyName, setCompanyName] = useState("WiseHire");
  const [locations, setLocations] = useState([
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "London, UK",
  ]);
  const [newLocation, setNewLocation] = useState("");
  const [cultureValues, setCultureValues] = useState([
    "Innovation",
    "Collaboration",
    "Diversity",
    "Transparency",
    "Growth Mindset",
  ]);
  const [newValue, setNewValue] = useState("");

  /* ---- AI Configuration Tab State ---- */
  const [resumeMatch, setResumeMatch] = useState(30);
  const [portfolioQuality, setPortfolioQuality] = useState(25);
  const [technicalSkills, setTechnicalSkills] = useState(25);
  const [cultureFit, setCultureFit] = useState(20);

  const [autoScreen, setAutoScreen] = useState(true);
  const [autoReject, setAutoReject] = useState(false);
  const [autoShortlist, setAutoShortlist] = useState(true);
  const [rejectThreshold, setRejectThreshold] = useState("25");
  const [shortlistThreshold, setShortlistThreshold] = useState("75");

  const [aiSensitivity, setAiSensitivity] = useState("medium");

  const [proactiveSuggestions, setProactiveSuggestions] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [autoDraft, setAutoDraft] = useState(false);

  /* ---- Team Tab State ---- */
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  /* ---- Edit Member Dialog State ---- */
  const [editMember, setEditMember] = useState<string | null>(null);
  const [editMemberName, setEditMemberName] = useState("");
  const [editMemberEmail, setEditMemberEmail] = useState("");
  const [editMemberRole, setEditMemberRole] = useState("");
  const [editMemberPermissions, setEditMemberPermissions] = useState("");

  /* ---- Invite Member Dialog State ---- */
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Recruiter");
  const [invitePermissions, setInvitePermissions] = useState("Hiring");

  /* ---- Integrations Tab State ---- */
  const [integrations, setIntegrations] = useState(initialIntegrations);

  /* ---- Helpers ---- */
  const weightTotal = resumeMatch + portfolioQuality + technicalSkills + cultureFit;

  const addLocation = () => {
    const trimmed = newLocation.trim();
    if (trimmed && !locations.includes(trimmed)) {
      setLocations([...locations, trimmed]);
      setNewLocation("");
    }
  };

  const removeLocation = (loc: string) => {
    setLocations(locations.filter((l) => l !== loc));
  };

  const addCultureValue = () => {
    const trimmed = newValue.trim();
    if (trimmed && !cultureValues.includes(trimmed)) {
      setCultureValues([...cultureValues, trimmed]);
      setNewValue("");
    }
  };

  const removeCultureValue = (val: string) => {
    setCultureValues(cultureValues.filter((v) => v !== val));
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const next = i.status === "connected" ? "not_connected" : "connected";
        toast.success(
          next === "connected"
            ? `${i.name} connected successfully`
            : `${i.name} disconnected`
        );
        return { ...i, status: next as "connected" | "not_connected" };
      })
    );
  };

  const openEditMember = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (!member) return;
    setEditMemberName(member.name);
    setEditMemberEmail(member.email);
    setEditMemberRole(member.role);
    setEditMemberPermissions(member.permissions);
    setEditMember(memberId);
  };

  const saveEditMember = () => {
    if (!editMember) return;
    setTeamMembers((prev) =>
      prev.map((m) =>
        m.id === editMember
          ? {
              ...m,
              name: editMemberName,
              email: editMemberEmail,
              role: editMemberRole,
              permissions: editMemberPermissions,
              initials: editMemberName
                .split(" ")
                .map((n) => n[0] ?? "")
                .join("")
                .toUpperCase(),
            }
          : m
      )
    );
    toast.success("Team member updated");
    setEditMember(null);
  };

  const handleInvite = () => {
    if (!inviteName.trim() || !inviteEmail.trim()) {
      toast.error("Please fill in name and email");
      return;
    }
    const newMember = {
      id: `member-${Date.now()}`,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      permissions: invitePermissions,
      status: "invited" as const,
      initials: inviteName
        .trim()
        .split(" ")
        .map((n) => n[0] ?? "")
        .join("")
        .toUpperCase(),
    };
    setTeamMembers((prev) => [...prev, newMember]);
    toast.success(`Invitation sent to ${inviteName.trim()}`);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Recruiter");
    setInvitePermissions("Hiring");
    setInviteOpen(false);
  };

  const statusBadge = (status: string) => {
    if (status === "active")
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          Active
        </span>
      );
    if (status === "invited")
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
          Invited
        </span>
      );
    return (
      <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20">
        Deactivated
      </span>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--gray-700)]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--gray-500)]">
          Configure your workspace and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="bg-[var(--gray-100)] p-1 rounded-lg">
          <TabsTrigger value="company" className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--brand-600)] data-[state=active]:shadow-sm">
            Company
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--brand-600)] data-[state=active]:shadow-sm">
            AI Configuration
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--brand-600)] data-[state=active]:shadow-sm">
            Team
          </TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--brand-600)] data-[state=active]:shadow-sm">
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* ============================================================ */}
        {/*  TAB 1: COMPANY                                              */}
        {/* ============================================================ */}
        <TabsContent value="company">
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-sm)] border border-[var(--gray-200)] space-y-8">
            {/* Company Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">
                Company Name
              </Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Logo */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">
                Company Logo
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--gray-100)]">
                  <Building2 size={28} className="text-[var(--gray-400)]" />
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-[var(--gray-600)]">
                  <Upload size={16} />
                  Upload Logo
                </Button>
              </div>
            </div>

            {/* Office Locations */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[var(--gray-700)]">
                Office Locations
              </Label>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-50)] px-3 py-1.5 text-sm font-medium text-[var(--brand-600)]"
                  >
                    <MapPin size={14} />
                    {loc}
                    <button
                      onClick={() => removeLocation(loc)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-[var(--brand-600)]/10 transition-colors"
                      aria-label={`Remove ${loc}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 max-w-md">
                <Input
                  placeholder="Add location..."
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLocation()}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addLocation}
                  className="gap-1.5 shrink-0"
                >
                  <Plus size={16} />
                  Add
                </Button>
              </div>
            </div>

            {/* Culture Values */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[var(--gray-700)]">
                Culture Values
              </Label>
              <div className="flex flex-wrap gap-2">
                {cultureValues.map((val) => (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
                  >
                    <Sparkles size={14} />
                    {val}
                    <button
                      onClick={() => removeCultureValue(val)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-emerald-100 transition-colors"
                      aria-label={`Remove ${val}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 max-w-md">
                <Input
                  placeholder="Add value..."
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCultureValue()}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCultureValue}
                  className="gap-1.5 shrink-0"
                >
                  <Plus size={16} />
                  Add
                </Button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <Button
                className="bg-[var(--brand-600)] hover:bg-[var(--brand-600)]/90 text-white"
                onClick={() => toast.success("Company settings saved")}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/*  TAB 2: AI CONFIGURATION                                     */}
        {/* ============================================================ */}
        <TabsContent value="ai">
          <div className="space-y-6">
            {/* Screening Weights */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-sm)] border border-[var(--gray-200)] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[var(--gray-700)] flex items-center gap-2">
                    <Brain size={18} className="text-[var(--brand-600)]" />
                    Screening Weights
                  </h2>
                  <p className="mt-1 text-sm text-[var(--gray-500)]">
                    Adjust how ARIA weighs different candidate attributes
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-semibold ${
                      weightTotal === 100
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    Total: {weightTotal}/100
                  </span>
                  {weightTotal !== 100 && (
                    <p className="text-xs text-amber-500 mt-0.5">
                      Weights should add up to 100
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Resume Match */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Resume Match
                    </Label>
                    <span className="text-sm font-semibold text-[var(--brand-600)] tabular-nums w-8 text-right">
                      {resumeMatch}
                    </span>
                  </div>
                  <Slider
                    value={[resumeMatch]}
                    onValueChange={(v) => setResumeMatch(v[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Portfolio Quality */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Portfolio Quality
                    </Label>
                    <span className="text-sm font-semibold text-[var(--brand-600)] tabular-nums w-8 text-right">
                      {portfolioQuality}
                    </span>
                  </div>
                  <Slider
                    value={[portfolioQuality]}
                    onValueChange={(v) => setPortfolioQuality(v[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Technical Skills */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Technical Skills
                    </Label>
                    <span className="text-sm font-semibold text-[var(--brand-600)] tabular-nums w-8 text-right">
                      {technicalSkills}
                    </span>
                  </div>
                  <Slider
                    value={[technicalSkills]}
                    onValueChange={(v) => setTechnicalSkills(v[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Culture Fit */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Culture Fit
                    </Label>
                    <span className="text-sm font-semibold text-[var(--brand-600)] tabular-nums w-8 text-right">
                      {cultureFit}
                    </span>
                  </div>
                  <Slider
                    value={[cultureFit]}
                    onValueChange={(v) => setCultureFit(v[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Auto-Screening */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-sm)] border border-[var(--gray-200)] space-y-6">
              <div>
                <h2 className="text-base font-semibold text-[var(--gray-700)] flex items-center gap-2">
                  <Shield size={18} className="text-[var(--brand-600)]" />
                  Auto-Screening
                </h2>
                <p className="mt-1 text-sm text-[var(--gray-500)]">
                  Configure automated screening rules for incoming applications
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Auto-screen new applications
                    </Label>
                    <p className="text-sm text-[var(--gray-500)] mt-0.5">
                      Automatically run AI screening on new applications
                    </p>
                  </div>
                  <Switch checked={autoScreen} onCheckedChange={setAutoScreen} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Auto-reject below threshold
                    </Label>
                    <p className="text-sm text-[var(--gray-500)] mt-0.5">
                      Automatically reject candidates scoring below the threshold
                    </p>
                  </div>
                  <Switch checked={autoReject} onCheckedChange={setAutoReject} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Auto-shortlist above threshold
                    </Label>
                    <p className="text-sm text-[var(--gray-500)] mt-0.5">
                      Automatically shortlist candidates scoring above the threshold
                    </p>
                  </div>
                  <Switch checked={autoShortlist} onCheckedChange={setAutoShortlist} />
                </div>
              </div>

              <div className="border-t border-[var(--gray-200)] pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Reject below
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={rejectThreshold}
                      onChange={(e) => setRejectThreshold(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Shortlist above
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={shortlistThreshold}
                      onChange={(e) => setShortlistThreshold(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Content Detection */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-sm)] border border-[var(--gray-200)] space-y-6">
              <div>
                <h2 className="text-base font-semibold text-[var(--gray-700)] flex items-center gap-2">
                  <Sparkles size={18} className="text-[var(--brand-600)]" />
                  AI Content Detection
                </h2>
                <p className="mt-1 text-sm text-[var(--gray-500)]">
                  Detect AI-generated content in applications and assessments
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-[var(--gray-700)] mb-3 block">
                  Sensitivity Level
                </Label>
                <RadioGroup
                  value={aiSensitivity}
                  onValueChange={setAiSensitivity}
                  className="space-y-3"
                >
                  <div className="flex items-start gap-3 rounded-lg border border-[var(--gray-200)] p-4 hover:bg-[var(--gray-50)] transition-colors">
                    <RadioGroupItem value="low" id="sensitivity-low" className="mt-0.5" />
                    <div>
                      <Label htmlFor="sensitivity-low" className="text-sm font-medium text-[var(--gray-700)] cursor-pointer">
                        Low
                      </Label>
                      <p className="text-sm text-[var(--gray-500)] mt-0.5">
                        Only flag content with very high AI probability (&gt;90%). Minimizes false positives.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-[var(--gray-200)] p-4 hover:bg-[var(--gray-50)] transition-colors">
                    <RadioGroupItem value="medium" id="sensitivity-medium" className="mt-0.5" />
                    <div>
                      <Label htmlFor="sensitivity-medium" className="text-sm font-medium text-[var(--gray-700)] cursor-pointer">
                        Medium
                      </Label>
                      <p className="text-sm text-[var(--gray-500)] mt-0.5">
                        Balanced detection with moderate confidence threshold (&gt;70%). Recommended for most teams.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-[var(--gray-200)] p-4 hover:bg-[var(--gray-50)] transition-colors">
                    <RadioGroupItem value="high" id="sensitivity-high" className="mt-0.5" />
                    <div>
                      <Label htmlFor="sensitivity-high" className="text-sm font-medium text-[var(--gray-700)] cursor-pointer">
                        High
                      </Label>
                      <p className="text-sm text-[var(--gray-500)] mt-0.5">
                        Aggressive detection flagging content above 50% AI probability. May increase false positives.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* ARIA Settings */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-sm)] border border-[var(--gray-200)] space-y-6">
              <div>
                <h2 className="text-base font-semibold text-[var(--gray-700)] flex items-center gap-2">
                  <Brain size={18} className="text-[var(--brand-600)]" />
                  ARIA Settings
                </h2>
                <p className="mt-1 text-sm text-[var(--gray-500)]">
                  Customize how ARIA assists your hiring workflow
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Proactive suggestions
                    </Label>
                    <p className="text-sm text-[var(--gray-500)] mt-0.5">
                      ARIA proactively suggests actions based on hiring activity
                    </p>
                  </div>
                  <Switch checked={proactiveSuggestions} onCheckedChange={setProactiveSuggestions} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Daily digest emails
                    </Label>
                    <p className="text-sm text-[var(--gray-500)] mt-0.5">
                      Receive a daily summary of hiring activity and recommendations
                    </p>
                  </div>
                  <Switch checked={dailyDigest} onCheckedChange={setDailyDigest} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-[var(--gray-700)]">
                      Auto-draft communications
                    </Label>
                    <p className="text-sm text-[var(--gray-500)] mt-0.5">
                      Let ARIA draft emails and messages for your review
                    </p>
                  </div>
                  <Switch checked={autoDraft} onCheckedChange={setAutoDraft} />
                </div>
              </div>
            </div>

            {/* Save AI Configuration */}
            <div>
              <Button
                className="bg-[var(--brand-600)] hover:bg-[var(--brand-600)]/90 text-white"
                onClick={() => toast.success("AI configuration saved")}
              >
                Save AI Configuration
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/*  TAB 3: TEAM                                                  */}
        {/* ============================================================ */}
        <TabsContent value="team">
          <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-sm)] border border-[var(--gray-200)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[var(--gray-700)]">
                  Team Members
                </h2>
                <p className="mt-1 text-sm text-[var(--gray-500)]">
                  Manage your team and their permissions
                </p>
              </div>
              <Button
                className="bg-[var(--brand-600)] hover:bg-[var(--brand-600)]/90 text-white gap-2"
                onClick={() => setInviteOpen(true)}
              >
                <UserPlus size={16} />
                Invite Team Member
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[var(--gray-500)]">Name</TableHead>
                  <TableHead className="text-[var(--gray-500)]">Email</TableHead>
                  <TableHead className="text-[var(--gray-500)]">Role</TableHead>
                  <TableHead className="text-[var(--gray-500)]">Permissions</TableHead>
                  <TableHead className="text-[var(--gray-500)]">Status</TableHead>
                  <TableHead className="text-[var(--gray-500)] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-50)] text-[var(--brand-600)] text-sm font-semibold">
                          {member.initials}
                        </div>
                        <span className="font-medium text-[var(--gray-700)]">
                          {member.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[var(--gray-500)]">
                      {member.email}
                    </TableCell>
                    <TableCell className="text-[var(--gray-700)]">
                      {member.role}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-[var(--gray-100)] text-[var(--gray-600)] font-medium">
                        {member.permissions}
                      </Badge>
                    </TableCell>
                    <TableCell>{statusBadge(member.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-[var(--gray-500)] hover:text-[var(--gray-700)]"
                          onClick={() => openEditMember(member.id)}
                        >
                          <Pencil size={14} />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            setTeamMembers((prev) => prev.filter((m) => m.id !== member.id));
                            toast.success(`${member.name} removed from team`);
                          }}
                        >
                          <Trash2 size={14} />
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/*  TAB 4: INTEGRATIONS                                          */}
        {/* ============================================================ */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-[var(--gray-700)]">
                Integrations
              </h2>
              <p className="mt-1 text-sm text-[var(--gray-500)]">
                Connect your favorite tools to streamline your hiring workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {integrations.map((integration) => {
                const IconComponent = iconMap[integration.icon] || Briefcase;
                const isConnected = integration.status === "connected";

                return (
                  <div
                    key={integration.id}
                    className="bg-white rounded-xl p-6 border border-[var(--gray-200)] shadow-[var(--shadow-sm)] flex flex-col"
                  >
                    {/* Top row: icon + name + category */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--gray-100)]">
                        <IconComponent size={22} className="text-[var(--gray-600)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-[var(--gray-700)]">
                            {integration.name}
                          </h3>
                          <span className="inline-flex items-center rounded-full bg-[var(--gray-100)] px-2 py-0.5 text-[11px] font-medium text-[var(--gray-500)]">
                            {integration.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-[var(--gray-500)] line-clamp-2">
                          {integration.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom row: status + action */}
                    <div className="mt-5 flex items-center justify-between pt-4 border-t border-[var(--gray-100)]">
                      {isConnected ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Connected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--gray-400)]">
                          <span className="h-2 w-2 rounded-full bg-[var(--gray-300)]" />
                          Not Connected
                        </span>
                      )}

                      {isConnected ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => toggleIntegration(integration.id)}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-[var(--brand-600)] hover:bg-[var(--brand-600)]/90 text-white"
                          onClick={() => toggleIntegration(integration.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Team Member Dialog */}
      <Dialog open={editMember !== null} onOpenChange={(open) => { if (!open) setEditMember(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Update the team member details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Name</Label>
              <Input value={editMemberName} onChange={(e) => setEditMemberName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Email</Label>
              <Input value={editMemberEmail} onChange={(e) => setEditMemberEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Role</Label>
              <Select value={editMemberRole} onValueChange={setEditMemberRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                  <SelectItem value="Hiring Manager">Hiring Manager</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Permissions</Label>
              <Select value={editMemberPermissions} onValueChange={setEditMemberPermissions}>
                <SelectTrigger>
                  <SelectValue placeholder="Select permissions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Access">Full Access</SelectItem>
                  <SelectItem value="Hiring">Hiring</SelectItem>
                  <SelectItem value="Review & Decide">Review &amp; Decide</SelectItem>
                  <SelectItem value="Scheduling">Scheduling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMember(null)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] hover:bg-[var(--brand-600)]/90 text-white"
              onClick={saveEditMember}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Team Member Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>Send an invitation to a new team member.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Name</Label>
              <Input
                placeholder="Full name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Email</Label>
              <Input
                placeholder="email@example.com"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                  <SelectItem value="Hiring Manager">Hiring Manager</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Permissions</Label>
              <Select value={invitePermissions} onValueChange={setInvitePermissions}>
                <SelectTrigger>
                  <SelectValue placeholder="Select permissions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Access">Full Access</SelectItem>
                  <SelectItem value="Hiring">Hiring</SelectItem>
                  <SelectItem value="Review & Decide">Review &amp; Decide</SelectItem>
                  <SelectItem value="Scheduling">Scheduling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] hover:bg-[var(--brand-600)]/90 text-white"
              onClick={handleInvite}
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
