'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "This AI legal assistant has transformed how we handle document analysis. It's saved us countless hours of manual review.",
    author: "Sarah Johnson",
    title: "Senior Partner, Johnson & Associates",
    image: "/testimonials/sarah.jpg"
  },
  {
    quote: "The accuracy and speed of the AI analysis is impressive. It's become an essential tool in our legal practice.",
    author: "Michael Chen",
    title: "Legal Counsel, TechCorp",
    image: "/testimonials/michael.jpg"
  },
  {
    quote: "I was skeptical at first, but the AI's ability to understand complex legal documents is remarkable.",
    author: "Emily Rodriguez",
    title: "Corporate Lawyer, Global Enterprises",
    image: "/testimonials/emily.jpg"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by legal professionals worldwide
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="text-xl text-gray-700 mb-4">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <div className="text-gray-900 font-semibold">
                {testimonials[currentIndex].author}
              </div>
              <div className="text-gray-600">
                {testimonials[currentIndex].title}
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 