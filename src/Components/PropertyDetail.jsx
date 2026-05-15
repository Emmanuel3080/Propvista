import React, { useContext, useState } from 'react';
import {
  MapPin,
  BedDouble,
  Clock,
  Calendar,
  Phone,
  Mail,
  Building2,
  ChevronLeft
} from 'lucide-react';


import Modal from "react-modal";
import ReactDom from "react-dom";
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Contexts/UserAuthContext';
import AppointmentBooking from './AppointmentBookData';


Modal.setAppElement("#root")


import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { appointmentContext } from '../Contexts/AppointmentContext';

const appointmentSchema = yup.object({
  name: yup.string().required("Name Field Required"),
  email: yup.string().email("Inavlid Email").required("Email Field is Required"),
  message: yup.string().required("Field is Required")

})

const PropertyDetail = ({ property, onBack }) => {

  const [selectedDetails, setSelectedDetails] = useState({ date: null, time: null });
  const { userInfo } = useContext(authContext)

  const { BookAppointment,
    loadBooking } = useContext(appointmentContext)
  if (!property) return <div className="p-10 text-center">Loading property details...</div>;





  const [modalOpen, setOpen] = useState(false);

  let subtitle;
  const navigate = useNavigate();

  function openModal() {
    setOpen(true);
    // setLoading(true)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setOpen(false);
  }

  const submitData = async (formData) => {
    // ... existing logic ...
    try {
      await BookAppointment(property._id, property.agent._id, {
        date: selectedDetails.date,
        time: selectedDetails.time,
        ...formData
      });

      // Clear the selection for the next use
      setSelectedDetails({ date: null, time: null });
      // closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(appointmentSchema)
  })

  const handleErr = (err) => {
    const firstEr = Object.values(err)[0].message
    toast.error(firstEr)
  }


  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen shadow-xl">
      <div className="relative h-[300 md:h-[450px] w-full overflow-hidden">


        {/* Modal Components */}
        <Modal
          isOpen={modalOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              zIndex: 1000,
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              top: "30px",
              left: "auto",
              right: "auto",
              bottom: "10px",
              borderRadius: "28px",
              padding: "0",
              width: "90%",
              maxWidth: "800px",
              maxHeight: "85vh", // Limits height to 85% of viewport
              border: "none",
              backgroundColor: "#ffffff",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              overflow: "scroll", // Parent stays clean
              display: "flex",
              flexDirection: "column",
            },
          }}
          contentLabel="Book Appointment Modal"
        >
          {/* Sticky Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Book Appointment</h2>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">Secure your slot</p>
            </div>
            <button
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ... inside the Modal ... */}
          <form onSubmit={handleSubmit(submitData, handleErr)}>
            <div className="overflow-y-auto px-8 py-1 scrollbar-thin">
              <div className="space-y-6"> {/* Reduced spacing for better fit */}

                {/* 1. Date/Time Selector - Ensure buttons inside this have type="button" */}
                <section>
                  <AppointmentBooking
                    availableSlots={property.availableSlots}
                    onSelectionChange={setSelectedDetails}
                  />
                </section>

                {/* 2. Input Group */}
                <section className="space-y-4 border-t border-slate-50 pt-4">
                  <div className="group">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      defaultValue={userInfo?.fullName} // Use defaultValue for managed forms
                      className="w-full py-2 bg-transparent border-b border-slate-100 focus:border-blue-500 transition-colors outline-none text-sm text-slate-800"
                      {...register("name")}
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="user@example.com"
                      defaultValue={userInfo?.email}
                      {...register("email")}
                      className="w-full py-2 bg-transparent border-b border-slate-100 focus:border-blue-500 transition-colors outline-none text-sm text-slate-800"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter ml-1">Notes</label>
                    <textarea
                      placeholder="Anything else?"
                      rows="2"
                      {...register("message")}
                      className="w-full mt-1 p-3 bg-slate-50 rounded-xl outline-none text-sm text-slate-800 resize-none focus:ring-1 focus:ring-slate-200"
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="p-8 border-t border-slate-50 bg-white">
              <button
                className="w-full py-4 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-xl"
                type="submit" // This is the ONLY button that should have type="submit"
                disabled={loadBooking}
              >
                {loadBooking ? "Booking Appointment...." : "Confirm Appointment"}
              </button>
            </div>
          </form>
          {/* Scrollable Body */}
        </Modal>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4">
          <button
            onClick={onBack}
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent p-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded-md">
                {property.propertyType}
              </span>
              <h1 className="text-3xl font-black text-white mt-2">{property.title}</h1>
              <div className="flex items-center gap-1 text-slate-200 mt-1">
                <MapPin size={16} />
                <span className="font-medium">{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-800 text-xs font-bold uppercase">Price</p>
              <p className="text-3xl font-black text-white">₦{property.price?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-8">
          <div className="flex gap-6 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-2 rounded-lg text-indigo-600">
                <BedDouble size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Bedrooms</p>
                <p className="font-bold text-slate-800">{property.bedrooms} Rooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-2 rounded-lg text-indigo-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Posted</p>
                <p className="font-bold text-slate-800">
                  {new Date(property.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-black text-slate-800 mb-3 uppercase tracking-tight">Description</h3>
            <p className="text-slate-600 leading-relaxed italic">
              "{property.description}"
            </p>
          </div>

          {/* Available Slots */}
          <div>
            <h3 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tight">Available Viewing Slots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.availableSlots?.map((slot, index) => (
                <div key={slot._id} className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                  <div className="flex items-center gap-3 text-indigo-600 mb-2">
                    <Calendar size={18} />
                    <span className="font-bold">Slot {index + 1}</span>
                  </div>
                  <p className="text-slate-700 font-medium">
                    {new Date(slot.date).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-slate-600 text-sm font-medium flex flex-wrap gap-2">
                    {slot.times.length > 0 ? (
                      slot.times.map((time, i) => (
                        <span key={i} className="flex items-center">
                          {time}
                          {i < slot.times.length - 1 && <span className="ml-2 text-slate-300">•</span>}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic">No slots</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">ID: {slot._id}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 sticky top-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Listed By</h3>

            <div className="flex flex-col items-center text-center">
              <img
                src={property?.agent?.profileImage}
                alt={property?.agent?.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
              />
              <h4 className="text-xl font-bold text-slate-800">{property?.agent?.fullName}</h4>
              <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm mb-4">
                <Building2 size={14} />
                <span>{property?.agent?.agencyName}</span>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <a
                href={`tel:${property?.agent?.phone}`}
                className="flex items-center gap-3 w-full p-3 bg-white rounded-xl border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 transition-all"
              >
                <Phone size={18} className="text-indigo-600" />
                <span className="text-sm font-bold">{property?.agent?.phone}</span>
              </a>
              <a
                href={`mailto:${property?.agent?.email}`}
                className="flex items-center gap-3 w-full p-3 bg-white rounded-xl border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 transition-all"
              >
                <Mail size={18} className="text-indigo-600" />
                <span className="text-sm font-bold truncate">{property?.agent?.email}</span>
              </a>
            </div>

            <button className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors" onClick={openModal}>
              Book Appointment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetail;