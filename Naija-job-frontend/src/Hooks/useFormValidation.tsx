import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

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

interface UseFormValidationProps {
  formData: FormData;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
}

interface UseFormValidationReturn {
  validateStep: (step: number) => boolean;
}

function useFormValidation({ formData, setErrors }: UseFormValidationProps): UseFormValidationReturn {
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }

    if (step === 2) {
      if (!formData.currentPosition.trim()) newErrors.currentPosition = 'Current position is required';
      if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
      if (!formData.expectedSalary) newErrors.expectedSalary = 'Expected salary is required';
    }

    if (step === 3) {
      if (!formData.highestEducation) newErrors.highestEducation = 'Education level is required';
      if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
    }

    if (step === 4) {
      if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
      if (!formData.resumeFile) newErrors.resumeFile = 'Resume is required';
      if (!formData.availableStartDate) newErrors.availableStartDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, setErrors]);

  return {
    validateStep
  };
}

export default useFormValidation;