import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Umme Ayman',
      role: 'Full Stack Developer',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:umme@example.com'
    },
    {
      name: 'Rutuja',
      role: 'AI & Backend Developer',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:rutuja@example.com'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Mission Section */}
      <div className="text-center mb-20">
        <Heart className="h-12 w-12 text-rose-500 mx-auto mb-4 animate-pulse" />
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering women through innovative healthcare technology, making personalized health insights accessible to all.
        </p>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Innovation',
              description: 'Leveraging cutting-edge AI technology to provide personalized healthcare insights.'
            },
            {
              title: 'Empowerment',
              description: 'Enabling women to make informed decisions about their health with confidence.'
            },
            {
              title: 'Privacy',
              description: 'Ensuring the highest standards of data protection and user privacy.'
            }
          ].map((value, index) => (
            <div key={index} className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-rose-500 mb-3 group-hover:scale-105 transition-transform">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-rose-500 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.github} className="text-gray-600 hover:text-rose-500 transition-colors transform hover:scale-110">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href={member.linkedin} className="text-gray-600 hover:text-rose-500 transition-colors transform hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href={member.email} className="text-gray-600 hover:text-rose-500 transition-colors transform hover:scale-110">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}