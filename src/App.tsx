import React from 'react';
import MultiStepForm from './components/MultiStepForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="px-4 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            DealFounders Business Analyser
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get a comprehensive analysis of your business acquisition opportunity. Our expert system will evaluate your deal and provide actionable insights.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              How to Use this Business Analyser
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <p className="text-gray-200 text-lg">
                  Answer some basic questions about you and business
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <p className="text-gray-200 text-lg">
                  Upload the documents
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <p className="text-gray-200 text-lg">
                  You will receive an email with the completed report in 10 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
}

export default App;