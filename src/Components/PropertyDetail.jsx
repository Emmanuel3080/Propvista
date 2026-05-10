import React from 'react';
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

const PropertyDetail = ({ property, onBack }) => {
  if (!property) return <div className="p-10 text-center">Loading property details...</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen shadow-xl">
      <div className="relative h-[300 md:h-[450px] w-full overflow-hidden">
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
                  <p className="text-xs text-slate-400 mt-1">ID: {slot._id}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Agent Info Card */}
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

            <button className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetail;