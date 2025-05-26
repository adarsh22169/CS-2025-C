import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, Heart, AlertCircle, Zap, Moon, CloudRain, ArrowLeft, CheckCircle, AlertTriangle, Book, Users, Phone } from 'lucide-react';

const conditionDetails = {
  depression: {
    name: 'Depression',
    icon: <CloudRain className="w-16 h-16 text-blue-300" />,
    color: 'from-blue-900 to-blue-700',
    lightColor: 'text-blue-300',
    borderColor: 'border-blue-400/30',
    description: 'Depression is a common but serious mental health condition that significantly impacts how you feel, think, and handle daily activities.',
    detailedInfo: {
      overview: 'Major depressive disorder, commonly known as depression, affects millions of people worldwide. It\'s characterized by persistent feelings of sadness, hopelessness, and a lack of interest or pleasure in activities.',
      symptoms: [
        'Persistent sad, anxious, or "empty" mood',
        'Feelings of hopelessness or pessimism',
        'Feelings of irritability, frustration, or restlessness',
        'Feelings of guilt, worthlessness, or helplessness',
        'Loss of interest or pleasure in hobbies and activities',
        'Decreased energy, fatigue, or feeling "slowed down"',
        'Difficulty concentrating, remembering, or making decisions',
        'Difficulty sleeping, early morning awakening, or oversleeping',
        'Changes in appetite or unplanned weight changes',
        'Thoughts of death or suicide, or suicide attempts'
      ],
      causes: [
        'Genetics and family history',
        'Brain chemistry imbalances',
        'Life events and trauma',
        'Medical conditions',
        'Medications or substance abuse',
        'Seasonal changes',
        'Major life changes'
      ],
      treatments: [
        'Psychotherapy (talk therapy)',
        'Cognitive Behavioral Therapy (CBT)',
        'Interpersonal Therapy (IPT)',
        'Antidepressant medications',
        'Lifestyle changes and self-care',
        'Support groups',
        'Electroconvulsive therapy (for severe cases)',
        'Light therapy (for seasonal depression)'
      ],
      selfCare: [
        'Regular exercise and physical activity',
        'Maintaining a healthy sleep schedule',
        'Eating a balanced, nutritious diet',
        'Practicing mindfulness and meditation',
        'Staying connected with friends and family',
        'Engaging in enjoyable activities',
        'Setting realistic goals',
        'Avoiding alcohol and drugs'
      ]
    }
  },
  anxiety: {
    name: 'Anxiety Disorders',
    icon: <Zap className="w-16 h-16 text-amber-300" />,
    color: 'from-amber-900 to-amber-700',
    lightColor: 'text-amber-300',
    borderColor: 'border-amber-400/30',
    description: 'Anxiety disorders are characterized by excessive fear or anxiety that interferes with daily activities.',
    detailedInfo: {
      overview: 'Anxiety disorders are among the most common mental health conditions, affecting millions of people. While it\'s normal to feel anxious in certain situations, anxiety disorders involve persistent, excessive worry that doesn\'t go away.',
      symptoms: [
        'Excessive worrying about everyday situations',
        'Restlessness or feeling on edge',
        'Difficulty concentrating',
        'Irritability',
        'Muscle tension',
        'Sleep disturbances',
        'Rapid heartbeat or palpitations',
        'Sweating or trembling',
        'Shortness of breath',
        'Panic attacks'
      ],
      causes: [
        'Genetics and brain chemistry',
        'Environmental stress factors',
        'Traumatic experiences',
        'Medical conditions',
        'Substance abuse',
        'Personality factors',
        'Other mental health disorders'
      ],
      treatments: [
        'Cognitive Behavioral Therapy (CBT)',
        'Exposure therapy',
        'Anti-anxiety medications',
        'Antidepressants',
        'Relaxation techniques',
        'Mindfulness-based therapies',
        'Group therapy',
        'Lifestyle modifications'
      ],
      selfCare: [
        'Deep breathing exercises',
        'Progressive muscle relaxation',
        'Regular physical exercise',
        'Limiting caffeine and alcohol',
        'Getting adequate sleep',
        'Practicing mindfulness',
        'Maintaining social connections',
        'Time management strategies'
      ]
    }
  },
  ptsd: {
    name: 'Post-Traumatic Stress Disorder (PTSD)',
    icon: <AlertCircle className="w-16 h-16 text-rose-300" />,
    color: 'from-rose-900 to-rose-700',
    lightColor: 'text-rose-300',
    borderColor: 'border-rose-400/30',
    description: 'PTSD is a mental health condition triggered by experiencing or witnessing a terrifying event.',
    detailedInfo: {
      overview: 'Post-Traumatic Stress Disorder (PTSD) can develop after exposure to or witnessing traumatic events such as accidents, natural disasters, war, or violence. It affects people of all ages and backgrounds.',
      symptoms: [
        'Intrusive memories or flashbacks',
        'Nightmares about the traumatic event',
        'Severe emotional distress',
        'Avoidance of trauma reminders',
        'Negative changes in thinking and mood',
        'Changes in physical and emotional reactions',
        'Hypervigilance or being easily startled',
        'Difficulty sleeping',
        'Irritability or anger outbursts',
        'Concentration problems'
      ],
      causes: [
        'Combat exposure',
        'Physical or sexual assault',
        'Accidents or disasters',
        'Childhood abuse or neglect',
        'Witnessing violence',
        'Medical emergencies',
        'Loss of a loved one',
        'Life-threatening illness'
      ],
      treatments: [
        'Trauma-focused psychotherapy',
        'Eye Movement Desensitization and Reprocessing (EMDR)',
        'Cognitive Processing Therapy',
        'Prolonged Exposure therapy',
        'Medications (antidepressants)',
        'Group therapy',
        'Family therapy',
        'Alternative therapies (art, music therapy)'
      ],
      selfCare: [
        'Establishing a routine',
        'Staying connected with supportive people',
        'Practicing relaxation techniques',
        'Regular exercise',
        'Avoiding alcohol and drugs',
        'Getting enough sleep',
        'Joining support groups',
        'Practicing grounding techniques'
      ]
    }
  },
  'bipolar-disorder': {
    name: 'Bipolar Disorder',
    icon: <Moon className="w-16 h-16 text-violet-300" />,
    color: 'from-violet-900 to-violet-700',
    lightColor: 'text-violet-300',
    borderColor: 'border-violet-400/30',
    description: 'Bipolar disorder causes unusual shifts in mood, energy, activity levels, and concentration.',
    detailedInfo: {
      overview: 'Bipolar disorder is a mental health condition characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression). These mood swings can affect sleep, energy, activity, judgment, behavior, and thinking.',
      symptoms: [
        'Manic episodes: elevated mood, increased energy',
        'Depressive episodes: low mood, decreased energy',
        'Rapid speech and racing thoughts',
        'Decreased need for sleep during mania',
        'Poor judgment and impulsive behavior',
        'Feelings of grandiosity',
        'Difficulty concentrating',
        'Extreme irritability',
        'Psychotic symptoms in severe cases',
        'Suicidal thoughts during depressive episodes'
      ],
      causes: [
        'Genetic factors',
        'Brain structure and function differences',
        'Environmental triggers',
        'Stressful life events',
        'Substance abuse',
        'Sleep disruption',
        'Seasonal changes',
        'Medical conditions'
      ],
      treatments: [
        'Mood stabilizing medications',
        'Antipsychotic medications',
        'Antidepressants (with caution)',
        'Psychotherapy (CBT, family therapy)',
        'Interpersonal and social rhythm therapy',
        'Electroconvulsive therapy (ECT)',
        'Lifestyle management',
        'Psychoeducation'
      ],
      selfCare: [
        'Maintaining a regular sleep schedule',
        'Mood tracking and monitoring',
        'Stress management techniques',
        'Avoiding drugs and alcohol',
        'Taking medications as prescribed',
        'Building a support network',
        'Regular exercise',
        'Healthy eating habits'
      ]
    }
  },
  ocd: {
    name: 'Obsessive-Compulsive Disorder (OCD)',
    icon: <Brain className="w-16 h-16 text-emerald-300" />,
    color: 'from-emerald-900 to-emerald-700',
    lightColor: 'text-emerald-300',
    borderColor: 'border-emerald-400/30',
    description: 'OCD is characterized by unreasonable thoughts and fears that lead to repetitive behaviors.',
    detailedInfo: {
      overview: 'Obsessive-Compulsive Disorder (OCD) involves unwanted, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) that a person feels driven to perform in response to the obsessions.',
      symptoms: [
        'Intrusive, unwanted thoughts or images',
        'Fear of contamination or germs',
        'Unwanted thoughts about harm, sex, or religion',
        'Need for things to be in perfect order',
        'Excessive cleaning or hand washing',
        'Repeatedly checking things',
        'Counting or repeating actions',
        'Arranging items in a specific way',
        'Mental rituals or prayers',
        'Seeking reassurance from others'
      ],
      causes: [
        'Genetic factors',
        'Brain structure and function abnormalities',
        'Environmental factors',
        'Childhood trauma or stress',
        'Streptococcal infections (PANDAS)',
        'Other mental health conditions',
        'Personality factors',
        'Life stressors'
      ],
      treatments: [
        'Cognitive Behavioral Therapy (CBT)',
        'Exposure and Response Prevention (ERP)',
        'Selective Serotonin Reuptake Inhibitors (SSRIs)',
        'Clomipramine (tricyclic antidepressant)',
        'Acceptance and Commitment Therapy',
        'Deep Brain Stimulation (severe cases)',
        'Family therapy',
        'Support groups'
      ],
      selfCare: [
        'Practicing mindfulness and meditation',
        'Stress reduction techniques',
        'Regular exercise',
        'Maintaining social connections',
        'Avoiding alcohol and caffeine',
        'Getting adequate sleep',
        'Learning about OCD',
        'Challenging obsessive thoughts'
      ]
    }
  },
  adhd: {
    name: 'Attention-Deficit/Hyperactivity Disorder (ADHD)',
    icon: <Heart className="w-16 h-16 text-fuchsia-300" />,
    color: 'from-fuchsia-900 to-fuchsia-700',
    lightColor: 'text-fuchsia-300',
    borderColor: 'border-fuchsia-400/30',
    description: 'ADHD is a neurodevelopmental disorder characterized by inattention, hyperactivity, and impulsivity.',
    detailedInfo: {
      overview: 'Attention-Deficit/Hyperactivity Disorder (ADHD) is one of the most common neurodevelopmental disorders of childhood, often continuing into adulthood. It affects the ability to focus, control impulses, and regulate activity levels.',
      symptoms: [
        'Difficulty paying attention to details',
        'Trouble staying focused on tasks',
        'Difficulty following instructions',
        'Problems organizing tasks and activities',
        'Avoiding tasks requiring sustained attention',
        'Losing things frequently',
        'Being easily distracted',
        'Fidgeting or squirming',
        'Difficulty staying seated',
        'Talking excessively or interrupting others'
      ],
      causes: [
        'Genetic factors (highly heritable)',
        'Brain structure and function differences',
        'Prenatal factors (smoking, alcohol use)',
        'Premature birth or low birth weight',
        'Brain injury',
        'Environmental toxins',
        'Food additives (controversial)',
        'Sugar intake (myth - not a cause)'
      ],
      treatments: [
        'Stimulant medications (methylphenidate, amphetamines)',
        'Non-stimulant medications',
        'Behavioral therapy',
        'Cognitive Behavioral Therapy',
        'Parent training and education',
        'School accommodations',
        'Social skills training',
        'Organizational skills training'
      ],
      selfCare: [
        'Creating structured routines',
        'Using organizational tools and apps',
        'Breaking tasks into smaller steps',
        'Regular exercise',
        'Adequate sleep (8-9 hours)',
        'Healthy diet',
        'Mindfulness and meditation',
        'Building support systems'
      ]
    }
  }
};

