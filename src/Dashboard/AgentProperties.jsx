import { useContext, useEffect, useState } from "react";
import { Home, Calendar, BarChart3, Plus, User, MapPin, Trash2, Edit3, Bell } from "lucide-react";
import { agentAuthContext } from "../Contexts/AgentAuthContext";
import { propertyContext } from "../Contexts/PropertyContext";

export default function AgentProperties() {

    const { userInfo } = useContext(agentAuthContext)

    const { agentProperty, agentProp,
        showAgentProperty } = useContext(propertyContext)
    const [activeTab, setActiveTab] = useState("properties");



    useEffect(() => {
        if (userInfo?._id) {
            agentProperty(userInfo._id)
        }
    }, [userInfo])
    console.log(agentProp);


    //     { id: 2, title: "Modern Duplex", location: "Ikeja, Lagos", price: "₦750,000", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400" },
    // ];

    const appointments = [
        { id: 1, name: "John Doe", property: "Luxury Apartment", date: "May 12, 2026", status: "Confirmed" },
        { id: 2, name: "Jane Smith", property: "Modern Duplex", date: "May 14, 2026", status: "Pending" },
    ];

    const navItems = [
        { id: "properties", label: "My Properties", icon: Home },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "stats", label: "Analytics", icon: BarChart3 },
        { id: "account", label: "Account", icon: User },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            <aside className="w-52 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-4">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-slate-400 p-2 rounded-lg">
                            <Home className="text-white" size={30} />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-800">PropVista</h1>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                    }`}
                            >
                                <item.icon size={20} className={activeTab === item.id ? "text-indigo-600" : "group-hover:text-slate-700"} />
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

            </aside>

            <main className="flex-1 p-8 md:p-5 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div className="flex items-center gap-4">
    
                        <div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight capitalize">
                                My {activeTab}
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Welcome back, <span className="text-indigo-600 font-semibold">{userInfo.fullName}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm flex flex-col items-end">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Total Listings
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-black text-slate-800">
                                    {agentProp.length}
                                </p>
                            </div>
                        </div>

                    </div>
                </header>

                {/* Properties Tab */}
                {activeTab === "properties" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {showAgentProperty ? (
                            /* Loading State - Spans full width */
                            <div className="col-span-full py-20 text-center text-slate-400 font-medium animate-pulse">
                                Loading your properties...
                            </div>
                        ) : agentProp.length === 0 ? (
                            /* Empty State - Spans full width */
                            <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No properties found</p>
                                <button
                                    // onClick={() => }
                                    className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                                >
                                   <a href="/post-job"> List your first property</a>
                                </button>
                            </div>
                        ) : (
                            /* Property List */
                            agentProp.map((p) => (
                                <div
                                    key={p._id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
                                >
                                    {/* Image Section */}
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-slate-800 shadow-sm">
                                            {p.propertyType || 'Property'}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="mb-3">
                                            <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
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
                                                    <p className="text-xl font-black text-indigo-600">
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

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 pt-4 border-t border-slate-50">
                                                <button
                                                    onClick={() => setActiveTab("appointments")}
                                                    className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-slate-50 hover:bg-violet-600 text-violet-700 hover:text-white rounded-xl font-bold transition-all duration-200 group/btn"
                                                >
                                                    <Calendar size={14} />
                                                    <span className="text-[10px] uppercase tracking-tight">Bookings</span>
                                                </button>

                                                <button className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-slate-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl font-bold transition-all duration-200 group/btn">
                                                    <Edit3 size={14} />
                                                    <span className="text-[10px] uppercase tracking-tight">Edit</span>
                                                </button>

                                                <button className="px-3 py-2.5 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all duration-200">
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

                {/* Appointments Tab */}
                {activeTab === "appointments" && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {appointments.map((a) => (
                                    <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-5 font-bold text-slate-700">{a.name}</td>
                                        <td className="px-6 py-5 text-slate-500">{a.property}</td>
                                        <td className="px-6 py-5">
                                            <span className="flex items-center gap-2 text-indigo-600 font-medium">
                                                <Calendar size={14} /> {a.date}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${a.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {a.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "stats" && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { label: "Total Properties", val: "12", color: "indigo" },
                            { label: "Appointments", val: "8", color: "violet" },
                            { label: "Pending Requests", val: "3", color: "pink" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                                <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${stat.color}-500/10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                                <p className="text-slate-500 font-medium mb-1">{stat.label}</p>
                                <h3 className="text-4xl font-black text-slate-800">{stat.val}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}