'use client';

import { motion } from 'framer-motion';
import { FileText, Brain, MessageSquare, Shield } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Smart Document Analysis',
    description: 'Upload any legal document and get instant AI-powered analysis and summaries.',
  },
  {
    icon: Brain,
    title: 'Intelligent Clause Detection',
    description: 'Automatically identify and categorize important clauses in your legal documents.',
  },
  {
    icon: MessageSquare,
    title: 'Legal Q&A',
    description: 'Ask questions about your documents and get accurate, contextual answers.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your documents are encrypted and processed with enterprise-grade security.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Legal Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides everything you need to streamline your legal document workflow
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 