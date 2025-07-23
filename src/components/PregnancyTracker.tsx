import React, { useState, useEffect } from 'react';
import { Calendar, Baby, Activity, AlertCircle, Heart, Brain, ChevronDown, ChevronUp, Plus, Clock, Clipboard, Bookmark, Trash2, Edit, Save, X, ChevronLeft, ChevronRight, Scale } from 'lucide-react';
import { getGeminiResponse } from '../lib/gemini';
import { LoadingSpinner } from './LoadingSpinner';

interface Appointment {
  id: string;
  date: string;
  title: string;
  notes: string;
}

interface Symptom {
  id: string;
  date: string;
  name: string;
  severity: number;
  notes: string;
}

interface Measurement {
  id: string;
  date: string;
  weight: string;
  bloodPressure: string;
  notes: string;
}

export default function PregnancyTracker() {
  const [dueDate, setDueDate] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('pregnancy');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [showAddMeasurement, setShowAddMeasurement] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    date: '',
    title: '',
    notes: ''
  });
  const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id'>>({
    date: '',
    name: '',
    severity: 1,
    notes: ''
  });
  const [newMeasurement, setNewMeasurement] = useState<Omit<Measurement, 'id'>>({
    date: '',
    weight: '',
    bloodPressure: '',
    notes: ''
  });
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [weeklyInfo, setWeeklyInfo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null);
  const [editingSymptom, setEditingSymptom] = useState<string | null>(null);
  const [editingMeasurement, setEditingMeasurement] = useState<string | null>(null);
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null);
  const [editSymptom, setEditSymptom] = useState<Symptom | null>(null);
  const [editMeasurement, setEditMeasurement] = useState<Measurement | null>(null);

  useEffect(() => {
    if (dueDate) {
      calculateCurrentWeek();
    }
  }, [dueDate]);

  useEffect(() => {
    if (currentWeek > 0) {
      getWeeklyInfo();
    }
  }, [currentWeek]);

  const calculateCurrentWeek = () => {
    if (!dueDate) return;

    const today = new Date();
    const due = new Date(dueDate);
    const pregnancyDuration = 280; // 40 weeks in days
    
    // Calculate conception date (approximately 280 days before due date)
    const conceptionDate = new Date(due);
    conceptionDate.setDate(conceptionDate.getDate() - pregnancyDuration);
    
    // Calculate days since conception
    const daysSinceConception = Math.floor((today.getTime() - conceptionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate current week
    const week = Math.floor(daysSinceConception / 7) + 1;
    
    // Ensure week is between 1 and 42
    setCurrentWeek(Math.max(1, Math.min(42, week)));
  };

  const getWeeklyInfo = async () => {
    setLoading(true);
    setError('');
    
    try {
      const prompt = `As a pregnancy health expert, provide detailed information about week ${currentWeek} of pregnancy. Include:
      
      1. Baby's Development: What's happening with the baby this week? Include size comparison to a fruit or object.
      2. Mother's Experience: Common symptoms and body changes during this week.
      3. Health Tips: Nutrition, exercise, and self-care recommendations specific to this week.
      4. Important Milestones: Any significant developments or medical appointments typically scheduled during this week.
      5. Warning Signs: Symptoms that would require medical attention at this stage.
      
      Format the information in a clear, supportive, and easy-to-read manner. Use bullet points where appropriate.`;

      const response = await getGeminiResponse(prompt);
      setWeeklyInfo(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to retrieve weekly information. Please try again later.');
      }
      console.error('Error calling Gemini API:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = () => {
    if (!newAppointment.date || !newAppointment.title) {
      setError('Please fill in all required fields for the appointment.');
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({ date: '', title: '', notes: '' });
    setShowAddAppointment(false);
    setError('');
  };

  const handleAddSymptom = () => {
    if (!newSymptom.date || !newSymptom.name) {
      setError('Please fill in all required fields for the symptom.');
      return;
    }

    const symptom: Symptom = {
      id: Date.now().toString(),
      ...newSymptom
    };

    setSymptoms([...symptoms, symptom]);
    setNewSymptom({ date: '', name: '', severity: 1, notes: '' });
    setShowAddSymptom(false);
    setError('');
  };

  const handleAddMeasurement = () => {
    if (!newMeasurement.date) {
      setError('Please fill in the date for the measurement.');
      return;
    }

    const measurement: Measurement = {
      id: Date.now().toString(),
      ...newMeasurement
    };

    setMeasurements([...measurements, measurement]);
    setNewMeasurement({ date: '', weight: '', bloodPressure: '', notes: '' });
    setShowAddMeasurement(false);
    setError('');
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const handleDeleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter(symptom => symptom.id !== id));
  };

  const handleDeleteMeasurement = (id: string) => {
    setMeasurements(measurements.filter(measurement => measurement.id !== id));
  };

  const startEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment.id);
    setEditAppointment(appointment);
  };

  const saveEditAppointment = () => {
    if (!editAppointment) return;
    
    setAppointments(appointments.map(appointment => 
      appointment.id === editingAppointment ? editAppointment : appointment
    ));
    setEditingAppointment(null);
    setEditAppointment(null);
  };

  const startEditSymptom = (symptom: Symptom) => {
    setEditingSymptom(symptom.id);
    setEditSymptom(symptom);
  };

  const saveEditSymptom = () => {
    if (!editSymptom) return;
    
    setSymptoms(symptoms.map(symptom => 
      symptom.id === editingSymptom ? editSymptom : symptom
    ));
    setEditingSymptom(null);
    setEditSymptom(null);
  };

  const startEditMeasurement = (measurement: Measurement) => {
    setEditingMeasurement(measurement.id);
    setEditMeasurement(measurement);
  };

  const saveEditMeasurement = () => {
    if (!editMeasurement) return;
    
    setMeasurements(measurements.map(measurement => 
      measurement.id === editingMeasurement ? editMeasurement : measurement
    ));
    setEditingMeasurement(null);
    setEditMeasurement(null);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How accurate is the due date calculation?",
      answer: "Due date calculations are estimates based on a 40-week pregnancy from the first day of your last menstrual period. Only about 5% of babies are born on their exact due date. Most babies arrive within a week before or after."
    },
    {
      question: "When should I schedule my first prenatal appointment?",
      answer: "Most healthcare providers recommend scheduling your first prenatal appointment as soon as you know you're pregnant, typically between weeks 6-8. If you have high-risk factors, your provider may want to see you earlier."
    },
    {
      question: "What symptoms should I report to my doctor immediately?",
      answer: "Contact your healthcare provider immediately if you experience: vaginal bleeding, severe abdominal pain, severe headaches, vision changes, sudden swelling, fever over 100.4°F, decreased fetal movement after 24 weeks, or contractions before 37 weeks."
    },
    {
      question: "How much weight should I gain during pregnancy?",
      answer: "Weight gain recommendations vary based on your pre-pregnancy BMI. Generally: Underweight: 28-40 lbs, Normal weight: 25-35 lbs, Overweight: 15-25 lbs, Obese: 11-20 lbs. Your healthcare provider will give you personalized guidance."
    },
    {
      question: "When will I feel my baby move?",
      answer: "First-time mothers typically feel movements (quickening) between 18-25 weeks, while those who have been pregnant before might notice movements earlier, around 16-18 weeks. By 24-28 weeks, movements become more consistent and noticeable."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Baby className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Pregnancy Tracker</h1>
        <p className="mt-2 text-gray-600">Track your pregnancy journey week by week</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Week
            </label>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-rose-500">{currentWeek}</div>
              <span className="ml-2 text-gray-600">of 40 weeks</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-rose-500 rounded-full"
                style={{ width: `${(currentWeek / 40) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,2fr]">
        {/* Left Sidebar */}
        <div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveSection('pregnancy')}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeSection === 'pregnancy'
                    ? 'text-rose-600 border-b-2 border-rose-500'
                    : 'text-gray-600 hover:text-rose-500'
                }`}
              >
                Pregnancy
              </button>
              <button
                onClick={() => setActiveSection('appointments')}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeSection === 'appointments'
                    ? 'text-rose-600 border-b-2 border-rose-500'
                    : 'text-gray-600 hover:text-rose-500'
                }`}
              >
                Appointments
              </button>
            </div>

            <div className="p-4">
              {activeSection === 'pregnancy' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pregnancy Timeline</h3>
                  <div className="space-y-4">
                    {[
                      { week: 4, label: 'Confirmation' },
                      { week: 8, label: 'First Ultrasound' },
                      { week: 12, label: 'First Trimester Complete' },
                      { week: 20, label: 'Anatomy Scan' },
                      { week: 24, label: 'Viability' },
                      { week: 28, label: 'Third Trimester Begins' },
                      { week: 36, label: 'Full Term Approaching' },
                      { week: 40, label: 'Due Date' }
                    ].map((milestone) => (
                      <div key={milestone.week} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            currentWeek >= milestone.week
                              ? 'bg-rose-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {currentWeek >= milestone.week ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            milestone.week
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Week {milestone.week}</div>
                          <div className="text-sm text-gray-600">{milestone.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'appointments' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                    <button
                      onClick={() => setShowAddAppointment(true)}
                      className="p-1 text-rose-500 hover:text-rose-600"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {appointments.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No appointments scheduled</p>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-3">
                          {editingAppointment === appointment.id ? (
                            <div className="space-y-2">
                              <input
                                type="date"
                                value={editAppointment?.date || ''}
                                onChange={(e) => setEditAppointment({...editAppointment!, date: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              />
                              <input
                                type="text"
                                value={editAppointment?.title || ''}
                                onChange={(e) => setEditAppointment({...editAppointment!, title: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Appointment title"
                              />
                              <textarea
                                value={editAppointment?.notes || ''}
                                onChange={(e) => setEditAppointment({...editAppointment!, notes: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Notes"
                                rows={2}
                              />
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingAppointment(null);
                                    setEditAppointment(null);
                                  }}
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={saveEditAppointment}
                                  className="p-1 text-green-500 hover:text-green-700"
                                >
                                  <Save className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-between">
                                <div className="font-medium text-gray-900">{appointment.title}</div>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => startEditAppointment(appointment)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAppointment(appointment.id)}
                                    className="p-1 text-gray-400 hover:text-red-500"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="text-sm text-gray-600 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(appointment.date).toLocaleDateString()}
                              </div>
                              {appointment.notes && (
                                <div className="mt-2 text-sm text-gray-500">{appointment.notes}</div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {showAddAppointment && (
                    <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-medium text-gray-900 mb-3">Add New Appointment</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={newAppointment.date}
                            onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={newAppointment.title}
                            onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="e.g., Ultrasound, Check-up"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Notes (Optional)</label>
                          <textarea
                            value={newAppointment.notes}
                            onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="Any additional details"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setShowAddAppointment(false);
                              setNewAppointment({ date: '', title: '', notes: '' });
                            }}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddAppointment}
                            className="px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaqs.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaqs.includes(index) && (
                    <div className="p-3 border-t bg-gray-50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Weekly Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Week {currentWeek}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                  className="p-1 rounded-full hover:bg-gray-100"
                  disabled={currentWeek <= 1}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentWeek(Math.min(42, currentWeek + 1))}
                  className="p-1 rounded-full hover:bg-gray-100"
                  disabled={currentWeek >= 42}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
                <span className="ml-3 text-gray-600">Loading weekly information...</span>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Error loading information</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            ) : weeklyInfo ? (
              <div className="prose max-w-none">
                <div className="whitespace-pre-line">{weeklyInfo}</div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Baby className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Enter your due date to see weekly pregnancy information</p>
              </div>
            )}
          </div>

          {/* Symptoms Tracker */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Symptom Tracker</h2>
              <button
                onClick={() => setShowAddSymptom(true)}
                className="p-1 text-rose-500 hover:text-rose-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {symptoms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No symptoms recorded yet</p>
                <button
                  onClick={() => setShowAddSymptom(true)}
                  className="mt-4 px-4 py-2 bg-rose-100 text-rose-600 rounded-md hover:bg-rose-200"
                >
                  Record a symptom
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {symptoms.map((symptom) => (
                  <div key={symptom.id} className="border rounded-lg p-4">
                    {editingSymptom === symptom.id ? (
                      <div className="space-y-2">
                        <input
                          type="date"
                          value={editSymptom?.date || ''}
                          onChange={(e) => setEditSymptom({...editSymptom!, date: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                        <input
                          type="text"
                          value={editSymptom?.name || ''}
                          onChange={(e) => setEditSymptom({...editSymptom!, name: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Symptom name"
                        />
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Severity</label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={editSymptom?.severity || 1}
                            onChange={(e) => setEditSymptom({...editSymptom!, severity: parseInt(e.target.value)})}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Mild</span>
                            <span>Moderate</span>
                            <span>Severe</span>
                          </div>
                        </div>
                        <textarea
                          value={editSymptom?.notes || ''}
                          onChange={(e) => setEditSymptom({...editSymptom!, notes: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Notes"
                          rows={2}
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingSymptom(null);
                              setEditSymptom(null);
                            }}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button
                            onClick={saveEditSymptom}
                            className="p-1 text-green-500 hover:text-green-700"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <div className="font-medium text-gray-900">{symptom.name}</div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => startEditSymptom(symptom)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSymptom(symptom.id)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(symptom.date).toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <div className="text-sm text-gray-600 mb-1">Severity: {symptom.severity}/10</div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-rose-500 rounded-full"
                              style={{ width: `${(symptom.severity / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        {symptom.notes && (
                          <div className="mt-2 text-sm text-gray-500">{symptom.notes}</div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAddSymptom && (
              <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Record New Symptom</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newSymptom.date}
                      onChange={(e) => setNewSymptom({...newSymptom, date: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Symptom</label>
                    <input
                      type="text"
                      value={newSymptom.name}
                      onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Nausea, Fatigue, Backache"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Severity (1-10)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={newSymptom.severity}
                      onChange={(e) => setNewSymptom({...newSymptom, severity: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Notes (Optional)</label>
                    <textarea
                      value={newSymptom.notes}
                      onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={2}
                      placeholder="Any additional details about this symptom"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setShowAddSymptom(false);
                        setNewSymptom({ date: '', name: '', severity: 1, notes: '' });
                      }}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSymptom}
                      className="px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Measurements Tracker */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Health Measurements</h2>
              <button
                onClick={() => setShowAddMeasurement(true)}
                className="p-1 text-rose-500 hover:text-rose-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {measurements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No measurements recorded yet</p>
                <button
                  onClick={() => setShowAddMeasurement(true)}
                  className="mt-4 px-4 py-2 bg-rose-100 text-rose-600 rounded-md hover:bg-rose-200"
                >
                  Record measurements
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {measurements.map((measurement) => (
                  <div key={measurement.id} className="border rounded-lg p-4">
                    {editingMeasurement === measurement.id ? (
                      <div className="space-y-2">
                        <input
                          type="date"
                          value={editMeasurement?.date || ''}
                          onChange={(e) => setEditMeasurement({...editMeasurement!, date: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Weight (lbs)</label>
                            <input
                              type="text"
                              value={editMeasurement?.weight || ''}
                              onChange={(e) => setEditMeasurement({...editMeasurement!, weight: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              placeholder="Weight in lbs"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Blood Pressure</label>
                            <input
                              type="text"
                              value={editMeasurement?.bloodPressure || ''}
                              onChange={(e) => setEditMeasurement({...editMeasurement!, bloodPressure: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              placeholder="e.g., 120/80"
                            />
                          </div>
                        </div>
                        <textarea
                          value={editMeasurement?.notes || ''}
                          onChange={(e) => setEditMeasurement({...editMeasurement!, notes: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Notes"
                          rows={2}
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingMeasurement(null);
                              setEditMeasurement(null);
                            }}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button
                            onClick={saveEditMeasurement}
                            className="p-1 text-green-500 hover:text-green-700"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <div className="font-medium text-gray-900">
                            {new Date(measurement.date).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => startEditMeasurement(measurement)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMeasurement(measurement.id)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {measurement.weight && (
                            <div className="flex items-center">
                              <div className="p-2 bg-rose-100 rounded-full mr-2">
                                <Scale className="w-4 h-4 text-rose-500" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Weight</div>
                                <div className="font-medium">{measurement.weight} lbs</div>
                              </div>
                            </div>
                          )}
                          {measurement.bloodPressure && (
                            <div className="flex items-center">
                              <div className="p-2 bg-rose-100 rounded-full mr-2">
                                <Heart className="w-4 h-4 text-rose-500" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Blood Pressure</div>
                                <div className="font-medium">{measurement.bloodPressure}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        {measurement.notes && (
                          <div className="mt-2 text-sm text-gray-500">{measurement.notes}</div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAddMeasurement && (
              <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Record New Measurements</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newMeasurement.date}
                      onChange={(e) => setNewMeasurement({...newMeasurement, date: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Weight (lbs)</label>
                      <input
                        type="text"
                        value={newMeasurement.weight}
                        onChange={(e) => setNewMeasurement({...newMeasurement, weight: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., 145"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Blood Pressure</label>
                      <input
                        type="text"
                        value={newMeasurement.bloodPressure}
                        onChange={(e) => setNewMeasurement({...newMeasurement, bloodPressure: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., 120/80"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Notes (Optional)</label>
                    <textarea
                      value={newMeasurement.notes}
                      onChange={(e) => setNewMeasurement({...newMeasurement, notes: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={2}
                      placeholder="Any additional notes about these measurements"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setShowAddMeasurement(false);
                        setNewMeasurement({ date: '', weight: '', bloodPressure: '', notes: '' });
                      }}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMeasurement}
                      className="px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
        <p><strong>Medical Disclaimer:</strong> The information provided is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.</p>
      </div>
    </div>
  );
}