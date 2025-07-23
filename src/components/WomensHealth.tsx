import React, { useState } from 'react';
import { Heart, Calendar, Baby, Syringe, Activity } from 'lucide-react';

export default function WomensHealth() {
  const [activeTab, setActiveTab] = useState('cancer');

  const tabs = [
    { id: 'cancer', label: 'Cancer Awareness', icon: <Heart className="w-5 h-5" /> },
    { id: 'menstrual', label: 'Menstrual Health', icon: <Calendar className="w-5 h-5" /> },
    { id: 'pregnancy', label: 'Pregnancy', icon: <Baby className="w-5 h-5" /> },
    { id: 'vaccinations', label: 'Vaccinations', icon: <Syringe className="w-5 h-5" /> },
    { id: 'fertility', label: 'Fertility', icon: <Activity className="w-5 h-5" /> }
  ];

  const content = {
    cancer: {
      title: "Cancer Awareness",
      sections: [
        {
          title: "Breast Cancer",
          content: `
            Breast cancer is one of the most common cancers affecting women worldwide. Early detection is crucial for successful treatment.

            Key Points:
            • Regular self-examinations should be performed monthly
            • Mammograms are recommended annually for women over 40
            • Risk factors include family history, age, and genetic mutations
            • Warning signs include lumps, skin changes, and nipple discharge

            Prevention:
            • Maintain a healthy weight
            • Regular exercise
            • Limit alcohol consumption
            • Regular screenings
          `
        },
        {
          title: "Ovarian Cancer",
          content: `
            Ovarian cancer is often called the "silent killer" as symptoms may not appear until later stages.

            Warning Signs:
            • Bloating
            • Pelvic or abdominal pain
            • Difficulty eating or feeling full quickly
            • Urinary symptoms (urgency or frequency)

            Risk Factors:
            • Family history
            • Age (most common after menopause)
            • Genetic mutations (BRCA1 and BRCA2)
            • Never having been pregnant

            Prevention:
            • Regular check-ups
            • Know your family history
            • Consider genetic testing if high risk
          `
        }
      ]
    },
    menstrual: {
      title: "Menstrual Health",
      sections: [
        {
          title: "Understanding Your Cycle",
          content: `
            The menstrual cycle typically ranges from 21-35 days, with the average being 28 days.

            Phases:
            1. Menstrual Phase (Days 1-5)
            2. Follicular Phase (Days 1-13)
            3. Ovulation (Day 14)
            4. Luteal Phase (Days 15-28)

            Important Aspects:
            • Track your cycle regularly
            • Note any irregular patterns
            • Monitor associated symptoms
            • Maintain good hygiene
          `
        },
        {
          title: "Common Issues",
          content: `
            • Irregular Periods
            • Heavy Bleeding
            • Severe Cramps
            • PMS Symptoms
            • PCOS
            • Endometriosis

            When to Seek Help:
            • Extremely heavy bleeding
            • Severe pain
            • Irregular cycles
            • Unusual symptoms
          `
        }
      ]
    },
    pregnancy: {
      title: "Pregnancy Week by Week",
      sections: [
        {
          title: "First Trimester (Weeks 1-12)",
          content: `
            Key Developments:
            • Weeks 1-4: Conception and implantation
            • Weeks 5-8: Major organs begin forming
            • Weeks 9-12: Baby starts moving

            Common Symptoms:
            • Morning sickness
            • Fatigue
            • Breast tenderness
            • Mood changes

            Important Care:
            • Start prenatal vitamins
            • Avoid harmful substances
            • Regular check-ups
          `
        },
        {
          title: "Second Trimester (Weeks 13-26)",
          content: `
            Key Developments:
            • Baby's movement becomes noticeable
            • Gender can be determined
            • Rapid growth period

            Common Experiences:
            • Increased energy
            • Visible bump
            • Less nausea
            • Appetite increases
          `
        },
        {
          title: "Third Trimester (Weeks 27-40)",
          content: `
            Key Developments:
            • Baby gains weight rapidly
            • Organs mature
            • Prepares for birth

            Important Preparations:
            • Birth plan
            • Hospital bag
            • Regular monitoring
            • Birth education
          `
        }
      ]
    },
    vaccinations: {
      title: "Essential Vaccinations",
      sections: [
        {
          title: "HPV Vaccination",
          content: `
            Human Papillomavirus (HPV) Vaccine:
            • Recommended age: 11-12 years
            • Catch-up vaccination through age 26
            • Protects against cervical cancer
            • Also prevents other HPV-related cancers

            Schedule:
            • 2 doses for those starting before age 15
            • 3 doses if starting after age 15
          `
        },
        {
          title: "Other Important Vaccines",
          content: `
            During Reproductive Years:
            • Flu shot (annually)
            • Tdap (especially during pregnancy)
            • MMR (before pregnancy)
            • Hepatitis B

            During Pregnancy:
            • Influenza vaccine
            • Tdap vaccine
            • COVID-19 vaccine (as recommended)
          `
        }
      ]
    },
    fertility: {
      title: "Fertility and Reproductive Health",
      sections: [
        {
          title: "Understanding Fertility",
          content: `
            Key Factors Affecting Fertility:
            • Age
            • Overall health
            • Lifestyle factors
            • Medical conditions

            Fertility Window:
            • Usually 6 days per cycle
            • Best chances 2-3 days before ovulation
            • Track using various methods
          `
        },
        {
          title: "Fertility Treatments",
          content: `
            Common Treatments:
            • Fertility medications
            • IUI (Intrauterine Insemination)
            • IVF (In Vitro Fertilization)
            • Egg freezing

            When to Seek Help:
            • Under 35: after 1 year of trying
            • Over 35: after 6 months of trying
            • Known fertility issues
          `
        }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Women's Health Information</h1>
        <p className="mt-2 text-gray-600">Comprehensive guide to women's health topics</p>
      </div>

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

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{content[activeTab].title}</h2>
        <div className="space-y-8">
          {content[activeTab].sections.map((section, index) => (
            <div key={index} className="prose max-w-none">
              <h3 className="text-xl font-semibold text-rose-600 mb-4">{section.title}</h3>
              <div className="whitespace-pre-line text-gray-700">{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}