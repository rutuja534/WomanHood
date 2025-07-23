import React, { useState } from 'react';
import { Heart, Calendar, Baby, Syringe, Activity, BookOpen, Search, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock, Phone, Share2, Printer, Download, Scale, Dumbbell, Utensils, Brain } from 'lucide-react';

function HealthResources() {
  const [activeTab, setActiveTab] = useState('pcos');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const tabs = [
    { id: 'pcos', label: 'PCOS/PCOD', icon: <Scale className="w-5 h-5" /> },
    { id: 'cervical', label: 'Cervical Cancer', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'cancer', label: 'Cancer Awareness', icon: <Heart className="w-5 h-5" /> },
    { id: 'menstrual', label: 'Menstrual Health', icon: <Calendar className="w-5 h-5" /> },
    { id: 'pregnancy', label: 'Pregnancy', icon: <Baby className="w-5 h-5" /> },
    { id: 'vaccinations', label: 'Vaccinations', icon: <Syringe className="w-5 h-5" /> },
    { id: 'fertility', label: 'Fertility', icon: <Activity className="w-5 h-5" /> },
    { id: 'general', label: 'General Health', icon: <BookOpen className="w-5 h-5" /> }
  ];

  const content = {
    pcos: {
      title: "Understanding PCOS & PCOD",
      lastReviewed: "March 15, 2024",
      sections: [
        {
          title: "What are PCOS & PCOD?",
          content: `PCOS (Polycystic Ovary Syndrome) and PCOD (Polycystic Ovarian Disease) are hormonal disorders affecting women of reproductive age. While often used interchangeably, they have distinct characteristics.

Key Statistics:
• PCOS affects 8-13% of reproductive-age women worldwide
• 70% of cases remain undiagnosed
• Leading cause of female infertility
• Increased risk of type 2 diabetes and heart disease

Expert Quote:
"Early diagnosis and lifestyle modifications can significantly improve PCOS symptoms and long-term health outcomes."
- American Society for Reproductive Medicine`
        },
        {
          title: "PCOS vs. PCOD Comparison",
          content: `Key Differences:

PCOS:
• Metabolic disorder affecting multiple body systems
• Permanent condition requiring ongoing management
• Higher risk of long-term health complications
• More severe hormonal imbalances
• May affect fertility significantly

PCOD:
• Primarily affects ovaries
• Can be temporary and reversible
• Generally milder symptoms
• Less impact on fertility
• Better response to lifestyle changes

Common Features:
• Irregular periods
• Multiple ovarian cysts
• Hormonal imbalances
• Weight management challenges`
        },
        {
          title: "Symptoms & Signs",
          content: `Common Symptoms:
• Irregular menstrual cycles
• Weight gain and difficulty losing weight
• Acne and skin problems
• Excessive hair growth (hirsutism)
• Hair loss or thinning
• Mood changes
• Fatigue
• Sleep problems

Physical Signs:
• Acanthosis nigricans (dark patches on skin)
• Central obesity
• Multiple small cysts on ovaries (visible on ultrasound)

When to See a Doctor:
✓ Missed or irregular periods
✓ Difficulty getting pregnant
✓ Rapid weight gain
✓ Severe acne
✓ Unusual hair growth`
        },
        {
          title: "Diagnosis & Testing",
          content: `Diagnostic Criteria (Rotterdam Criteria):
Must have 2 out of 3:
1. Irregular/absent periods
2. Excess androgens
3. Polycystic ovaries on ultrasound

Required Tests:
• Physical examination
• Pelvic ultrasound
• Blood tests for hormones:
  - Testosterone
  - DHEA-S
  - FSH/LH ratio
  - Insulin
  - Thyroid function

Normal Ranges:
• Testosterone: 15-70 ng/dL
• DHEA-S: 65-380 µg/dL
• Fasting insulin: <25 mIU/L`
        },
        {
          title: "Treatment & Management",
          content: `Medical Treatments:
• Birth control pills
• Anti-androgen medications
• Metformin for insulin resistance
• Fertility medications when needed

Lifestyle Changes:

Diet Recommendations:
• Low glycemic index foods
• High fiber intake
• Lean proteins
• Healthy fats
• Limited processed foods

Sample Meal Plan:
Breakfast:
• Greek yogurt with berries
• Chia seeds
• Whole grain toast

Lunch:
• Quinoa salad
• Grilled chicken
• Leafy greens
• Olive oil dressing

Dinner:
• Baked salmon
• Roasted vegetables
• Brown rice

Exercise Guidelines:
• 150 minutes moderate activity/week
• Strength training 2-3 times/week
• Yoga or Pilates for stress reduction
• Walking 30 minutes daily

Stress Management:
• Meditation
• Deep breathing exercises
• Regular sleep schedule
• Support group participation`
        },
        {
          title: "Natural Remedies",
          content: `Evidence-Based Natural Approaches:

Supplements (consult healthcare provider):
• Inositol: 2-4g daily
• Vitamin D: 2000-4000 IU daily
• Omega-3: 1-2g daily
• Magnesium: 300-400mg daily
• Zinc: 15-30mg daily

Herbal Support:
• Spearmint tea
• Cinnamon
• Evening primrose oil
• Green tea

Lifestyle Practices:
• Acupuncture
• Regular massage
• Aromatherapy
• Mind-body practices`
        }
      ]
    },
    cervical: {
      title: "Understanding Cervical Cancer",
      sections: [
        {
          title: "What is Cervical Cancer?",
          content: `Cervical cancer is a type of cancer that occurs in the cells of the cervix - the lower part of the uterus that connects to the vagina. It's highly preventable and treatable when caught early.

Key Statistics:
• Fourth most common cancer in women worldwide
• Over 90% of cases are caused by HPV (Human Papillomavirus)
• 5-year survival rate is over 90% when caught early

Expert Quote:
"Cervical cancer is one of the most preventable and treatable forms of cancer, as long as it is detected early and managed effectively." 
- World Health Organization`
        },
        {
          title: "Causes and Risk Factors",
          content: `Understanding HPV:
• Most common sexually transmitted infection
• Usually clears on its own within 2 years
• Certain high-risk types can lead to cancer

Risk Factors:
• Long-term use of birth control pills
• Smoking
• Multiple sexual partners
• Weakened immune system
• Family history of cervical cancer

Important Note: Having risk factors doesn't mean you'll develop cervical cancer. Regular screening is key to prevention.`
        },
        {
          title: "Warning Signs & Symptoms",
          content: `Early Warning Signs:
• Abnormal vaginal bleeding
• Bleeding after intercourse
• Unusual vaginal discharge
• Pelvic pain
• Pain during intercourse

When to See a Doctor:
✓ Any unusual bleeding
✓ Persistent pelvic pain
✓ Unexplained weight loss
✓ Fatigue that doesn't improve
✓ Changes in bathroom habits

Remember: Early symptoms may not be noticeable. This is why regular screening is crucial.`
        },
        {
          title: "Prevention & Screening",
          content: `HPV Vaccination:
• Recommended for all people ages 9-26
• Most effective when given before exposure to HPV
• Safe and well-studied

Screening Guidelines:
Age 21-29:
• Pap test every 3 years

Age 30-65:
• Pap test every 3 years, or
• HPV testing every 5 years, or
• Both tests every 5 years

Lifestyle Prevention:
• Practice safe sex
• Quit smoking
• Maintain a healthy immune system
• Eat a balanced diet
• Regular exercise`
        },
        {
          title: "Treatment & Support",
          content: `Treatment Options:
• Surgery (various types depending on stage)
• Radiation therapy
• Chemotherapy
• Targeted therapy
• Immunotherapy

Success Rates:
• Stage 1: 80-93% 5-year survival rate
• Stage 2: 58-63% 5-year survival rate
• Stage 3: 32-35% 5-year survival rate
• Stage 4: 16-17% 5-year survival rate

Self-Care During Treatment:
• Get plenty of rest
• Eat nutritious foods
• Stay hydrated
• Light exercise when possible
• Join support groups
• Practice stress management

Support Resources:
• National Cancer Information Center: 1-800-227-2345
• Women's Cancer Network
• Local support groups
• Online communities`
        }
      ]
    },
    cancer: {
      title: "Cancer Awareness",
      sections: [
        {
          title: "Breast Cancer",
          content: `Breast cancer is one of the most common cancers affecting women worldwide. Early detection is crucial for successful treatment.

Key Points:
• Regular self-examinations should be performed monthly
• Mammograms are recommended annually for women over 40
• Risk factors include family history, age, and genetic mutations
• Warning signs include lumps, skin changes, and nipple discharge

Prevention:
• Maintain a healthy weight
• Regular exercise
• Limit alcohol consumption
• Regular screenings`
        },
        {
          title: "Ovarian Cancer",
          content: `Ovarian cancer is often called the "silent killer" as symptoms may not appear until later stages.

Warning Signs:
• Bloating
• Pelvic or abdominal pain
• Difficulty eating or feeling full quickly
• Urinary symptoms (urgency or frequency)

Risk Factors:
• Family history
• Age (most common after menopause)
• Genetic mutations (BRCA1 and BRCA2)
• Never having been pregnant`
        }
      ]
    },
    menstrual: {
      title: "Menstrual Health",
      sections: [
        {
          title: "Understanding Your Cycle",
          content: `The menstrual cycle typically ranges from 21-35 days, with the average being 28 days.

Phases:
1. Menstrual Phase (Days 1-5)
2. Follicular Phase (Days 1-13)
3. Ovulation (Day 14)
4. Luteal Phase (Days 15-28)

Important Aspects:
• Track your cycle regularly
• Note any irregular patterns
• Monitor associated symptoms
• Maintain good hygiene`
        }
      ]
    },
    pregnancy: {
      title: "Pregnancy Guide",
      sections: [
        {
          title: "First Trimester",
          content: `Key Developments:
• Weeks 1-4: Conception and implantation
• Weeks 5-8: Major organs begin forming
• Weeks 9-12: Baby starts moving

Common Symptoms:
• Morning sickness
• Fatigue
• Breast tenderness
• Mood changes`
        }
      ]
    },
    vaccinations: {
      title: "Essential Vaccinations",
      sections: [
        {
          title: "Recommended Vaccines",
          content: `Core Vaccinations:
• Annual flu shot
• Tdap (tetanus, diphtheria, pertussis)
• HPV vaccine (up to age 26)
• COVID-19 vaccine

During Pregnancy:
• Influenza vaccine
• Tdap vaccine
• Additional vaccines as recommended by healthcare provider`
        }
      ]
    },
    fertility: {
      title: "Fertility Health",
      sections: [
        {
          title: "Fertility Basics",
          content: `Key Factors:
• Age and fertility
• Menstrual cycle tracking
• Ovulation monitoring
• Lifestyle factors

When to Seek Help:
• Under 35: after 1 year of trying
• Over 35: after 6 months
• Known reproductive issues`
        }
      ]
    },
    general: {
      title: "General Health",
      sections: [
        {
          title: "Preventive Care",
          content: `Essential Health Practices:
• Regular check-ups
• Balanced nutrition
• Regular exercise
• Mental health care
• Adequate sleep

Screening Tests:
• Annual physical
• Blood pressure
• Cholesterol levels
• Blood sugar
• Bone density`
        }
      ]
    }
  };

  const pcosResources = [
    {
      name: "PCOS Support Network",
      phone: "1-800-555-PCOS",
      available: "24/7"
    },
    {
      name: "Women's Hormonal Health Helpline",
      phone: "1-888-444-HELP",
      available: "9 AM - 8 PM EST"
    }
  ];

  const emergencyContacts = [
    {
      name: "National Cancer Information Center",
      phone: "1-800-227-2345",
      available: "24/7"
    },
    {
      name: "Women's Health Helpline",
      phone: "1-800-994-9662",
      available: "9 AM - 6 PM EST"
    }
  ];

  const pcosFaqs = [
    {
      question: "Can PCOS be cured?",
      answer: "While PCOS cannot be cured, it can be effectively managed through lifestyle changes, medications, and proper medical care. Many women with PCOS lead healthy, fulfilling lives with proper management."
    },
    {
      question: "Will PCOS affect my ability to have children?",
      answer: "PCOS can affect fertility, but many women with PCOS can still conceive, either naturally or with fertility treatments. Early diagnosis and proper management improve fertility outcomes."
    },
    {
      question: "How does weight affect PCOS?",
      answer: "Weight and PCOS have a complex relationship. Excess weight can worsen PCOS symptoms, while PCOS can make it harder to lose weight. Even a modest weight loss of 5-10% can significantly improve symptoms."
    },
    {
      question: "What's the difference between PCOS and PCOD?",
      answer: "While both conditions involve ovarian cysts, PCOS is a more complex metabolic disorder affecting multiple body systems, while PCOD primarily affects the ovaries and is generally milder and potentially reversible."
    }
  ];

  const faqs = [
    {
      question: "How often should I get screened for cervical cancer?",
      answer: "Women aged 21-29 should get a Pap test every 3 years. Women 30-65 should get either a Pap test every 3 years, HPV testing every 5 years, or both tests every 5 years."
    },
    {
      question: "Is the HPV vaccine safe?",
      answer: "Yes, the HPV vaccine is very safe and effective. It has been thoroughly tested and continues to be monitored for safety. Millions of people have received the vaccine without serious side effects."
    },
    {
      question: "Can cervical cancer be cured?",
      answer: "When caught early, cervical cancer is highly treatable and often curable. The 5-year survival rate for early-stage cervical cancer is over 90%."
    }
  ];

  const allFaqs = activeTab === 'pcos' ? pcosFaqs : faqs;
  const filteredFaqs = allFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (sectionTitle: string) => {
    const key = `${activeTab}-${sectionTitle}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isSectionExpanded = (sectionTitle: string) => {
    const key = `${activeTab}-${sectionTitle}`;
    return expandedSections[key] || false;
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${content[activeTab].title} Information`,
        text: `Important information about ${content[activeTab].title}`,
        url: window.location.href
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Health Resources</h1>
        <p className="mt-2 text-gray-600">Comprehensive guide to women's health and wellness</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${
              activeTab === tab.id
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-600 hover:bg-rose-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        {/* Left Column: Health Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{content[activeTab].title}</h2>
                {content[activeTab].lastReviewed && (
                  <p className="text-sm text-gray-500 mt-1">
                    Last reviewed: {content[activeTab].lastReviewed}
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handlePrint}
                  className="flex items-center text-rose-500 hover:text-rose-600 transition-colors"
                >
                  <Printer className="w-5 h-5 mr-1" />
                  Print
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center text-rose-500 hover:text-rose-600 transition-colors"
                >
                  <Share2 className="w-5 h-5 mr-1" />
                  Share
                </button>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4">
              {content[activeTab].sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-rose-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-rose-600">{section.title}</h3>
                    {isSectionExpanded(section.title) ? (
                      <ChevronUp className="w-5 h-5 text-rose-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {isSectionExpanded(section.title) && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-line text-gray-700">{section.content}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {activeTab === 'pcos' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-rose-600 mb-4">Support & Resources</h3>
              <div className="space-y-4">
                {pcosResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-rose-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{resource.name}</p>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {resource.available}
                      </div>
                    </div>
                    <a
                      href={`tel:${resource.phone}`}
                      className="flex items-center text-rose-500 hover:text-rose-600"
                    >
                      <Phone className="w-5 h-5 mr-1" />
                      {resource.phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center p-3 bg-rose-50 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors">
                    <Download className="w-5 h-5 mr-2" />
                    Symptom Tracker
                  </button>
                  <button className="flex items-center justify-center p-3 bg-rose-50 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors">
                    <Brain className="w-5 h-5 mr-2" />
                    Wellness Guide
                  </button>
                  <button className="flex items-center justify-center p-3 bg-rose-50 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors">
                    <Utensils className="w-5 h-5 mr-2" />
                    Meal Planner
                  </button>
                  <button className="flex items-center justify-center p-3 bg-rose-50 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors">
                    <Dumbbell className="w-5 h-5 mr-2" />
                    Exercise Tips
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cervical' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-rose-600 mb-4">Emergency Contacts</h3>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-rose-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {contact.available}
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center text-rose-500 hover:text-rose-600"
                    >
                      <Phone className="w-5 h-5 mr-1" />
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
          
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-rose-50 transition-colors rounded-lg"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-rose-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 py-3 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
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

export default HealthResources;