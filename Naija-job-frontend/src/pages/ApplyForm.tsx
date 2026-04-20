import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { toast } from 'sonner';
import type { FormData } from '../types/formData';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import useFileHandler from '../Hooks/useFileHandler'; 
import useFormValidation from '../Hooks/useFormValidation'; 
import { Step1, Step2, Step3, Step4 } from '../Ui/formSteps';

interface FormErrors {
  [key: string]: string;
}

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    currentPosition: '',
    yearsExperience: '',
    expectedSalary: '',
    highestEducation: '',
    fieldOfStudy: '',
    coverLetter: '',
    resumeFile: null,
    availableStartDate: '',
    noticePeriod: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const totalSteps: number = 4;

  // Initialize hooks with state
  const { handleFileChange, removeFile } = useFileHandler({ setErrors, setFormData });
  const { validateStep } = useFormValidation({ formData, setErrors });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (): void => {
    if (validateStep(currentStep)) {
      console.log('Form submitted:', formData);
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/"), 5000);
      // TODO: Send data to your backend API
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
            step === currentStep 
              ? 'bg-linear-to-r from-amber-500 to-yellow-600 text-black' 
              : step < currentStep 
                ? 'bg-emerald-500 text-white' 
                : 'bg-slate-800 text-slate-500'
          }`}>
            {step < currentStep ? <Check size={20} /> : step}
          </div>
          {index < 3 && (
            <div className={`w-12 sm:w-20 h-1 mx-2 transition-all duration-300 ${
              step < currentStep ? 'bg-emerald-500' : 'bg-slate-800'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
          {renderStepIndicator()}

          <div>
            {currentStep === 1 && (
              <Step1 
                formData={formData} 
                errors={errors} 
                handleInputChange={handleInputChange} 
              />
            )}
            {currentStep === 2 && (
              <Step2 
                formData={formData} 
                errors={errors} 
                handleInputChange={handleInputChange} 
              />
            )}
            {currentStep === 3 && (
              <Step3 
                formData={formData} 
                errors={errors} 
                handleInputChange={handleInputChange} 
              />
            )}
            {currentStep === 4 && (
              <Step4 
                formData={formData} 
                errors={errors} 
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                removeFile={removeFile}
              />
            )}

            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="flex-1 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Next
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Submit Application
                  <Check size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ApplicationForm;