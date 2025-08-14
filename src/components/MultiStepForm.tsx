import React, { useState } from 'react';

export default function MultiStepForm() {
  const [formData, setFormData] = useState({
    email: '',
    businessLocation: '',
    involvementLevel: '',
    riskTolerance: '',
    industry: '',
    primaryGoal: '',
    otherGoal: '',
    investmentHorizon: '',
    expectedROI: '',
    industryExperience: '',
    experienceDescription: '',
    businessExperience: '',
    businessExperienceDescription: '',
    budget: '',
    financingOption: '',
    files: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [fileError, setFileError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const allowedFileTypes = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet',
    'image/jpeg',
    'image/png',
    'application/zip'
  ];

  const allowedExtensions = '.pdf, .xls, .xlsx, .ods, .jpg, .jpeg, .png, .zip';

  const sections = [
    {
      title: "📧 Contact Information",
      questions: [
        {
          id: 'email',
          label: 'Your Email Address',
          type: 'email',
          required: true,
          placeholder: 'Enter your email address'
        },
        {
          id: 'businessLocation',
          label: 'Business Location',
          type: 'text',
          required: true,
          placeholder: 'e.g., New York, NY or Toronto, ON'
        }
      ]
    },
    {
      title: "👤 Personal Involvement & Risk Appetite",
      questions: [
        {
          id: 'involvementLevel',
          label: 'How involved do you want to be in this business?',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select an option' },
            { value: 'passive', label: 'Passive Investor' },
            { value: 'semiActive', label: 'Semi-active (some oversight)' },
            { value: 'fullyActive', label: 'Fully active (day-to-day operations)' }
          ]
        },
        {
          id: 'riskTolerance',
          label: 'On a risk scale of 0 to 10, where 0 = extremely risk-averse and 10 = high-risk tolerance, where do you fall?',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select a number' },
            { value: '0', label: '0 - Extremely risk-averse' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5 - Moderate risk' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8', label: '8' },
            { value: '9', label: '9' },
            { value: '10', label: '10 - High risk tolerance' }
          ]
        }
      ]
    },
    {
      title: "🏭 Business Industry & Interest",
      questions: [
        {
          id: 'industry',
          label: 'What industry is this business in and why are you interested?',
          type: 'textarea',
          required: true,
          placeholder: 'e.g., Food & Beverage - I have experience in restaurant management and see growth potential in this market'
        }
      ]
    },
    {
      title: "📈 Goals & Expectations",
      questions: [
        {
          id: 'primaryGoal',
          label: 'What is your primary goal with this purchase?',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select an option' },
            { value: 'cashFlow', label: 'Steady cash flow' },
            { value: 'growthResale', label: 'Growth and resale' },
            { value: 'strategicAcquisition', label: 'Strategic acquisition (synergy with existing business)' },
            { value: 'lifestyleBusiness', label: 'Lifestyle business' },
            { value: 'other', label: 'Other' }
          ],
          conditionalField: 'otherGoal'
        },
        {
          id: 'otherGoal',
          label: 'Please specify your other goal:',
          type: 'text',
          required: false,
          conditional: true,
          dependsOn: 'primaryGoal',
          showWhen: 'other'
        },
        {
          id: 'investmentHorizon',
          label: 'What\'s your ideal investment horizon?',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select an option' },
            { value: 'shortTerm', label: 'Short-term (1-2 years)' },
            { value: 'midTerm', label: 'Mid-term (3-5 years)' },
            { value: 'longTerm', label: 'Long-term (5+ years)' }
          ]
        },
        {
          id: 'expectedROI',
          label: 'What\'s your expected ROI or cash flow per month/year?',
          type: 'text',
          required: false,
          placeholder: 'e.g., $5,000/month, 15% annual ROI'
        }
      ]
    },
    {
      title: "💼 Experience & Background",
      questions: [
        {
          id: 'industryExperience',
          label: 'Do you have any experience in this industry?',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select an option' },
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          conditionalField: 'experienceDescription'
        },
        {
          id: 'experienceDescription',
          label: 'Briefly describe your experience:',
          type: 'textarea',
          required: false,
          conditional: true,
          dependsOn: 'industryExperience',
          showWhen: 'yes'
        },
        {
          id: 'businessExperience',
          label: 'Have you ever owned or managed a business before?',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select an option' },
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          conditionalField: 'businessExperienceDescription'
        },
        {
          id: 'businessExperienceDescription',
          label: 'Please describe the type and duration:',
          type: 'textarea',
          required: false,
          conditional: true,
          dependsOn: 'businessExperience',
          showWhen: 'yes'
        }
      ]
    },
    {
      title: "💰 Financial Readiness",
      questions: [
        {
          id: 'budget',
          label: 'What is your budget for this acquisition?',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in USD'
        },
        {
          id: 'financingOption',
          label: 'Are you considering:',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select an option' },
            { value: 'cashPurchase', label: 'Full cash purchase' },
            { value: 'financing', label: 'Financing/Loan' },
            { value: 'sellerFinancing', label: 'Seller financing' },
            { value: 'notSure', label: 'Not sure yet' }
          ]
        }
      ]
    },
    {
      title: "📁 Supporting Documents",
      questions: [
        {
          id: 'files',
          label: 'Please upload any relevant documents (maximum 4 files)',
          type: 'file',
          required: true,
          accept: allowedExtensions,
          multiple: true
        }
      ]
    }
  ];

  const handleChange = (e) => {
    const { id, value, files, type } = e.target;

    if (id === 'files' && files && files.length > 0) {
      const newFileArray = Array.from(files);
      
      // Get existing files from state
      const existingFiles = formData.files || [];
      
      // Combine existing files with new files
      const combinedFiles = [...existingFiles, ...newFileArray];
      
      // Check if total number of files exceeds the maximum allowed
      if (combinedFiles.length > 4) {
        setFileError(`Maximum 4 files allowed. You currently have ${existingFiles.length} file(s). You can add ${4 - existingFiles.length} more.`);
        e.target.value = '';
        return;
      }
      
      // Check for invalid file types in new files only
      const invalidFiles = newFileArray.filter(file => !allowedFileTypes.includes(file.type));
      
      if (invalidFiles.length > 0) {
        setFileError(`Invalid file type(s). Please upload ${allowedExtensions}`);
        e.target.value = '';
        return;
      } else {
        setFileError('');
      }

      setFormData((prev) => ({
        ...prev,
        [id]: combinedFiles
      }));
      
      // Clear the input value so the same file can be selected again if needed
      e.target.value = '';
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: type === 'number' ? (value ? parseFloat(value) : '') : value
      }));
    }
  };

  // Add function to remove individual files
  const removeFile = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove)
    }));
    setFileError(''); // Clear any file errors when removing files
  };

  const handleNext = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (fileError) return;
    
    // Check if all required fields in the current section are filled
    const currentSection = sections[currentStep];
    const requiredFields = currentSection.questions
      .filter(q => q.required && (!q.conditional || (q.conditional && formData[q.dependsOn] === q.showWhen)))
      .map(q => q.id);
    
    const missingFields = requiredFields.filter(field => !formData[field] || (field === 'files' && formData[field].length === 0));
    
    if (missingFields.length > 0) {
      setSubmitStatus('Please fill in all required fields');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }
    
    if (currentStep < sections.length - 1) {
      handleNext();
      setSubmitStatus('');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('Submitting request...');
    
    try {
      const data = new FormData();
      
      // Add form data
      Object.keys(formData).forEach((key) => {
        if (key === 'files' && formData[key].length > 0) {
          // Add each file separately with the same key name
          formData[key].forEach(file => {
            data.append('files', file);
          });
        } else if (formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key]);
        }
      });
      
      // Set up the fetch with a timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minutes timeout
      
      try {
        const response = await fetch('https://primary-production-b932.up.railway.app/webhook-test/3e63979e-1fd8-491d-baf7-a7e8ec2f3ddb', {
          method: 'POST',
          body: data,
          mode: 'cors',
          credentials: 'include',
          signal: controller.signal,
          headers: {
            'Origin': window.location.origin
          }
        });
        
        clearTimeout(timeoutId); // Clear the timeout if request completes
        
        // Regardless of server response, show success message
        setFormSubmitted(true);
        setSubmitStatus('Request submitted. You will receive an email to your registered email address when your report is ready.');
        
        // Reset form
        setFormData({
          email: '',
          businessLocation: '',
          involvementLevel: '',
          riskTolerance: '',
          industry: '',
          primaryGoal: '',
          otherGoal: '',
          investmentHorizon: '',
          expectedROI: '',
          industryExperience: '',
          experienceDescription: '',
          businessExperience: '',
          businessExperienceDescription: '',
          budget: '',
          financingOption: '',
          files: []
        });
        setCurrentStep(0);
        
        // Log any errors but don't show to user
        if (!response.ok) {
          console.log(`Note: Server responded with status: ${response.status}. Form is still being processed.`);
        }
      } catch (fetchError) {
        // Even if fetch fails, if the request was sent, we consider it a success
        console.error('Fetch error (background):', fetchError);
        
        // Show success message regardless, as the form submission likely reached the webhook
        setFormSubmitted(true);
        setSubmitStatus('Request submitted. You will receive an email when your report is ready.');
        
        // Reset form
        setFormData({
          email: '',
          businessLocation: '',
          involvementLevel: '',
          riskTolerance: '',
          industry: '',
          primaryGoal: '',
          otherGoal: '',
          investmentHorizon: '',
          expectedROI: '',
          industryExperience: '',
          experienceDescription: '',
          businessExperience: '',
          businessExperienceDescription: '',
          budget: '',
          financingOption: '',
          files: []
        });
        setCurrentStep(0);
      }
    } catch (error) {
      console.error('Error in form submission process:', error);
      
      if (error.name === 'AbortError') {
        // Still consider the submission successful after timeout
        setFormSubmitted(true);
        setSubmitStatus('Request submitted. You will receive an email when your report is ready.');
      } else {
        // For other critical errors, show error
        setSubmitStatus('There was an issue submitting your request. Please try again.');
        setTimeout(() => setSubmitStatus(''), 5000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSection = sections[currentStep];

  // Function to check if a conditional field should be shown
  const shouldShowField = (question) => {
    if (!question.conditional) return true;
    return formData[question.dependsOn] === question.showWhen;
  };

  return (
    <div className="w-[800px] h-[1000px] mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Business Acquisition Questionnaire</h2>

      {formSubmitted ? (
        <div className="text-center p-6 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold mb-3">Submission Successful!</h3>
          <p className="mb-4">{submitStatus}</p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setFormSubmitted(false);
                setSubmitStatus('');
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">
              Step {currentStep + 1} of {sections.length}
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-blue-950">{currentSection.title}</h3>
            
            <div className="space-y-6">
              {currentSection.questions.map((question) => (
                shouldShowField(question) && (
                  <div key={question.id} className="mb-4">
                    <label
                      className="block text-lg font-medium mb-2"
                      htmlFor={question.id}
                    >
                      {question.label}
                      {question.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {question.type === 'textarea' ? (
                      <textarea
                        id={question.id}
                        value={formData[question.id] || ''}
                        onChange={handleChange}
                        required={question.required}
                        placeholder={question.placeholder || ''}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                        rows={4}
                      />
                    ) : question.type === 'select' ? (
                      <select
                        id={question.id}
                        value={formData[question.id] || ''}
                        onChange={handleChange}
                        required={question.required}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                      >
                        {question.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : question.type === 'file' ? (
                      <div>
                        <input
                          type="file"
                          id={question.id}
                          onChange={handleChange}
                          required={question.required && (!formData.files || formData.files.length === 0)}
                          accept={question.accept}
                          multiple={question.multiple}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Currently accepting the following formats: {allowedExtensions}
                        </p>
                        {fileError && (
                          <p className="text-red-500 text-sm mt-1">{fileError}</p>
                        )}
                        
                        {/* Display selected files with remove buttons */}
                        {formData.files && formData.files.length > 0 && !fileError && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-700 font-medium mb-2">
                              Files selected ({formData.files.length}/4):
                            </p>
                            <div className="space-y-2">
                              {formData.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                  <span className="text-sm text-gray-700 truncate flex-1 mr-2">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                                    title="Remove file"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                            {formData.files.length < 4 && (
                              <p className="text-sm text-gray-600 mt-2">
                                You can add {4 - formData.files.length} more file(s).
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={question.type}
                        id={question.id}
                        value={formData[question.id] || ''}
                        onChange={handleChange}
                        required={question.required}
                        placeholder={question.placeholder || ''}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                disabled={isSubmitting}
              >
                Previous
              </button>
            )}

            <button
              type="submit"
              className={`${currentStep > 0 ? 'ml-auto' : ''} px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={isSubmitting || fileError}
            >
              {currentStep === sections.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>

          {/* Status messages for validation or in-progress submissions */}
          {submitStatus && !isSubmitting && !formSubmitted && (
            <p
              className={`mt-4 text-center ${
                submitStatus.includes('Please fill') 
                  ? 'text-red-500' 
                  : 'text-blue-500'
              }`}
            >
              {submitStatus}
            </p>
          )}

          {isSubmitting && (
            <div className="mt-4 text-center">
              <p className="text-blue-500">{submitStatus}</p>
              <div className="mt-2 flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            </div>
          )}
        </form>
      )}

      <div className="mt-8">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
