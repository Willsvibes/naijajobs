
import React, { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";

interface FilterValues {
  location: string;
}

interface AroundUsProps {
  onApply: (filters: FilterValues) => void;
  currentLocation?: string;
}

const locations = ["Ikeja", "Ikotun", "Victoria Island", "Lekki", "Remote"];

const AroundUs: React.FC<AroundUsProps> = ({ onApply, currentLocation = "" }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    };

    if (modalOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalOpen]);

  const handleLocationSelect = (location: string) => {
    const newLocation = location === selectedLocation ? "" : location;
    setSelectedLocation(newLocation);
    onApply({ location: newLocation });
    setModalOpen(false);
  };

  const displayText = selectedLocation || "Around You";

  return (
      <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 px-4 py-3 bg-slate-800/30 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-colors border border-slate-700/50"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <MapPin size={18} className="text-amber-400" />
              <span className="text-sm text-slate-300 font-medium">{displayText}</span>
              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform duration-200 ${modalOpen ? "rotate-180" : ""}`}
              />
            </div>

        {modalOpen && (
          <div className="absolute top-full left-0 w-60 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur-3xl z-50 animate-fadeIn"
            // style={{
            //   top: dropdownRef.current
            //     ? `${dropdownRef.current.getBoundingClientRect().bottom + 8}px`
            //     : "0px",
            //   left: dropdownRef.current
            //     ? `${dropdownRef.current.getBoundingClientRect().left}px`
            //     : "0px",
            // }}
          >
            <div className="py-2">
              <div
                className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-all ${
                  !selectedLocation
                    ? "bg-slate-800/70 text-amber-400"
                    : "text-slate-300 hover:bg-slate-800/50"
                }`}
                onClick={() => handleLocationSelect("")}
              >
                <span className="text-sm font-medium">All Locations</span>
                {!selectedLocation && <Check size={16} className="text-amber-400" />}
              </div>

              <div className="h-px bg-slate-700/50 my-1" />

              {locations.map((location) => (
                <div
                  key={location}
                  className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-all ${
                    selectedLocation === location
                      ? "bg-slate-800/70 text-amber-400"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <span className="text-sm font-medium">{location}</span>
                  {selectedLocation === location && <Check size={16} className="text-amber-400" />}
                </div>
              ))}
            </div>
          </div>
        )

      }
    </div>
  )
}


export default AroundUs;

