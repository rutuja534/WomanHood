import React, { useState } from 'react';
import { Heart, Lightbulb, Star, Clock, User, ChevronRight, Bookmark, Share2, ChevronDown, ChevronUp, X } from 'lucide-react';

interface HealthTip {
  id: string;
  title: string;
  content: string;
  fullContent: string;
  category: 'nutrition' | 'exercise' | 'mental-health' | 'reproductive' | 'general';
  readTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  author: string;
  rating: number;
  bookmarked: boolean;
  tips: string[];
  warnings: string[];
}

export default function HealthTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookmarkedTips, setBookmarkedTips] = useState<string[]>([]);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Tips', icon: '🌟' },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'exercise', label: 'Exercise', icon: '🏃‍♀️' },
    { id: 'mental-health', label: 'Mental Health', icon: '🧠' },
    { id: 'reproductive', label: 'Reproductive Health', icon: '🌸' },
    { id: 'general', label: 'General Wellness', icon: '💪' }
  ];

  const [healthTips] = useState<HealthTip[]>([
    {
      id: '1',
      title: 'Iron-Rich Foods for Women',
      content: 'Women need more iron than men due to menstruation. Include spinach, lentils, quinoa, and lean meats in your diet.',
      fullContent: 'Iron deficiency is one of the most common nutritional deficiencies among women, especially during reproductive years. This is primarily due to monthly menstrual blood loss, which can deplete iron stores over time.',
      category: 'nutrition',
      readTime: 3,
      difficulty: 'easy',
      author: 'Dr. Sarah Johnson',
      rating: 4.8,
      bookmarked: false,
      tips: [
        'Pair iron-rich foods with vitamin C sources like citrus fruits to enhance absorption',
        'Cook in cast iron cookware to increase iron content in foods',
        'Avoid drinking tea or coffee with iron-rich meals as they can inhibit absorption',
        'Include both heme iron (from meat) and non-heme iron (from plants) in your diet'
      ],
      warnings: [
        'Consult your doctor before taking iron supplements',
        'Too much iron can be harmful - get tested before supplementing'
      ]
    },
    {
      id: '2',
      title: 'Pelvic Floor Exercises',
      content: 'Strengthen your pelvic floor muscles with Kegel exercises. Contract your pelvic muscles for 3 seconds, then relax for 3 seconds.',
      fullContent: 'The pelvic floor is a group of muscles that support your pelvic organs, including the bladder, uterus, and rectum. These muscles can weaken due to pregnancy, childbirth, aging, or surgery.',
      category: 'exercise',
      readTime: 5,
      difficulty: 'medium',
      author: 'Physical Therapist Lisa Chen',
      rating: 4.9,
      bookmarked: false,
      tips: [
        'Start with 10 repetitions, 3 times daily',
        'Gradually increase to 15-20 repetitions',
        'Focus on both quick contractions and longer holds',
        'Practice during daily activities like brushing teeth'
      ],
      warnings: [
        'Stop if you experience pain',
        'Consult a pelvic floor specialist if you have ongoing issues'
      ]
    },
    {
      id: '3',
      title: 'Managing Stress During Your Cycle',
      content: 'Hormonal changes can affect stress levels. Practice deep breathing, meditation, or gentle yoga during PMS.',
      fullContent: 'Hormonal fluctuations throughout the menstrual cycle can significantly impact mood, stress levels, and emotional well-being. Understanding these changes can help you develop effective coping strategies.',
      category: 'mental-health',
      readTime: 4,
      difficulty: 'easy',
      author: 'Dr. Maria Rodriguez',
      rating: 4.7,
      bookmarked: false,
      tips: [
        'Track your mood alongside your cycle to identify patterns',
        'Practice the 4-7-8 breathing technique for instant calm',
        'Try progressive muscle relaxation before bed',
        'Consider magnesium supplements (consult your doctor first)'
      ],
      warnings: [
        'Seek professional help if mood changes are severe',
        'Don\'t ignore persistent anxiety or depression'
      ]
    },
    {
      id: '4',
      title: 'Understanding Your Fertile Window',
      content: 'Track your menstrual cycle to identify your fertile window. Use ovulation predictor kits or monitor basal body temperature.',
      fullContent: 'Understanding your fertile window is crucial whether you\'re trying to conceive or avoid pregnancy. The fertile window typically spans about 6 days during each menstrual cycle.',
      category: 'reproductive',
      readTime: 6,
      difficulty: 'medium',
      author: 'Fertility Specialist Dr. Amanda Lee',
      rating: 4.6,
      bookmarked: false,
      tips: [
        'The fertile window includes the 5 days before ovulation and the day of ovulation',
        'Cervical mucus changes can indicate fertility',
        'Basal body temperature rises after ovulation',
        'Ovulation predictor kits detect the LH surge'
      ],
      warnings: [
        'Fertility tracking is not 100% reliable for contraception',
        'Consult a healthcare provider for personalized advice'
      ]
    },
    {
      id: '5',
      title: 'Calcium and Bone Health',
      content: 'Women are at higher risk for osteoporosis. Aim for 1000-1200mg of calcium daily through dairy, leafy greens, and fortified foods.',
      fullContent: 'Bone health is particularly important for women, as they have a higher risk of developing osteoporosis, especially after menopause when estrogen levels decline.',
      category: 'nutrition',
      readTime: 4,
      difficulty: 'easy',
      author: 'Nutritionist Emily Davis',
      rating: 4.5,
      bookmarked: false,
      tips: [
        'Combine calcium with vitamin D for better absorption',
        'Weight-bearing exercises strengthen bones',
        'Limit caffeine and alcohol which can interfere with calcium absorption',
        'Include magnesium and vitamin K for bone health'
      ],
      warnings: [
        'Too much calcium can interfere with other mineral absorption',
        'Get a bone density test if you have risk factors'
      ]
    },
    {
      id: '6',
      title: 'Sleep Hygiene for Hormonal Balance',
      content: 'Quality sleep is crucial for hormone regulation. Maintain a consistent sleep schedule and create a cool, dark environment.',
      fullContent: 'Sleep plays a vital role in hormone regulation, affecting everything from stress hormones to reproductive hormones. Poor sleep can disrupt your menstrual cycle and overall health.',
      category: 'general',
      readTime: 5,
      difficulty: 'easy',
      author: 'Sleep Specialist Dr. Jennifer Kim',
      rating: 4.8,
      bookmarked: false,
      tips: [
        'Keep your bedroom temperature between 65-68°F (18-20°C)',
        'Use blackout curtains or an eye mask',
        'Avoid screens 1 hour before bedtime',
        'Try a relaxing bedtime routine like reading or gentle stretching'
      ],
      warnings: [
        'Consult a doctor if you have persistent sleep problems',
        'Sleep disorders can affect hormone balance'
      ]
    }
  ]);

  const filteredTips = selectedCategory === 'all' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory);

  const toggleBookmark = (tipId: string) => {
    setBookmarkedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const toggleExpanded = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const handleShare = async (tip: HealthTip) => {
    try {
      await navigator.share({
        title: tip.title,
        text: tip.content,
        url: window.location.href
      });
    } catch (error) {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${tip.title}\n\n${tip.content}\n\nRead more at: ${window.location.href}`);
      alert('Tip copied to clipboard!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nutrition': return 'text-green-600 bg-green-100';
      case 'exercise': return 'text-blue-600 bg-blue-100';
      case 'mental-health': return 'text-purple-600 bg-purple-100';
      case 'reproductive': return 'text-pink-600 bg-pink-100';
      case 'general': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Tips & Advice</h1>
        <p className="text-gray-600">Expert-backed tips to support your wellness journey</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
                      {tip.category.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                      {tip.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                </div>
                <button
                  onClick={() => toggleBookmark(tip.id)}
                  className={`p-2 rounded-full transition-colors ${
                    bookmarkedTips.includes(tip.id)
                      ? 'text-rose-500 bg-rose-50'
                      : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">{tip.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{tip.readTime} min read</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{tip.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">{tip.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleShare(tip)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => toggleExpanded(tip.id)}
                    className="flex items-center text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    <span className="text-sm font-medium mr-1">
                      {expandedTip === tip.id ? 'Show Less' : 'Read More'}
                    </span>
                    {expandedTip === tip.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedTip === tip.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Detailed Information</h4>
                      <p className="text-gray-700">{tip.fullContent}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Practical Tips</h4>
                      <ul className="space-y-2">
                        {tip.tips.map((tipItem, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700">{tipItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tip.warnings.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                        <ul className="space-y-1">
                          {tip.warnings.map((warning, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-yellow-700 text-sm">{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={() => toggleExpanded(tip.id)}
                      className="flex items-center justify-center w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <ChevronUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">Show Less</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Tip */}
      <div className="mt-12 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tip of the Day</h2>
          <p className="text-lg text-gray-700 mb-6">
            "Remember that small, consistent changes in your daily routine can lead to significant improvements in your overall health. 
            Focus on progress, not perfection, and celebrate every step forward in your wellness journey."
          </p>
          <p className="text-sm text-gray-600">- Women's Health Expert Team</p>
        </div>
      </div>
    </div>
  );
}