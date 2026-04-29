

import React, { useState } from "react";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    pay: "",
    location: "",
    contact: "",
    type: "",
    skills: [],
    employmentType: "",
    duration: "",
    experienceLevel: "",
    postedDate: ""
  });



  const handleInput = (e: React.FormEvent<any>) => {
    setForm({...form, [e.currentTarget.name]: e.currentTarget.value})
  };

  const handleSubmit = (e:React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log(form);
    alert("Job posted successfully!");
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r  from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-400 hover:to-yellow-500 p-6">
            <h2 className="text-3xl font-bold text-red-100">Post a Hustle</h2>
            <p className="text-red-100 mt-2">Fill in the details to create your job listing</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                name="title"
                value={form.title}
                onInput={handleInput}
                placeholder="e.g., Freelance Designer, Delivery Driver"
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder-gray-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onInput={handleInput}
                placeholder="Describe the job, requirements, and responsibilities..."
                required
                rows={4}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder-gray-500 resize-none"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pay */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pay Rate ($) *
                </label>
                <input
                  name="pay"
                  type="text"
                  value={form.pay}
                  onInput={handleInput}
                  placeholder="Pay"
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder-gray-500"
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={form.employmentType}
                  onInput={handleInput}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option value="">Select type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="gig">Gig</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location *
              </label>
              <input
                name="location"
                value={form.location}
                onInput={handleInput}
                placeholder="e.g., Lagos, Remote, Abuja"
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder-gray-500"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onInput={handleInput}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option value="">Select level</option>
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                  <option value="any">Any Level</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration
                </label>
                <input
                  name="duration"
                  value={form.duration}
                  onInput={handleInput}
                  placeholder="e.g., 3 months, Ongoing"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder-gray-500"
                />
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Information *
              </label>
              <input
                name="contact"
                value={form.contact}
                onInput={handleInput}
                placeholder="Email, phone, or preferred contact method"
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder-gray-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-amber-400 via-yellow-300 to-amber-400 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Post Hustle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;