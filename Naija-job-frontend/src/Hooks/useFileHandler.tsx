import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface HandleFileChangeParams {
  e: React.ChangeEvent<HTMLInputElement>;
  maxSizeMB?: number;
  fieldName?: string;
}

interface UseFileHandlerProps {
  setErrors: Dispatch<SetStateAction<any>>;
  setFormData: Dispatch<SetStateAction<any>>;
}

interface UseFileHandlerReturn {
  handleFileChange: (params: HandleFileChangeParams) => void;
  removeFile: (fieldName?: string) => void;
}

function useFileHandler({ setErrors, setFormData }: UseFileHandlerProps): UseFileHandlerReturn {
  const handleFileChange = useCallback(({
    e,
    maxSizeMB = 5,
    fieldName = 'resumeFile'
  }: HandleFileChangeParams) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      
      if (file.size > maxSizeBytes) {
        setErrors((prev: any) => ({ 
          ...prev, 
          [fieldName]: `File size must be less than ${maxSizeMB}MB` 
        }));
        return;
      }
      
      setFormData((prev: any) => ({ ...prev, [fieldName]: file }));
      setErrors((prev: any) => ({ ...prev, [fieldName]: '' }));
    }
  }, [setErrors, setFormData]);

  const removeFile = useCallback((fieldName: string = 'resumeFile') => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: null }));
    setErrors((prev: any) => ({ ...prev, [fieldName]: '' }));
  }, [setFormData, setErrors]);

  return {
    handleFileChange,
    removeFile
  };
}

export default useFileHandler;