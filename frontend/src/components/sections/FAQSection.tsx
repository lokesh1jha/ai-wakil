'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How accurate is the AI legal assistant?',
    answer: 'Our AI legal assistant achieves over 95% accuracy in document analysis and clause detection. It\'s continuously trained on millions of legal documents and regularly updated to maintain high accuracy standards.',
  },
  {
    question: 'What types of legal documents can I analyze?',
    answer: 'You can analyze various legal documents including contracts, agreements, terms of service, privacy policies, and more. The system supports PDF, DOCX, and other common document formats.',
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes, we take data security very seriously. All documents are encrypted in transit and at rest. We use enterprise-grade security measures and comply with major data protection regulations.',
  },
  {
    question: 'Can I integrate this with my existing legal software?',
    answer: 'Yes, our Enterprise plan includes API access and custom integration options. We can work with your team to integrate our AI assistant with your existing legal software stack.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We offer different levels of support based on your plan. Free users get community support, Pro users receive email support, and Enterprise customers get 24/7 priority support with a dedicated account manager.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our AI legal assistant
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 bg-gray-50 rounded-b-lg mt-1"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 