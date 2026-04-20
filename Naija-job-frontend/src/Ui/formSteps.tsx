import type { ChangeEvent } from 'react';
import { User, Briefcase, GraduationCap, FileText, Upload, X } from 'lucide-react';

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentPosition: string;
  yearsExperience: string;
  expectedSalary: string;
  highestEducation: string;
  fieldOfStudy: string;
  coverLetter: string;
  resumeFile: File | null;
  availableStartDate: string;
  noticePeriod: string;
}

interface FormStepsProps {
  formData: FormData;
  errors: FormErrors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (params: { e: React.ChangeEvent<HTMLInputElement> }) => void;
  removeFile: () => void;
}

export const Step1 = ({ formData, errors, handleInputChange }: Omit<FormStepsProps, 'handleFileChange' | 'removeFile'>) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-4">
        <User size={28} className="text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
      <p className="text-slate-400">Let's start with your basic details</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
        placeholder="John Doe"
      />
      {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
        placeholder="john@example.com"
      />
      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
        placeholder="+234 800 000 0000"
      />
      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Current Location *</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.location ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
        placeholder="Lagos, Nigeria"
      />
      {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
    </div>
  </div>
);

export const Step2 = ({ formData, errors, handleInputChange }: Omit<FormStepsProps, 'handleFileChange' | 'removeFile'>) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-4">
        <Briefcase size={28} className="text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Professional Background</h2>
      <p className="text-slate-400">Tell us about your work experience</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Current/Most Recent Position *</label>
      <input
        type="text"
        name="currentPosition"
        value={formData.currentPosition}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.currentPosition ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
        placeholder="Senior Software Engineer"
      />
      {errors.currentPosition && <p className="text-red-400 text-sm mt-1">{errors.currentPosition}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Years of Experience *</label>
      <select
        name="yearsExperience"
        value={formData.yearsExperience}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.yearsExperience ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors`}
      >
        <option value="">Select experience level</option>
        <option value="0-1">Less than 1 year</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5-10">5-10 years</option>
        <option value="10+">10+ years</option>
      </select>
      {errors.yearsExperience && <p className="text-red-400 text-sm mt-1">{errors.yearsExperience}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Expected Salary (₦/month) *</label>
      <input
        type="number"
        name="expectedSalary"
        value={formData.expectedSalary}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.expectedSalary ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
        placeholder="150000"
      />
      {errors.expectedSalary && <p className="text-red-400 text-sm mt-1">{errors.expectedSalary}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Notice Period</label>
      <input
        type="text"
        name="noticePeriod"
        value={formData.noticePeriod}
        onChange={handleInputChange}
        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        placeholder="2 weeks, 1 month, Immediate, etc."
      />
    </div>
  </div>
);

export const Step3 = ({ formData, errors, handleInputChange }: Omit<FormStepsProps, 'handleFileChange' | 'removeFile'>) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-4">
        <GraduationCap size={28} className="text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Education</h2>
      <p className="text-slate-400">Share your educational background</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Highest Education Level *</label>
      <select
        name="highestEducation"
        value={formData.highestEducation}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.highestEducation ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors`}
      >
        <option value="">Select education level</option>
        <option value="high-school">High School</option>
        <option value="associate">Associate Degree</option>
        <option value="bachelor">Bachelor's Degree</option>
        <option value="master">Master's Degree</option>
        <option value="phd">PhD</option>
        <option value="other">Other</option>
      </select>
      {errors.highestEducation && <p className="text-red-400 text-sm mt-1">{errors.highestEducation}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Field of Study *</label>
      <input
        type="text"
        name="fieldOfStudy"
        value={formData.fieldOfStudy}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.fieldOfStudy ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
        placeholder="Computer Science, Business Administration, etc."
      />
      {errors.fieldOfStudy && <p className="text-red-400 text-sm mt-1">{errors.fieldOfStudy}</p>}
    </div>
  </div>
);

export const Step4 = ({ formData, errors, handleInputChange, handleFileChange, removeFile }: FormStepsProps) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-4">
        <FileText size={28} className="text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Final Details</h2>
      <p className="text-slate-400">Almost done! Just a few more things</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Cover Letter *</label>
      <textarea
        name="coverLetter"
        value={formData.coverLetter}
        onChange={handleInputChange}
        rows={6}
        className={`w-full bg-slate-800/50 border ${errors.coverLetter ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors resize-none`}
        placeholder="Tell us why you're the perfect fit for this role..."
      />
      {errors.coverLetter && <p className="text-red-400 text-sm mt-1">{errors.coverLetter}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Upload Resume/CV *</label>
      <div className={`border-2 border-dashed ${errors.resumeFile ? 'border-red-500' : 'border-slate-700'} rounded-xl p-6 text-center hover:border-amber-500 transition-colors`}>
        {!formData.resumeFile ? (
          <label className="cursor-pointer block">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange({ e })}
              className="hidden"
            />
            <Upload size={32} className="mx-auto text-slate-500 mb-2" />
            <p className="text-slate-400 mb-1">Click to upload or drag and drop</p>
            <p className="text-slate-600 text-sm">PDF, DOC, DOCX (max 5MB)</p>
          </label>
        ) : (
          <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-amber-400" />
              <div className="text-left">
                <p className="text-white font-medium">{formData.resumeFile.name}</p>
                <p className="text-slate-500 text-sm">
                  {(formData.resumeFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
      {errors.resumeFile && <p className="text-red-400 text-sm mt-1">{errors.resumeFile}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Available Start Date *</label>
      <input
        type="date"
        name="availableStartDate"
        value={formData.availableStartDate}
        onChange={handleInputChange}
        className={`w-full bg-slate-800/50 border ${errors.availableStartDate ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors`}
      />
      {errors.availableStartDate && <p className="text-red-400 text-sm mt-1">{errors.availableStartDate}</p>}
    </div>
  </div>
);