'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiDatabase, FiMessageCircle, FiStar, FiTablet } from 'react-icons/fi';

const ContactPage: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = (detail: string) => {
    router.push(
      `/contact/form?category=${detail.toLowerCase().replace(/ /g, '-')}`,
    );
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div
      className="flex w-full flex-col bg-[#F9FAFB] text-[#08162C] lg:flex-row"
      style={{ height: 'calc(100vh - 132px)' }}
    >
      {/* Contact Information Section */}
      <section className="mb-8 flex h-full flex-1 items-center justify-center bg-yellow-50 p-8 lg:mb-0 lg:h-auto">
        <motion.div
          className="max-w-md"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
          <p className="text-lg font-semibold mb-2">India Office</p>
          <p className="mb-4 text-gray-600">
            No 589, 14 th main road Kumaraswamy Layout, Bengaluru 560078.
          </p>
          <p className="text-lg font-semibold mb-2">Estonia Office</p>
          <p className="text-gray-600 mb-2">
            Ahtri 12
            <br />
            Tallinn 15551
            <br />
            Estonia
          </p>
          <p className="text-lg mt-4">
            E:{' '}
            <a
              href="mailto:admin@octasence.com"
              className="text-blue-600 underline"
            >
              admin@octasence.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* Inquiry Options Section */}
      <motion.section
        className="flex-1 w-full flex flex-col justify-center p-8 space-y-4 bg-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          {
            icon: <FiTablet size={24} className="text-blue-500" />,
            question: 'I have a question about',
            detail: 'SHM Sensors',
          },
          {
            icon: <FiDatabase size={24} className="text-blue-500" />,
            question: 'I have a question about',
            detail: 'SHM Data & Analytics',
          },
          {
            icon: <FiStar size={24} className="text-blue-500" />,
            question: 'I have some',
            detail: 'feedback',
          },
          {
            icon: <FiMessageCircle size={24} className="text-blue-500" />,
            question: 'I have a',
            detail: 'general inquiry',
          },
        ].map((item, index) => (
          <div
            role="button"
            tabIndex={0}
            key={index}
            onClick={() => handleButtonClick(item.detail)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleButtonClick(item.detail); }}
            className="flex w-full cursor-pointer items-center border border-gray-300 bg-white p-6 text-left shadow-sm hover:bg-blue-50"
          >
            <div className="flex-shrink-0 p-4 bg-blue-100 rounded-full mr-4">
              {item.icon}
            </div>
            <div>
              <p className="text-gray-600">{item.question}</p>
              <p className="text-[#08162C]">{item.detail}</p>
            </div>
          </div>
        ))}
      </motion.section>
    </div>
  );
};

export default ContactPage;
