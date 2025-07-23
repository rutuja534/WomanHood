import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Heart, Brain, Activity, Sun, Moon, Apple } from 'lucide-react';

export default function HealthFacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const facts = [
    {
      title: "Women's Heart Health",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      content: "Heart disease symptoms in women can differ from men. Women are more likely to experience fatigue, shortness of breath, and nausea. Regular exercise and a heart-healthy diet can significantly reduce risks."
    },
    {
      title: "Brain Health",
      icon: <Brain className="w-6 h-6 text-rose-500" />,
      content: "Women are more susceptible to certain neurological conditions. Regular mental stimulation, social interaction, and stress management can help maintain cognitive health."
    },
    {
      title: "Physical Activity",
      icon: <Activity className="w-6 h-6 text-rose-500" />,
      content: "Women should aim for 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly. Strength training is crucial for bone health and metabolism."
    },
    {
      title: "Sleep Patterns",
      icon: <Moon className="w-6 h-6 text-rose-500" />,
      content: "Women often experience unique sleep challenges due to hormonal changes. Maintaining a consistent sleep schedule and creating a relaxing bedtime routine can improve sleep quality."
    },
    {
      title: "Nutrition Needs",
      icon: <Apple className="w-6 h-6 text-rose-500" />,
      content: "Women have specific nutritional requirements, including higher iron needs during reproductive years. Focus on iron-rich foods, calcium, vitamin D, and folic acid."
    },
    {
      title: "Hormonal Health",
      icon: <Sun className="w-6 h-6 text-rose-500" />,
      content: "Hormonal balance is crucial for women's health. Regular check-ups, stress management, and a balanced diet can help maintain hormonal health."
    }
  ];

  const faqs = [
    {
      question: "How often should I get a health check-up?",
      answer: "It's recommended to have an annual wellness visit with your healthcare provider. However, specific screenings may be needed based on age and risk factors."
    },
    {
      question: "What are common nutrient deficiencies in women?",
      answer: "Common deficiencies include iron, vitamin D, calcium, and vitamin B12. Regular blood tests can help identify and address these deficiencies."
    },
    {
      question: "When should I start breast cancer screening?",
      answer: "Most medical organizations recommend starting mammograms at age 40-50. However, those with family history may need to start earlier."
    },
    {
      question: "How can I maintain bone health?",
      answer: "Regular weight-bearing exercise, adequate calcium intake (1000-1200mg daily), vitamin D supplementation, and avoiding smoking are key for bone health."
    },
    {
      question: "What are signs of hormonal imbalance?",
      answer: "Common signs include irregular periods, mood changes, weight fluctuations, sleep issues, and skin changes. Consult a healthcare provider if you notice these symptoms."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Health Facts Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Health Facts</h2>
        <div className="grid gap-6">
          {facts.map((fact, index) => (
            <div key={index} className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="mr-3 group-hover:scale-110 transition-transform">
                  {fact.icon}
                </div>
                <h3 className="text-xl font-semibold text-rose-500">{fact.title}</h3>
              </div>
              <p className="text-gray-600">{fact.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-rose-50 transition-colors rounded-lg"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="text-rose-500" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}