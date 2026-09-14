import React from 'react'
import Header from '../Common/Header'
import DashboardFooter from '../Common/DashboardFooter'

const stats = [
    { value: "500+", label: "Properties Listed" },
    { value: "1,200+", label: "Appointments Booked" },
    { value: "150+", label: "Verified Agents" },
    { value: "98%", label: "Client Satisfaction" },
]

const values = [
    {
        icon: "🤝",
        title: "Trust First",
        description: "Every agent is verified and every listing is checked before it goes live.",
    },
    {
        icon: "⚡",
        title: "Effortless Booking",
        description: "Schedule a viewing in seconds — no calls, no back-and-forth emails.",
    },
    {
        icon: "🔍",
        title: "Transparent Process",
        description: "Clear availability, instant confirmations, and no hidden surprises.",
    },
]

const AboutUs = () => {
    return (

        <div>
            <Header />
            <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">

                <div className="max-w-6xl mx-auto">
                    <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
                        {/* <h2 className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
                            About PropVista
                        </h2> */}

                        <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                            Making property viewings{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 bg-clip-text text-transparent">
                                effortless
                            </span>
                            .
                        </p>

                        <p className="text-base text-neutral-600 leading-relaxed">
                            PropVista connects buyers and renters directly with verified real estate agents,
                            removing the friction of scheduling property viewings. No phone tag, no delayed
                            replies — just pick a time and book.
                        </p>

                        <p className="text-base text-neutral-600 leading-relaxed">
                            We built PropVista because finding a home shouldn't feel like a full-time job.
                            Whether you're an agent managing dozens of listings or a buyer viewing your first
                            property, our platform keeps things simple, fast, and transparent.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 border-y border-blue-100 py-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-blue-50/60 border border-blue-100 hover:border-blue-400 rounded-2xl p-8 text-center transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-2">{value.title}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            <DashboardFooter />
        </div>

    )
}

export default AboutUs