function ConditionDetails() {
  const { conditionName } = useParams();
  const navigate = useNavigate();

  const condition = conditionDetails[conditionName];

  if (!condition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Condition Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${condition.color} py-20 px-4 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm">
              {condition.icon}
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">{condition.name}</h1>
              <p className="text-xl text-white/80">{condition.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Book className="w-8 h-8 text-indigo-400" />
            Overview
          </h2>
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
            <p className="text-gray-300 text-lg leading-relaxed">
              {condition.detailedInfo.overview}
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            Common Symptoms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {condition.detailedInfo.symptoms.map((symptom, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{symptom}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Causes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Possible Causes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {condition.detailedInfo.causes.map((cause, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <span className="text-gray-300">{cause}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Treatments */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-400" />
            Treatment Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {condition.detailedInfo.treatments.map((treatment, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-lg p-6 border border-slate-600/50">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{treatment}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Self-Care */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-400" />
            Self-Care Strategies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {condition.detailedInfo.selfCare.map((strategy, index) => (
              <div key={index} className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-700/30 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{strategy}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-red-900/20 rounded-xl p-8 border border-red-700/30">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-red-400">
            <Phone className="w-6 h-6" />
            Need Immediate Help?
          </h2>
          <div className="space-y-3 text-gray-300">
            <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
            <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            <p><strong>Emergency Services:</strong> 911</p>
            <p className="text-sm text-gray-400 mt-4">
              If you're having thoughts of self-harm or suicide, please reach out for help immediately.
              You are not alone, and help is available 24/7.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ConditionDetails;