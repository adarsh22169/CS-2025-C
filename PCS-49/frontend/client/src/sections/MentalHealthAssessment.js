import React, { useState } from 'react';

function MentalHealthAssessment() {
  // State to track form completion and current step
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',

    // Emotional Assessment
    currentMood: '',
    moodPatterns: '',
    sleepQuality: '',
    energyLevels: '',
    appetiteChanges: '',

    // Symptom Assessment
    anxietyLevel: '',
    depressionLevel: '',
    stressLevel: '',
    focusIssues: '',
    thoughtPatterns: '',

    // Life Circumstances
    recentLifeChanges: '',
    supportSystem: '',
    copingMechanisms: '',
    workSchoolStress: '',
    relationshipIssues: '',

    // Treatment History
    previousDiagnosis: '',
    currentTreatments: '',
    medications: '',
    therapyExperience: '',

    // Goals and Preferences
    primaryGoals: '',
    preferredApproach: '',
    additionalInfo: '',

    // Consent
    consentToContact: false,
    consentToShare: false,
    emergencyContact: '',
    emergencyPhone: '',
  });

  // Updates form data when input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');






    try {
      // Send data to your backend API
      const response = await fetch('http://localhost:5000/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setErrorMessage('There was an error submitting your assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Move to next form step
  const nextStep = () => {
    setFormStep(formStep + 1);
    window.scrollTo(0, 0);
  };

  // Move to previous form step
  const prevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };

  // Rating scale component for consistent UI
  const RatingScale = ({ name, value, onChange, label }) => (
    <div className="mb-6">
      <label className="block text-indigo-300 mb-2">{label}</label>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Not at all</span>
        <div className="flex gap-3 mx-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <label key={num} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={num}
                checked={parseInt(value) === num}
                onChange={onChange}
                className="sr-only"
              />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${parseInt(value) === num
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}>
                {num}
              </div>
            </label>
          ))}
        </div>
        <span className="text-sm text-gray-400">Severe</span>
      </div>
    </div>
  );

  // Render form based on current step
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                Personal Information
              </h3>
              <p className="text-gray-400 mt-2">
                Please provide your basic information to get started
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-indigo-300 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>

              <div>
                <label className="block text-indigo-300 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>

              <div>
                <label className="block text-indigo-300 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  min="10"
                  max="100"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>

              <div>
                <label className="block text-indigo-300 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-indigo-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>

              <div>
                <label className="block text-indigo-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                Emotional Wellbeing
              </h3>
              <p className="text-gray-400 mt-2">
                Help us understand your current emotional state
              </p>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">How would you describe your current mood?</label>
                <select
                  name="currentMood"
                  value={formData.currentMood}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select your current mood</option>
                  <option value="happy">Happy/Content</option>
                  <option value="neutral">Neutral</option>
                  <option value="sad">Sad/Down</option>
                  <option value="anxious">Anxious/Worried</option>
                  <option value="irritable">Irritable/Angry</option>
                  <option value="numb">Emotionally Numb</option>
                  <option value="mixed">Mixed Emotions</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Have you noticed any patterns in your mood over the past two weeks?</label>
                <select
                  name="moodPatterns"
                  value={formData.moodPatterns}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="stable">Mostly stable</option>
                  <option value="morning-worse">Worse in the mornings</option>
                  <option value="evening-worse">Worse in the evenings</option>
                  <option value="rapid-changes">Rapid mood changes throughout the day</option>
                  <option value="gradual-decline">Gradually declining</option>
                  <option value="gradual-improvement">Gradually improving</option>
                  <option value="situation-dependent">Changes based on situations</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">How would you rate your sleep quality over the past two weeks?</label>
                <select
                  name="sleepQuality"
                  value={formData.sleepQuality}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="excellent">Excellent - sleeping well consistently</option>
                  <option value="good">Good - occasional sleep issues</option>
                  <option value="fair">Fair - frequent difficulty falling or staying asleep</option>
                  <option value="poor">Poor - significant sleep problems most nights</option>
                  <option value="very-poor">Very poor - severe insomnia or sleeping too much</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">How would you describe your energy levels throughout the day?</label>
                <select
                  name="energyLevels"
                  value={formData.energyLevels}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="high">High energy most of the day</option>
                  <option value="moderate">Moderate energy with afternoon dips</option>
                  <option value="fluctuating">Highly fluctuating energy levels</option>
                  <option value="low">Low energy most of the time</option>
                  <option value="exhausted">Consistently exhausted</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Have you noticed any changes in your appetite or eating habits?</label>
                <select
                  name="appetiteChanges"
                  value={formData.appetiteChanges}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="none">No significant changes</option>
                  <option value="increased">Increased appetite</option>
                  <option value="decreased">Decreased appetite</option>
                  <option value="irregular">Irregular eating patterns</option>
                  <option value="binging">Binge eating episodes</option>
                  <option value="restricting">Restricting food intake</option>
                </select>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                Symptom Assessment
              </h3>
              <p className="text-gray-400 mt-2">
                Rate the severity of your symptoms over the past two weeks
              </p>
            </div>

            <div>
              <RatingScale
                name="anxietyLevel"
                value={formData.anxietyLevel}
                onChange={handleInputChange}
                label="How would you rate your anxiety levels? (1-10)"
              />

              <RatingScale
                name="depressionLevel"
                value={formData.depressionLevel}
                onChange={handleInputChange}
                label="How would you rate your feelings of sadness or depression? (1-10)"
              />

              <RatingScale
                name="stressLevel"
                value={formData.stressLevel}
                onChange={handleInputChange}
                label="How would you rate your overall stress level? (1-10)"
              />

              <RatingScale
                name="focusIssues"
                value={formData.focusIssues}
                onChange={handleInputChange}
                label="How difficult has it been to concentrate or focus? (1-10)"
              />

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Have you experienced any of the following thought patterns? (Select all that apply)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'negative-self', label: 'Negative thoughts about yourself' },
                    { value: 'catastrophizing', label: 'Expecting the worst outcomes' },
                    { value: 'rumination', label: 'Dwelling on problems repeatedly' },
                    { value: 'all-or-nothing', label: 'All-or-nothing thinking' },
                    { value: 'should-statements', label: 'Rigid "should" statements' },
                    { value: 'mind-reading', label: 'Assuming you know what others think' },
                    { value: 'filtering', label: 'Focusing only on negatives' },
                    { value: 'personalization', label: 'Blaming yourself for external events' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/50 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        name="thoughtPatterns"
                        value={option.value}
                        checked={(formData.thoughtPatterns || '').includes(option.value)}
                        onChange={(e) => {
                          const currentPatterns = formData.thoughtPatterns
                            ? formData.thoughtPatterns.split(',')
                            : [];

                          let newPatterns;
                          if (e.target.checked) {
                            newPatterns = [...currentPatterns, option.value];
                          } else {
                            newPatterns = currentPatterns.filter(pattern => pattern !== option.value);
                          }

                          setFormData({
                            ...formData,
                            thoughtPatterns: newPatterns.join(',')
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                Life Circumstances
              </h3>
              <p className="text-gray-400 mt-2">
                Help us understand your current life situation and stressors
              </p>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Have you experienced any significant life changes in the past year?</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'moved', label: 'Moving to a new home' },
                    { value: 'job-change', label: 'Job change or loss' },
                    { value: 'relationship-change', label: 'Relationship changes (breakup, divorce)' },
                    { value: 'bereavement', label: 'Death of someone close' },
                    { value: 'health-issues', label: 'Health issues or injuries' },
                    { value: 'financial-problems', label: 'Financial difficulties' },
                    { value: 'academic-challenges', label: 'Academic challenges' },
                    { value: 'family-conflict', label: 'Family conflicts or changes' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/50 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        name="recentLifeChanges"
                        value={option.value}
                        checked={(formData.recentLifeChanges || '').includes(option.value)}
                        onChange={(e) => {
                          const currentChanges = formData.recentLifeChanges
                            ? formData.recentLifeChanges.split(',')
                            : [];

                          let newChanges;
                          if (e.target.checked) {
                            newChanges = [...currentChanges, option.value];
                          } else {
                            newChanges = currentChanges.filter(change => change !== option.value);
                          }

                          setFormData({
                            ...formData,
                            recentLifeChanges: newChanges.join(',')
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">How would you describe your current support system?</label>
                <select
                  name="supportSystem"
                  value={formData.supportSystem}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="strong">Strong and reliable support network</option>
                  <option value="adequate">Adequate support from a few people</option>
                  <option value="limited">Limited support available</option>
                  <option value="isolated">Feeling isolated with minimal support</option>
                  <option value="negative">Support network exists but is negative/harmful</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">What coping mechanisms do you currently use when feeling stressed or overwhelmed?</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'exercise', label: 'Physical exercise' },
                    { value: 'meditation', label: 'Meditation/Mindfulness' },
                    { value: 'creative', label: 'Creative activities (art, music, writing)' },
                    { value: 'social', label: 'Talking with friends/family' },
                    { value: 'nature', label: 'Spending time in nature' },
                    { value: 'substances', label: 'Using substances (alcohol, drugs)' },
                    { value: 'avoidance', label: 'Avoiding problems/distracting myself' },
                    { value: 'professional', label: 'Seeking professional help' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/50 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        name="copingMechanisms"
                        value={option.value}
                        checked={(formData.copingMechanisms || '').includes(option.value)}
                        onChange={(e) => {
                          const currentMechanisms = formData.copingMechanisms
                            ? formData.copingMechanisms.split(',')
                            : [];

                          let newMechanisms;
                          if (e.target.checked) {
                            newMechanisms = [...currentMechanisms, option.value];
                          } else {
                            newMechanisms = currentMechanisms.filter(mechanism => mechanism !== option.value);
                          }

                          setFormData({
                            ...formData,
                            copingMechanisms: newMechanisms.join(',')
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">How would you rate your current stress level at work/school?</label>
                <select
                  name="workSchoolStress"
                  value={formData.workSchoolStress}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="minimal">Minimal - handling responsibilities well</option>
                  <option value="moderate">Moderate - sometimes challenging but manageable</option>
                  <option value="high">High - frequently feeling overwhelmed</option>
                  <option value="severe">Severe - constant pressure and inability to cope</option>
                  <option value="na">Not applicable (not in work/school)</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Are you experiencing any significant relationship issues?</label>
                <select
                  name="relationshipIssues"
                  value={formData.relationshipIssues}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="none">No significant issues</option>
                  <option value="family">Family relationship issues</option>
                  <option value="romantic">Romantic relationship issues</option>
                  <option value="friendship">Friendship issues</option>
                  <option value="multiple">Multiple relationship issues</option>
                </select>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                Treatment History
              </h3>
              <p className="text-gray-400 mt-2">
                Information about your previous mental health care
              </p>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Have you been previously diagnosed with any mental health conditions?</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'depression', label: 'Depression' },
                    { value: 'anxiety', label: 'Anxiety Disorder' },
                    { value: 'bipolar', label: 'Bipolar Disorder' },
                    { value: 'adhd', label: 'ADHD/ADD' },
                    { value: 'ptsd', label: 'PTSD' },
                    { value: 'ocd', label: 'OCD' },
                    { value: 'eating-disorder', label: 'Eating Disorder' },
                    { value: 'other', label: 'Other' },
                    { value: 'none', label: 'No previous diagnosis' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/50 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        name="previousDiagnosis"
                        value={option.value}
                        checked={(formData.previousDiagnosis || '').includes(option.value)}
                        onChange={(e) => {
                          const currentDiagnoses = formData.previousDiagnosis
                            ? formData.previousDiagnosis.split(',')
                            : [];

                          let newDiagnoses;
                          if (e.target.checked) {
                            // If "none" is selected, uncheck all others
                            if (option.value === 'none') {
                              newDiagnoses = ['none'];
                            } else {
                              // If another option is selected, remove "none" if present
                              newDiagnoses = [...currentDiagnoses.filter(d => d !== 'none'), option.value];
                            }
                          } else {
                            newDiagnoses = currentDiagnoses.filter(diagnosis => diagnosis !== option.value);
                          }

                          setFormData({
                            ...formData,
                            previousDiagnosis: newDiagnoses.join(',')
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Are you currently receiving any mental health treatment?</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'therapy', label: 'Therapy/Counseling' },
                    { value: 'medication', label: 'Medication Management' },
                    { value: 'support-group', label: 'Support Group' },
                    { value: 'alternative', label: 'Alternative Treatments' },
                    { value: 'inpatient', label: 'Inpatient Treatment' },
                    { value: 'outpatient', label: 'Intensive Outpatient Program' },
                    { value: 'self-help', label: 'Self-help Resources' },
                    { value: 'none', label: 'No current treatment' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/50 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        name="currentTreatments"
                        value={option.value}
                        checked={(formData.currentTreatments || '').includes(option.value)}
                        onChange={(e) => {
                          const currentTreatments = formData.currentTreatments
                            ? formData.currentTreatments.split(',')
                            : [];

                          let newTreatments;
                          if (e.target.checked) {
                            // If "none" is selected, uncheck all others
                            if (option.value === 'none') {
                              newTreatments = ['none'];
                            } else {
                              // If another option is selected, remove "none" if present
                              newTreatments = [...currentTreatments.filter(t => t !== 'none'), option.value];
                            }
                          } else {
                            newTreatments = currentTreatments.filter(treatment => treatment !== option.value);
                          }

                          setFormData({
                            ...formData,
                            currentTreatments: newTreatments.join(',')
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Are you currently taking any medications for mental health?</label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  placeholder="Please list any medications you're taking for mental health (name and dosage if known). Write 'None' if not applicable."
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition h-24"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">How would you describe your experience with mental health therapy (if any)?</label>
                <select
                  name="therapyExperience"
                  value={formData.therapyExperience}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="positive">Positive and helpful</option>
                  <option value="mixed">Mixed results</option>
                  <option value="negative">Not helpful</option>
                  <option value="ongoing">Currently in therapy</option>
                  <option value="none">No previous therapy experience</option>
                </select>
              </div>
            </div>
          </>
        );

      case 6:
        return (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                Goals and Preferences
              </h3>
              <p className="text-gray-400 mt-2">
                Help us understand what you're hoping to achieve
              </p>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">What are your primary goals for mental health support? (Select up to 3)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'reduce-anxiety', label: 'Reduce anxiety' },
                    { value: 'manage-depression', label: 'Manage depression' },
                    { value: 'improve-relationships', label: 'Improve relationships' },
                    { value: 'cope-stress', label: 'Cope with stress' },
                    { value: 'process-trauma', label: 'Process trauma' },
                    { value: 'self-discovery', label: 'Self-discovery/identity' },
                    { value: 'improve-focus', label: 'Improve focus/productivity' },
                    { value: 'build-confidence', label: 'Build self-esteem/confidence' },
                    { value: 'develop-skills', label: 'Develop coping skills' },
                    { value: 'crisis-support', label: 'Get through a current crisis' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/50 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        name="primaryGoals"
                        value={option.value}
                        checked={(formData.primaryGoals || '').includes(option.value)}
                        onChange={(e) => {
                          const currentGoals = formData.primaryGoals
                            ? formData.primaryGoals.split(',')
                            : [];

                          let newGoals;
                          if (e.target.checked) {
                            newGoals = [...currentGoals, option.value];
                            // Limit to 3 selections
                            if (newGoals.length > 3) {
                              newGoals = newGoals.slice(-3);
                            }
                          } else {
                            newGoals = currentGoals.filter(goal => goal !== option.value);
                          }

                          setFormData({
                            ...formData,
                            primaryGoals: newGoals.join(',')
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">What type of mental health support approach appeals to you most?</label>
                <select
                  name="preferredApproach"
                  value={formData.preferredApproach}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                >
                  <option value="">Select an option</option>
                  <option value="cbt">Cognitive-Behavioral (practical, skills-based)</option>
                  <option value="insight">Insight-oriented (understanding patterns)</option>
                  <option value="mindfulness">Mindfulness/meditation-based approaches</option>
                  <option value="solution">Solution-focused (specific goals)</option>
                  <option value="holistic">Holistic/integrative approaches</option>
                  <option value="tech">Technology-based solutions</option>
                  <option value="unsure">Unsure/open to recommendations</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Is there anything else you'd like to share about your mental health needs?</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Share any additional information that might help us understand your situation better..."
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition h-32"
                ></textarea>
              </div>
            </div>
          </>
        );

      case 7:
        return (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                Consent and Emergency Contact
              </h3>
              <p className="text-gray-400 mt-2">
                Final information and permissions
              </p>
            </div>

            <div>
              <div className="mb-6">
                <label className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/20 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="consentToContact"
                    checked={formData.consentToContact}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-indigo-300 font-medium">Consent to Contact</span>
                    <p className="text-gray-400 text-sm mt-1">
                      I give permission for MindCare to contact me via email or phone regarding my assessment results,
                      treatment recommendations, and appointment scheduling.
                    </p>
                  </div>
                </label>
              </div>

              <div className="mb-6">
                <label className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-indigo-500/20 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="consentToShare"
                    checked={formData.consentToShare}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-indigo-300 font-medium">Consent to Share Information</span>
                    <p className="text-gray-400 text-sm mt-1">
                      I understand that my information will be kept confidential and only shared with the healthcare
                      professionals directly involved in my care. My information will be handled according to
                      applicable privacy laws and regulations.
                    </p>
                  </div>
                </label>
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Emergency Contact Name (Optional)</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Name of someone we can contact in case of emergency"
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-indigo-300 mb-2">Emergency Contact Phone (Optional)</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  placeholder="Phone number of your emergency contact"
                  className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>

              <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30 mb-6">
                <p className="text-indigo-300 text-sm">
                  <strong>Important:</strong> If you are experiencing a mental health emergency or having thoughts of harming yourself or others,
                  please call emergency services (911), go to your nearest emergency room, or contact a crisis helpline immediately:
                </p>
                <p className="text-indigo-200 text-sm mt-2">
                  National Suicide Prevention Lifeline: 988 or 1-800-273-8255<br />
                  Crisis Text Line: Text HOME to 741741
                </p>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Render success message after form submission
  const renderSuccessMessage = () => (
    <div className="text-center py-12 px-6">
      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
        Assessment Submitted Successfully
      </h3>

      <p className="text-gray-300 mb-8 max-w-md mx-auto">
        Thank you for completing your mental health assessment. Our team will review your information and reach out to you within 24-48 hours.
      </p>

      <div className="max-w-md mx-auto bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h4 className="text-xl font-semibold mb-3 text-indigo-300">What happens next?</h4>
        <ul className="text-gray-400 text-left space-y-3">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Your information is securely stored and reviewed by our mental health professionals</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>You'll receive an email to schedule your initial consultation</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>We'll create a personalized care plan based on your assessment</span>
          </li>
        </ul>
      </div>

      <a
        href="/"
        className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-indigo-700 to-violet-700 font-medium rounded-lg shadow-lg shadow-indigo-700/30 hover:shadow-indigo-600/50 transition-all duration-300 transform hover:-translate-y-1"
      >
        Return to Homepage
      </a>
    </div>
  );

  // Progress bar component
  const ProgressBar = () => {
    const totalSteps = 7;
    const percentage = (formStep / totalSteps) * 100;

    return (
      <div className="mb-10">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Step {formStep} of {totalSteps}</span>
          <span>{Math.round(percentage)}% Complete</span>
        </div>
      </div>
    );
  };

  const ErrorAlert = () => {
    if (!errorMessage) return null;

    return (
      <div className="bg-red-900/30 p-4 rounded-lg border border-red-700/30 mb-6">
        <p className="text-red-300 text-sm">{errorMessage}</p>
      </div>
    );
  };

  return (
    <section className="relative py-20 px-5 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white min-h-screen">
      {/* Background Effects (same as in MindcareServices.js) */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-64 h-64 rounded-full bg-blue-600 blur-3xl -top-10 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-700 blur-3xl top-1/3 -right-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-80 h-80 rounded-full bg-violet-800 blur-3xl bottom-0 left-1/4 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* CSS Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute w-20 h-20 border border-white/20 rounded-xl top-20 left-10 animate-float rotate-12 opacity-30"></div>
      <div className="absolute w-16 h-16 border border-white/20 rounded-xl bottom-40 right-20 animate-float rotate-45 opacity-30" style={{ animationDelay: '3s' }}></div>
      <div className="absolute w-24 h-24 border border-white/20 rounded-xl top-1/2 left-1/3 animate-float -rotate-12 opacity-30" style={{ animationDelay: '1.5s' }}></div>

      {/* Add required keyframes animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        {!isComplete && (
          <div className="text-center mb-10">
            <div className="inline-block px-6 py-2 bg-indigo-900/50 backdrop-blur-sm rounded-full mb-4 border border-indigo-700/50">
              <span className="text-indigo-300 font-medium tracking-wide">MindCare Assessment</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
              Mental Health Assessment
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Complete this confidential assessment to help us understand your mental health needs
              and create a personalized care plan for you.
            </p>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl">
          {isComplete ? (
            renderSuccessMessage()
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Progress bar */}
              {formStep > 0 && <ProgressBar />}

              {/* Error message */}
              <ErrorAlert />

              {/* Form steps */}
              {renderFormStep()}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-10">
                {formStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all duration-300"
                  >
                    Previous
                  </button>
                )}

                {formStep < 7 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-indigo-700 to-violet-700 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`ml-auto px-8 py-3 bg-gradient-to-r from-indigo-700 to-violet-700 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Assessment'
                    )}
                  </button>
                )}
              </div>

              {/* Privacy note */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  Your privacy is important to us. All information provided is encrypted and handled according to our
                  <a href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 ml-1">Privacy Policy</a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default MentalHealthAssessment;