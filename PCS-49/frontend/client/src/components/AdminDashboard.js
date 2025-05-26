import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  // Fetch all assessments when component mounts
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/assessments');

        if (!response.ok) {
          throw new Error('Failed to fetch assessments');
        }

        const data = await response.json();
        setAssessments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  // Fetch a single assessment by ID
  const fetchAssessmentDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/assessments/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch assessment details');
      }

      const data = await response.json();
      setSelectedAssessment(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="max-w-4xl mx-auto bg-red-900/30 p-6 rounded-lg border border-red-700">
          <h2 className="text-2xl font-bold text-red-300">Error</h2>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
          Admin Dashboard - Mental Health Assessments
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Assessment List */}
          <div className="lg:w-1/3 bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-indigo-300">
              Submissions ({assessments.length})
            </h2>

            {assessments.length === 0 ? (
              <p className="text-gray-400">No assessments submitted yet.</p>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {assessments.map((assessment) => (
                  <div
                    key={assessment._id}
                    className={`p-4 rounded-lg cursor-pointer transition ${selectedAssessment && selectedAssessment._id === assessment._id
                        ? 'bg-indigo-900/50 border border-indigo-700'
                        : 'bg-slate-800/80 border border-slate-700 hover:border-indigo-600/50'
                      }`}
                    onClick={() => fetchAssessmentDetails(assessment._id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {assessment.firstName} {assessment.lastName}
                        </h3>
                        <p className="text-gray-400 text-sm">{assessment.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(assessment.submittedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assessment Details */}
          <div className="lg:w-2/3 bg-slate-800 rounded-xl p-6 border border-slate-700">
            {!selectedAssessment ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>Select an assessment to view details</p>
              </div>
            ) : (
              <div className="max-h-[80vh] overflow-y-auto pr-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-300">
                    {selectedAssessment.firstName} {selectedAssessment.lastName}
                  </h2>
                  <span className="text-sm text-gray-400">
                    Submitted on {formatDate(selectedAssessment.submittedAt)}
                  </span>
                </div>

                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Name</p>
                      <p>{selectedAssessment.firstName} {selectedAssessment.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Age</p>
                      <p>{selectedAssessment.age}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Gender</p>
                      <p className="capitalize">{selectedAssessment.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p>{selectedAssessment.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p>{selectedAssessment.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Emotional Assessment */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
                    Emotional Wellbeing
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">Current Mood</p>
                      <p className="capitalize">{selectedAssessment.currentMood?.replace(/-/g, ' ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Mood Patterns</p>
                      <p className="capitalize">{selectedAssessment.moodPatterns?.replace(/-/g, ' ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Sleep Quality</p>
                      <p className="capitalize">{selectedAssessment.sleepQuality?.replace(/-/g, ' ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Energy Levels</p>
                      <p className="capitalize">{selectedAssessment.energyLevels?.replace(/-/g, ' ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Appetite Changes</p>
                      <p className="capitalize">{selectedAssessment.appetiteChanges?.replace(/-/g, ' ') || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Symptom Assessment */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
                    Symptom Assessment
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400">Anxiety Level (1-10)</p>
                      <div className="mt-1 flex items-center">
                        <div className="w-full bg-slate-700 h-2 rounded-full">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(parseInt(selectedAssessment.anxietyLevel) || 0) * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium">{selectedAssessment.anxietyLevel || '0'}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Depression Level (1-10)</p>
                      <div className="mt-1 flex items-center">
                        <div className="w-full bg-slate-700 h-2 rounded-full">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${(parseInt(selectedAssessment.depressionLevel) || 0) * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium">{selectedAssessment.depressionLevel || '0'}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Stress Level (1-10)</p>
                      <div className="mt-1 flex items-center">
                        <div className="w-full bg-slate-700 h-2 rounded-full">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${(parseInt(selectedAssessment.stressLevel) || 0) * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium">{selectedAssessment.stressLevel || '0'}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Focus Issues (1-10)</p>
                      <div className="mt-1 flex items-center">
                        <div className="w-full bg-slate-700 h-2 rounded-full">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${(parseInt(selectedAssessment.focusIssues) || 0) * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium">{selectedAssessment.focusIssues || '0'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400">Thought Patterns</p>
                    {selectedAssessment.thoughtPatterns ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedAssessment.thoughtPatterns.split(',').map((pattern, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-slate-700 rounded-full text-sm"
                          >
                            {pattern.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p>None selected</p>
                    )}
                  </div>
                </div>

                {/* Continue with the rest of the sections... */}
                {/* Life Circumstances */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
                    Life Circumstances
                  </h3>
                  {/* Content here */}
                </div>

                {/* Treatment History */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
                    Treatment History
                  </h3>
                  {/* Content here */}
                </div>

                {/* Goals and Preferences */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
                    Goals and Preferences
                  </h3>
                  {/* Content here */}
                </div>

                {/* Contact Consent */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
                    Consent Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded mr-2 ${selectedAssessment.consentToContact ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p>{selectedAssessment.consentToContact ? 'Has consented to be contacted' : 'Has not consented to be contacted'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded mr-2 ${selectedAssessment.consentToShare ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p>{selectedAssessment.consentToShare ? 'Has consented to information sharing' : 'Has not consented to information sharing'}</p>
                    </div>

                    {(selectedAssessment.emergencyContact || selectedAssessment.emergencyPhone) && (
                      <div>
                        <p className="text-gray-400 mt-4">Emergency Contact</p>
                        <p>{selectedAssessment.emergencyContact || 'Not provided'}</p>
                        <p>{selectedAssessment.emergencyPhone || 'No phone provided'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;