import { useContext, useEffect, useMemo, useState } from "react";
import {
    Home,
    Calendar,
    BarChart3,
    User,
    MapPin,
    Trash2,
    Edit3,
    Clock,
    LogOut,
    Plus,
    AlertTriangle,
    BedDouble,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { agentAuthContext } from "../Contexts/AgentAuthContext";
import { propertyContext } from "../Contexts/PropertyContext";
import { appointmentContext } from "../Contexts/AppointmentContext";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

export default function AgentProperties({ searchQuery = "" }) {
    const [modalOpen, setOpen] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const { userInfo, logout } = useContext(agentAuthContext);
    const {
        AgentAppointments,
        appointmentdata,
        loadAppointment,
        approveAppoinment,
        loadApproval,
        cancelAppointment,
        loadCancel,
    } = useContext(appointmentContext);
    const {
        agentProperty,
        agentProp,
        showAgentProperty,
        deleteProperty,
        deleteProp,
    } = useContext(propertyContext);
    const [activeTab, setActiveTab] = useState("properties");

    const navigate = useNavigate();

    function openModal() {
        setOpen(true);
    }
    function closeModal() {
        setOpen(false);
    }

    useEffect(() => {
        if (userInfo?._id) agentProperty(userInfo._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    useEffect(() => {
        if (userInfo?._id) AgentAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    const filteredAgentProperties = useMemo(() => {
        if (!Array.isArray(agentProp)) return [];
        const q = searchQuery.trim().toLowerCase();
        if (!q) return agentProp;
        return agentProp.filter((p) =>
            `${p.title || ""} ${p.location || ""} ${p.propertyType || ""}`
                .toLowerCase()
                .includes(q)
        );
    }, [agentProp, searchQuery]);

    const navItems = [
        { id: "properties", label: "Residences", icon: Home },
        { id: "appointments", label: "Viewings", icon: Calendar },
        { id: "stats", label: "Analytics", icon: BarChart3 },
        { id: "account", label: "Advisor Profile", icon: User },
    ];

    const confirmedCount =
        appointmentdata?.filter(
            (a) => a.status === "confirmed" || a.status === "approved"
        ).length ?? 0;
    const pendingCount =
        appointmentdata?.filter((a) => a.status === "pending").length ?? 0;

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-[#F9F8F6] flex text-[#1A1A1A]">
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(22, 24, 23, 0.72)",
                        zIndex: 1000,
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                    },
                    content: {
                        position: "relative",
                        inset: "auto",
                        borderRadius: "12px",
                        padding: "0",
                        width: "100%",
                        maxWidth: "460px",
                        border: "1px solid #E4E2DC",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 25px 50px -12px rgba(22,24,23,0.25)",
                        overflow: "hidden",
                    },
                }}
                contentLabel="Delete Property Confirmation Modal"
            >
                <div className="p-6 sm:p-8 text-center space-y-5">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#C86D51]/15 text-[#C86D51]">
                        <AlertTriangle size={22} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-serif-editorial text-2xl font-normal text-[#1A1A1A]">
                            Remove Residence Listing?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#5C5C58] leading-relaxed">
                            Are you sure you want to permanently remove this property from your portfolio? This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="flex-1 px-5 py-2.5 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC] text-[#1A1A1A] font-semibold text-xs hover:bg-[#E4E2DC] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={deleteProp}
                            onClick={() => deleteProperty(selectedPropertyId)}
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#C86D51] hover:bg-[#b25b40] text-white font-semibold text-xs transition-colors disabled:opacity-60 cursor-pointer"
                        >
                            {deleteProp ? (
                                <>
                                    <span>Removing...</span>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </>
                            ) : (
                                "Delete Residence"
                            )}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Desktop Sidebar */}
            <aside className="w-60 bg-[#F1EFEA] border-r border-[#E4E2DC] hidden md:flex flex-col justify-between sticky top-20 h-[calc(100vh-5rem)] p-5">
                <div className="space-y-6">
                    <div className="px-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8F8E88]">
                            Portfolio Suite
                        </p>
                    </div>

                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const active = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                                        active
                                            ? "bg-[#1E3A34] text-white"
                                            : "text-[#5C5C58] hover:bg-white hover:text-[#1A1A1A]"
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <item.icon size={16} />
                                        <span>{item.label}</span>
                                    </span>
                                    {item.id === "appointments" && pendingCount > 0 && (
                                        <span
                                            className={`px-1.5 py-0.5 rounded-full text-[10px] tabular-nums ${
                                                active
                                                    ? "bg-[#C86D51] text-white"
                                                    : "bg-[#C86D51]/15 text-[#C86D51]"
                                            }`}
                                        >
                                            {pendingCount}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="pt-4 border-t border-[#E4E2DC] space-y-3">
                    <Link
                        to="/post-job"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors"
                    >
                        <Plus size={14} />
                        <span>New Listing</span>
                    </Link>

                    <button
                        type="button"
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] bg-white border border-[#E4E2DC] text-xs font-semibold text-[#5C5C58] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 pb-24 md:pb-12 space-y-8">
                {/* Section Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-6 border-b border-[#E4E2DC]">
                    <div className="space-y-1">
                        {/* <span className="type-micro-badge text-[#8F8E88]">
                            Advisor Workspace
                        </span> */}
                        <h1 className="type-property-title text-[#1A1A1A] capitalize">
                            {activeTab === "properties"
                                ? "Published Residences"
                                : activeTab === "appointments"
                                ? "Client Viewing Requests"
                                : activeTab === "stats"
                                ? "Portfolio Analytics"
                                : "Advisor Credentials"}
                        </h1>
                        <p className="type-body text-[#5C5C58]">
                            Welcome back,{" "}
                            <span className="text-[#1A1A1A] font-semibold">
                                {userInfo?.fullName || "Partner Advisor"}
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-end">
                        <div className="bg-white border border-[#E4E2DC] px-4 py-2.5 rounded-[12px] text-right">
                            <p className="type-micro-badge text-[#8F8E88]">
                                Active Listings
                            </p>
                            <p className="font-sans-ui text-xl font-semibold text-[#1A1A1A] tabular-nums mt-1">
                                {agentProp?.length || 0}
                            </p>
                        </div>
                        <div className="bg-white border border-[#E4E2DC] px-4 py-2.5 rounded-[12px] text-right">
                            <p className="type-micro-badge text-[#8F8E88]">
                                Pending Viewings
                            </p>
                            <p className="font-sans-ui text-xl font-semibold text-[#C86D51] tabular-nums mt-1">
                                {pendingCount}
                            </p>
                        </div>
                    </div>
                </header>

                {/* ── Properties Tab ── */}
                {activeTab === "properties" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {showAgentProperty ? (
                            [...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-[12px] border border-[#E4E2DC] overflow-hidden animate-pulse"
                                >
                                    <div className="aspect-[16/10] bg-[#F1EFEA]" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-[#F1EFEA] rounded w-2/3" />
                                        <div className="h-4 bg-[#F1EFEA] rounded w-1/2" />
                                        <div className="h-9 bg-[#F1EFEA] rounded w-full mt-4" />
                                    </div>
                                </div>
                            ))
                        ) : filteredAgentProperties.length === 0 ? (
                            <div className="col-span-full py-20 px-6 text-center bg-[#F1EFEA] rounded-[12px] border border-[#E4E2DC] space-y-4">
                                <p className="font-serif-editorial text-2xl text-[#1A1A1A]">
                                    {searchQuery
                                        ? "No portfolio residences match your search"
                                        : "No residences published yet"}
                                </p>
                                <p className="text-xs sm:text-sm text-[#5C5C58] max-w-md mx-auto">
                                    Publish your first architectural listing with photography and available viewing windows.
                                </p>
                                <Link
                                    to="/post-job"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors"
                                >
                                    <Plus size={14} />
                                    <span>List Your First Residence</span>
                                </Link>
                            </div>
                        ) : (
                            filteredAgentProperties.map((p) => (
                                <article
                                    key={p._id}
                                    className="group bg-white rounded-[12px] overflow-hidden border border-[#E4E2DC] hover:shadow-md transition-all flex flex-col"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative bg-[#F1EFEA]">
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 bg-[#161817]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium capitalize text-white">
                                            {p.propertyType || "Residence"}
                                        </span>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-baseline justify-between gap-2">
                                                <p className="type-card-price text-[#1A1A1A] tabular-nums">
                                                    ₦{Number(p.price || 0).toLocaleString()}
                                                </p>
                                                <span className="inline-flex items-center gap-1 type-micro-badge text-[#5C5C58] tabular-nums">
                                                    <BedDouble size={13} className="text-[#8F8E88]" />
                                                    {p.bedrooms ?? 0} Beds
                                                </span>
                                            </div>

                                            <h3 className="type-card-title text-[#1A1A1A] line-clamp-1">
                                                {p.title}
                                            </h3>

                                            <div className="flex items-center gap-1 type-card-meta text-[#5C5C58]">
                                                <MapPin size={12} className="text-[#1E3A34] shrink-0" />
                                                <span className="truncate">{p.location}</span>
                                            </div>

                                            <p className="type-body text-[#5C5C58] line-clamp-2">
                                                {p.description}
                                            </p>
                                        </div>

                                        <div className="space-y-3 pt-3 border-t border-[#E4E2DC]">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-[#8F8E88]">Next Viewing</span>
                                                <span className="font-semibold text-[#2E7D32] tabular-nums">
                                                    {p.availableSlots?.[0]?.date
                                                        ? new Date(
                                                              p.availableSlots[0].date
                                                          ).toLocaleDateString("en-GB", {
                                                              day: "2-digit",
                                                              month: "short",
                                                              year: "numeric",
                                                          })
                                                        : "No slots set"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveTab("appointments")}
                                                    className="flex-1 flex justify-center items-center gap-1.5 py-2 px-3 bg-[#F1EFEA] hover:bg-[#1E3A34] text-[#1A1A1A] hover:text-white rounded-[8px] text-xs font-semibold transition-colors cursor-pointer"
                                                >
                                                    <Calendar size={13} />
                                                    <span>Viewings</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/property/update/${p._id}`)}
                                                    className="flex-1 flex justify-center items-center gap-1.5 py-2 px-3 bg-white border border-[#E4E2DC] hover:border-[#1E3A34] text-[#1A1A1A] rounded-[8px] text-xs font-semibold transition-colors cursor-pointer"
                                                >
                                                    <Edit3 size={13} />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label="Delete property"
                                                    onClick={() => {
                                                        setSelectedPropertyId(p._id);
                                                        openModal();
                                                    }}
                                                    className="p-2 bg-white border border-[#E4E2DC] hover:border-[#C86D51] text-[#C86D51] rounded-[8px] transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                )}

                {/* ── Appointments Tab ── */}
                {activeTab === "appointments" && (
                    <div className="bg-white rounded-[12px] border border-[#E4E2DC] overflow-hidden shadow-xs">
                        <div className="px-6 py-4 bg-[#F1EFEA] border-b border-[#E4E2DC] flex items-center justify-between">
                            <div>
                                <h2
                                    id="appointments-table-caption"
                                    className="font-serif-editorial text-lg font-medium text-[#1A1A1A]"
                                >
                                    Scheduled Client Viewings
                                </h2>
                                <p className="text-xs text-[#5C5C58]">
                                    Approve or decline incoming private tour requests.
                                </p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-white border border-[#E4E2DC] text-xs font-semibold text-[#1A1A1A] tabular-nums">
                                {appointmentdata?.length || 0} Total
                            </span>
                        </div>

                        <div
                            tabIndex={0}
                            role="region"
                            aria-labelledby="appointments-table-caption"
                            className="pv-table-region"
                        >
                            <table className="w-full text-left min-w-[780px]">
                                <thead>
                                    <tr className="bg-[#F9F8F6] text-[#8F8E88] text-[11px] uppercase tracking-wider font-semibold border-b border-[#E4E2DC]">
                                        <th scope="col" className="px-6 py-4 bg-[#F9F8F6]">Client</th>
                                        <th scope="col" className="px-6 py-4 bg-[#F9F8F6]">Residence</th>
                                        <th scope="col" className="px-6 py-4 bg-[#F9F8F6]">Viewing Window</th>
                                        <th scope="col" className="px-6 py-4 bg-[#F9F8F6]">Status & Notes</th>
                                        <th scope="col" className="px-6 py-4 text-right bg-[#F9F8F6]">Decision</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E4E2DC] text-sm">
                                    {appointmentdata?.length > 0 ? (
                                        appointmentdata.map((a) => (
                                            <tr key={a._id} className="hover:bg-[#F9F8F6] transition-colors">
                                                <th scope="row" className="px-6 py-4 font-normal text-left">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 shrink-0 rounded-full bg-[#1E3A34] text-white flex items-center justify-center font-serif-editorial text-xs font-semibold uppercase">
                                                            {a.userId?.fullName?.charAt(0) || "C"}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[#1A1A1A] text-xs sm:text-sm">
                                                                {a.userId?.fullName || "Private Client"}
                                                            </p>
                                                            <p className="text-xs text-[#5C5C58]">
                                                                {a.email || a.userId?.email || "No email"}
                                                            </p>
                                                            <p className="text-[11px] text-[#8F8E88] tabular-nums">
                                                                {a.userId?.phoneNumber || ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </th>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {a.propertyId?.image && (
                                                            <img
                                                                src={a.propertyId.image}
                                                                alt={a.propertyId?.title || "Property"}
                                                                className="h-11 w-14 shrink-0 rounded-[6px] object-cover border border-[#E4E2DC]"
                                                            />
                                                        )}
                                                        <div className="max-w-[200px]">
                                                            <p className="font-serif-editorial font-medium text-[#1A1A1A] text-sm truncate">
                                                                {a.propertyId?.title || "Residence"}
                                                            </p>
                                                            <p className="text-xs text-[#5C5C58] truncate tabular-nums">
                                                                ₦{a.propertyId?.price?.toLocaleString() || "0"} •{" "}
                                                                {a.propertyId?.location || ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] whitespace-nowrap tabular-nums">
                                                            <Calendar size={13} className="text-[#1E3A34]" />
                                                            {a.date
                                                                ? new Date(a.date).toLocaleDateString("en-GB", {
                                                                      weekday: "short",
                                                                      year: "numeric",
                                                                      month: "short",
                                                                      day: "numeric",
                                                                  })
                                                                : "Date pending"}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 text-xs text-[#5C5C58] tabular-nums">
                                                            <Clock size={12} className="text-[#8F8E88]" />
                                                            {a.time || "Time pending"}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="space-y-1.5">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                                                                a.status === "approved" || a.status === "confirmed"
                                                                    ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                                                                    : a.status === "pending"
                                                                    ? "bg-[#C86D51]/15 text-[#C86D51]"
                                                                    : "bg-[#F1EFEA] text-[#8F8E88]"
                                                            }`}
                                                        >
                                                            {a.status || "pending"}
                                                        </span>
                                                        {a.message && (
                                                            <p
                                                                className="text-xs text-[#5C5C58] italic max-w-[220px] truncate"
                                                                title={a.message}
                                                            >
                                                                "{a.message}"
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    {a.status === "pending" ? (
                                                        <div className="inline-flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => approveAppoinment(a._id)}
                                                                disabled={loadApproval !== null}
                                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1E3A34] hover:bg-[#142824] disabled:opacity-50 text-white font-semibold text-xs rounded-[8px] transition-colors cursor-pointer"
                                                            >
                                                                <CheckCircle2 size={13} />
                                                                <span>
                                                                    {loadApproval === a?._id ? "Confirming..." : "Confirm"}
                                                                </span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => cancelAppointment(a._id)}
                                                                disabled={loadCancel !== null}
                                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#F1EFEA] text-[#C86D51] border border-[#E4E2DC] font-semibold text-xs rounded-[8px] transition-colors cursor-pointer"
                                                            >
                                                                <XCircle size={13} />
                                                                <span>
                                                                    {loadCancel === a?._id ? "Cancelling..." : "Decline"}
                                                                </span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-[#8F8E88] italic">
                                                            Completed
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center text-sm text-[#5C5C58]">
                                                {loadAppointment
                                                    ? "Loading viewing appointments..."
                                                    : "No viewing appointments have been requested yet."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── Analytics Tab ── */}
                {activeTab === "stats" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 space-y-4">
                            <div className="w-10 h-10 rounded-[8px] bg-[#F1EFEA] flex items-center justify-center text-[#1E3A34]">
                                <Home size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#8F8E88]">
                                    Published Residences
                                </p>
                                <p className="font-sans-ui text-4xl font-semibold text-[#1A1A1A] mt-1 tabular-nums tracking-[-0.02em]">
                                    {agentProp?.length ?? 0}
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-1.5 rounded-full w-full bg-[#F1EFEA] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-[#1E3A34]"
                                        style={{
                                            width: `${Math.min(100, ((agentProp?.length ?? 0) / 20) * 100)}%`,
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-[#5C5C58]">Active agency portfolio</p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 space-y-4">
                            <div className="w-10 h-10 rounded-[8px] bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32]">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#8F8E88]">
                                    Total Viewing Requests
                                </p>
                                <p className="font-sans-ui text-4xl font-semibold text-[#1A1A1A] mt-1 tabular-nums tracking-[-0.02em]">
                                    {appointmentdata?.length ?? 0}
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-1.5 rounded-full w-full bg-[#F1EFEA] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-[#2E7D32]"
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                (confirmedCount / (appointmentdata?.length || 1)) * 100
                                            )}%`,
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-[#2E7D32] font-medium tabular-nums">
                                    {confirmedCount} confirmed viewings
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 space-y-4">
                            <div className="w-10 h-10 rounded-[8px] bg-[#C86D51]/15 flex items-center justify-center text-[#C86D51]">
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#8F8E88]">
                                    Awaiting Confirmation
                                </p>
                                <p className="font-sans-ui text-4xl font-semibold text-[#1A1A1A] mt-1 tabular-nums tracking-[-0.02em]">
                                    {pendingCount}
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-1.5 rounded-full w-full bg-[#F1EFEA] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-[#C86D51]"
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                (pendingCount / (appointmentdata?.length || 1)) * 100
                                            )}%`,
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-[#C86D51] font-medium">
                                    Requires advisor response
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Account Tab ── */}
                {activeTab === "account" && (
                    <div className="bg-white rounded-[12px] border border-[#E4E2DC] p-6 sm:p-8 max-w-xl space-y-6">
                        <div className="flex items-center gap-4">
                            {userInfo?.profileImage ? (
                                <img
                                    src={userInfo.profileImage}
                                    alt={userInfo?.fullName || "Advisor"}
                                    className="w-16 h-16 rounded-full object-cover border border-[#E4E2DC]"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-[#1E3A34] text-white flex items-center justify-center font-serif-editorial text-2xl font-semibold">
                                    {userInfo?.fullName?.charAt(0) || "A"}
                                </div>
                            )}
                            <div>
                                <h3 className="font-serif-editorial text-2xl font-normal text-[#1A1A1A]">
                                    {userInfo?.fullName || "Partner Advisor"}
                                </h3>
                                <p className="text-xs font-medium text-[#5C5C58]">
                                    {userInfo?.agencyName || "Propvista Partner Agency"}
                                </p>
                            </div>
                        </div>

                        <div className="divide-y divide-[#E4E2DC] border-t border-b border-[#E4E2DC] text-sm">
                            <div className="flex justify-between py-3">
                                <span className="text-[#8F8E88]">Email Address</span>
                                <span className="font-semibold text-[#1A1A1A]">
                                    {userInfo?.email || "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between py-3">
                                <span className="text-[#8F8E88]">Telephone</span>
                                <span className="font-semibold text-[#1A1A1A] tabular-nums">
                                    {userInfo?.phone || "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between py-3">
                                <span className="text-[#8F8E88]">Office Location</span>
                                <span className="font-semibold text-[#1A1A1A]">
                                    {userInfo?.location || "N/A"}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-[8px] bg-[#161817] hover:bg-[#1E3A34] text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                            <LogOut size={15} />
                            <span>Sign Out of Advisor Portal</span>
                        </button>
                    </div>
                )}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E4E2DC] flex md:hidden">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                            activeTab === item.id ? "text-[#1E3A34]" : "text-[#8F8E88]"
                        }`}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
