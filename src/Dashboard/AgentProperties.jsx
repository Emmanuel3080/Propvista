import { useContext, useEffect, useState } from "react";
import { Home, Calendar, BarChart3, Plus, User, MapPin, Trash2, Edit3, Bell, Clock } from "lucide-react";
import { agentAuthContext } from "../Contexts/AgentAuthContext";
import { propertyContext } from "../Contexts/PropertyContext";
import { appointmentContext } from "../Contexts/AppointmentContext";
import Modal from "react-modal";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

Modal.setAppElement("#root");

export default function AgentProperties() {
    const [modalOpen, setOpen] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const { userInfo } = useContext(agentAuthContext);
    const { AgentAppointments, appointmentdata, loadAppointment, BookAppointment, loadBooking, approveAppoinment,
        loadApproval, cancelAppointment, loadCancel } = useContext(appointmentContext);
    const { agentProperty, agentProp, showAgentProperty, deleteProperty, deleteProp } = useContext(propertyContext);
    const [activeTab, setActiveTab] = useState("properties");

    let subtitle;
    const navigate = useNavigate();

    function openModal() { setOpen(true); }
    function afterOpenModal() { subtitle.style.color = "#f00"; }
    function closeModal() { setOpen(false); }

    useEffect(() => {
        if (userInfo?._id) agentProperty(userInfo._id);
    }, [userInfo]);

    useEffect(() => {
        if (userInfo?._id) AgentAppointments();
    }, [userInfo]);

    const navItems = [
        { id: "properties", label: "Properties", icon: Home },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "stats", label: "Analytics", icon: BarChart3 },
        { id: "account", label: "Account", icon: User },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">

            <aside className="w-52 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
                <Modal
                    isOpen={modalOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={{
                        overlay: {
                            backgroundColor: "rgba(15, 23, 42, 0.75)",
                            zIndex: 1000,
                            backdropFilter: "blur(8px)",
                        },
                        content: {
                            top: "50%", left: "50%", right: "auto", bottom: "auto",
                            marginRight: "-50%", transform: "translate(-50%, -50%)",
                            borderRadius: "24px", padding: "0", width: "90%",
                            maxWidth: "500px", border: "none", backgroundColor: "#ffffff",
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", overflow: "hidden",
                        },
                    }}
                    contentLabel="Delete Confirmation Modal"
                >
                    <div className="p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Delete Property?</h2>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            Are you sure you want to delete this property? This action cannot be undone and the listing will be permanently removed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button onClick={closeModal}
                                className="flex-1 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                                Cancel
                            </button>
                            <button disabled={deleteProp} onClick={() => deleteProperty(selectedPropertyId)}
                                className="flex-1 flex items-center justify-center gap-3 px-6 py-5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95 disabled:bg-red-400 disabled:cursor-not-allowed">
                                {deleteProp ? (
                                    <><span>Deleting Property</span><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                                ) : "Delete Property"}
                            </button>
                        </div>
                    </div>
                </Modal>

                <div className="p-4">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-slate-400 p-2 rounded-lg">
                            <Home className="text-white" size={30} />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-800">PropVista</h1>
                    </div>
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <button key={item.id} onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                    }`}>
                                <item.icon size={20} className={activeTab === item.id ? "text-indigo-600" : "group-hover:text-slate-700"} />
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            <main className="flex-1 p-4 md:p-5 overflow-y-auto pb-20 md:pb-5">

                <div className="flex items-center gap-2 mb-6 md:hidden">
                    <div className="bg-slate-400 p-1.5 rounded-lg">
                        <Home className="text-white" size={20} />
                    </div>
                    <h1 className="text-xl font-black tracking-tight text-slate-800">PropVista</h1>
                </div>

                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight capitalize">
                            My {activeTab}
                        </h2>
                        <p className="text-slate-500 font-medium text-sm md:text-base">
                            Welcome back, <span className="text-indigo-600 font-semibold">{userInfo?.fullName}</span>
                        </p>
                    </div>
                    <div className="bg-white border border-slate-100 px-5 py-2.5 rounded-2xl shadow-sm flex flex-col items-end self-start sm:self-auto">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Listings</p>
                        <p className="text-2xl font-black text-slate-800">{agentProp?.length}</p>
                    </div>
                </header>

                {activeTab === "properties" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {showAgentProperty ? (
                            <div className="col-span-full py-20 text-center text-slate-400 font-medium animate-pulse">
                                Loading your properties...
                            </div>
                        ) : agentProp.length === 0 ? (
                            <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No properties found</p>
                                <button className="mt-4 text-indigo-600 font-bold text-sm hover:underline">
                                    <a href="/post-job">List your first property</a>
                                </button>
                            </div>
                        ) : (
                            agentProp.map((p) => (
                                <div key={p._id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                                    <div className="h-48 md:h-56 overflow-hidden relative">
                                        <img src={p.image} alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-slate-800 shadow-sm">
                                            {p.propertyType || 'Property'}
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-5 flex flex-col flex-1">
                                        <div className="mb-3">
                                            <h3 className="font-bold text-base md:text-lg text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                {p.title}
                                            </h3>
                                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                                                <MapPin size={12} className="text-indigo-500" />
                                                <span>{p.location}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 text-xs line-clamp-2 mb-4 italic leading-relaxed">
                                            "{p.description}"
                                        </p>
                                        <div className="mt-auto space-y-4">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Price</p>
                                                    <p className="text-lg md:text-xl font-black text-indigo-600">
                                                        ₦{p.price?.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Next Viewing</p>
                                                    <p className="text-xs font-bold text-slate-700">
                                                        {p.availableSlots?.[0]?.date
                                                            ? new Date(p.availableSlots[0].date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
                                                            : 'No slots set'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 pt-4 border-t border-slate-50">
                                                <button onClick={() => setActiveTab("appointments")}
                                                    className="flex-1 flex justify-center items-center gap-1.5 py-2.5 bg-slate-50 hover:bg-violet-600 text-violet-700 hover:text-white rounded-xl font-bold transition-all duration-200">
                                                    <Calendar size={14} />
                                                    <span className="text-[10px] uppercase tracking-tight">Bookings</span>
                                                </button>
                                                <button className="flex-1 flex justify-center items-center gap-1.5 py-2.5 bg-slate-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl font-bold transition-all duration-200 cursor-pointer">
                                                    <Edit3 size={14} />
                                                    <a href={`property/update/${p._id}`} className="text-[10px] uppercase tracking-tight p-1">Edit</a>
                                                </button>
                                                <button className="px-3 py-2.5 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all duration-200"
                                                    onClick={() => { setSelectedPropertyId(p._id); openModal(); }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "appointments" && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-400 overflow-hidden">
                        <div className="overflow-x-auto">
                            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm m-3 mb-2">
                                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Booked Appointments</p>
                                    <p className="text-2xl font-bold text-gray-900">{appointmentdata?.length || 0}</p>
                                </div>
                            </div>

                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.15em] font-black border-b border-slate-100">
                                        <th className="px-6 py-5">Client Details</th>
                                        <th className="px-6 py-5">Property</th>
                                        <th className="px-6 py-5">Date & Time</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {appointmentdata?.length > 0 ? (
                                        appointmentdata.map((a) => (
                                            <tr key={a._id} className="group hover:bg-slate-50/80 transition-all">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                                                            {a.userId?.fullName?.charAt(0) || '?'}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800 text-sm leading-tight">
                                                                {a.userId?.fullName || 'Unknown Client'}
                                                            </p>
                                                            <p className="text-[11px] text-slate-400">{a.email || 'No email specified'}</p>
                                                            <p className="text-[10px] text-slate-500 font-medium">{a.userId?.phoneNumber || 'No phone number'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-12 w-16 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                                            <img src={a.propertyId?.image || 'https://via.placeholder.com/150'} alt="Property"
                                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} />
                                                        </div>
                                                        <div className="max-w-[200px]">
                                                            <p className="font-bold text-slate-700 text-sm leading-tight truncate">
                                                                {a.propertyId?.title || 'N/A'}
                                                            </p>
                                                            <p className="text-[10px] text-indigo-600 font-black uppercase tracking-tight truncate">
                                                                ₦{a.propertyId?.price?.toLocaleString() || '0'} • {a.propertyId?.location || 'Unknown Location'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="flex items-center gap-2 text-slate-700 font-semibold text-sm whitespace-nowrap">
                                                            <Calendar size={14} className="text-indigo-500 flex-shrink-0" />
                                                            {a.date ? new Date(a.date).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'Date not set'}
                                                        </span>
                                                        <span className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                                            <Clock size={14} className="flex-shrink-0" /> {a.time || 'No time set'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`inline-flex items-center w-fit px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${a.status === 'approved' || a.status === 'confirmed'
                                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                            : a.status === 'pending'
                                                                ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                                : 'bg-rose-50 text-rose-600 border-rose-100'
                                                            }`}>
                                                            {a.status || 'unknown'}
                                                        </span>
                                                        {a.message ? (
                                                            <p className="text-sm text-slate-900 italic max-w-[200px] truncate" title={a.message}>"{a.message}"</p>
                                                        ) : (
                                                            <span className="text-xs text-red-400">No message</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-2 min-w-[150px]">
                                                        {a.status === 'pending' ? (
                                                            <>
                                                                <button onClick={() => approveAppoinment(a._id)} disabled={loadApproval !== null}
                                                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg transition-all shadow-sm hover:shadow active:scale-95 disabled:scale-100 disabled:cursor-not-allowed whitespace-nowrap">
                                                                    {loadApproval === a?._id ? "Processing..." : "Approve"}
                                                                </button>
                                                                <button onClick={() => cancelAppointment(a._id)} disabled={loadCancel !== null}
                                                                    className="px-3 py-1.5 bg-white hover:bg-rose-50 disabled:bg-white text-rose-600 disabled:text-slate-400 border border-rose-200 hover:border-rose-300 disabled:border-slate-200 font-bold text-xs rounded-lg transition-all active:scale-95 disabled:scale-100 disabled:cursor-not-allowed">
                                                                    {loadCancel === a?._id ? "Processing..." : "Cancel"}
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <span className="text-xs text-slate-400 font-medium italic select-none">No Actions Available</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">
                                                {loadAppointment ? (
                                                    <div className="flex items-center justify-center gap-2 text-slate-500 font-medium">
                                                        Loading appointments
                                                        <span className="h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                                                    </div>
                                                ) : "No appointments found."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── Stats Tab ── */}
                {activeTab === "stats" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        {/* Total Properties — purple */}
                        <div className="rounded-[20px] p-5 flex flex-col gap-4 border"
                            style={{ background: "#EEEDFE", borderColor: "#AFA9EC" }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "#CECBF6" }}>
                                <Home size={20} style={{ color: "#3C3489" }} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold tracking-wide" style={{ color: "#534AB7" }}>
                                    Total properties
                                </p>
                                {showAgentProperty ? (
                                    <div className="h-9 w-12 rounded-lg animate-pulse mt-1" style={{ background: "#CECBF6" }} />
                                ) : (
                                    <h3 className="text-4xl font-black leading-none mt-1" style={{ color: "#3C3489" }}>
                                        {agentProp?.length ?? 0}
                                    </h3>
                                )}
                            </div>
                            <div>
                                <div className="h-1 rounded-full w-full" style={{ background: "#CECBF6" }}>
                                    <div className="h-1 rounded-full" style={{
                                        background: "#534AB7",
                                        width: `${Math.min(100, ((agentProp?.length ?? 0) / 20) * 100)}%`
                                    }} />
                                </div>
                                <p className="text-xs mt-1.5" style={{ color: "#534AB7" }}>
                                    of 20 listing goal
                                </p>
                            </div>
                        </div>

                        {/* Total Appointments — teal */}
                        <div className="rounded-[20px] p-5 flex flex-col gap-4 border"
                            style={{ background: "#E1F5EE", borderColor: "#5DCAA5" }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "#9FE1CB" }}>
                                <Calendar size={20} style={{ color: "#085041" }} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold tracking-wide" style={{ color: "#0F6E56" }}>
                                    Total appointments
                                </p>
                                {loadAppointment ? (
                                    <div className="h-9 w-12 rounded-lg animate-pulse mt-1" style={{ background: "#9FE1CB" }} />
                                ) : (
                                    <h3 className="text-4xl font-black leading-none mt-1" style={{ color: "#085041" }}>
                                        {appointmentdata?.length ?? 0}
                                    </h3>
                                )}
                            </div>
                            <div>
                                <div className="h-1 rounded-full w-full" style={{ background: "#9FE1CB" }}>
                                    <div className="h-1 rounded-full" style={{
                                        background: "#0F6E56",
                                        width: `${Math.min(100, ((appointmentdata?.filter(a => a.status === "confirmed" || a.status === "approved").length ?? 0) / (appointmentdata?.length || 1)) * 100)}%`
                                    }} />
                                </div>
                                <p className="text-xs mt-1.5" style={{ color: "#0F6E56" }}>
                                    {appointmentdata?.filter(a => a.status === "confirmed" || a.status === "approved").length ?? 0} confirmed
                                </p>
                            </div>
                        </div>

                        {/* Pending Requests — coral */}
                        <div className="rounded-[20px] p-5 flex flex-col gap-4 border"
                            style={{ background: "#FAECE7", borderColor: "#F0997B" }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "#F5C4B3" }}>
                                <Clock size={20} style={{ color: "#712B13" }} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold tracking-wide" style={{ color: "#993C1D" }}>
                                    Pending requests
                                </p>
                                {loadAppointment ? (
                                    <div className="h-9 w-12 rounded-lg animate-pulse mt-1" style={{ background: "#F5C4B3" }} />
                                ) : (
                                    <h3 className="text-4xl font-black leading-none mt-1" style={{ color: "#712B13" }}>
                                        {appointmentdata?.filter(a => a.status === "pending").length ?? 0}
                                    </h3>
                                )}
                            </div>
                            <div>
                                <div className="h-1 rounded-full w-full" style={{ background: "#F5C4B3" }}>
                                    <div className="h-1 rounded-full" style={{
                                        background: "#993C1D",
                                        width: `${Math.min(100, ((appointmentdata?.filter(a => a.status === "pending").length ?? 0) / (appointmentdata?.length || 1)) * 100)}%`
                                    }} />
                                </div>
                                <p className="text-xs mt-1.5" style={{ color: "#993C1D" }}>
                                    Needs your review
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            {/* ── Mobile Bottom Navigation ── */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex md:hidden">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === item.id
                            ? "text-indigo-600"
                            : "text-slate-400"
                            }`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}