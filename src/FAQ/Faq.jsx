import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqSections = [
    {
      title: "All About Your Profile & Matches",
      faqs: [
        {
          question: "What picture should I use on DevStinder?",
          answer:
            "Upload photos that clearly show you. Avoid group photos and sunglasses. A clear, smiling photo works best.",
        },
        {
          question: "What should I put in my bio?",
          answer:
            "Your bio should reflect who you are. Mention your hobbies, interests, or what you’re looking for in a match.",
        },
        {
          question: "How do I unmatch someone?",
          answer:
            "You can unmatch anyone anytime from their profile or chat settings.",
        },
        {
          question: "How do matches work?",
          answer:
            "A match happens when two users like each other.",
        },
        {
          question: "What does 'missed a match' mean?",
          answer:
            "It means you passed on someone who had liked your profile.",
        },
      ],
    },
    {
      title: "All About How DevStinder Works",
      faqs: [
        {
          question: "Is DevStinder free?",
          answer:
            "Yes, DevStinder is free to use with optional premium features.",
        },
        {
          question: "How does DevStinder work?",
          answer:
            "DevStinder connects developers based on preferences, interests, and filters.",
        },
        {
          question: "Are profiles real?",
          answer:
            "Profile verification helps ensure authenticity and safety.",
        },
        {
          question: "Can I use DevStinder on laptop?",
          answer:
            "Yes, DevStinder works on desktop and mobile devices.",
        },
      ],
    },
    {
      title: "Features & Subscriptions",
      faqs: [
        {
          question: "How does Boost work?",
          answer:
            "Boost increases your profile visibility for a limited time.",
        },
        {
          question: "What do premium plans offer?",
          answer:
            "Premium plans include more visibility, advanced filters, and faster matches.",
        },
        {
          question: "Which subscription is best?",
          answer:
            "Premium is ideal if you want higher reach and better control.",
        },
      ],
    },
    {
      title: "Relationships & Dating",
      faqs: [
        {
          question: "Can you find a date on DevStinder?",
          answer:
            "Yes! DevStinder helps you connect with like-minded developers.",
        },
        {
          question: "Can you find long-term relationships?",
          answer:
            "Absolutely. Many users join looking for meaningful connections.",
        },
      ],
    },
  ];

  return (
    <section className="w-full bg-black text-white py-14 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>

        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-10">
            <h3 className="text-2xl font-semibold mb-5 text-gray-200">
              {section.title}
            </h3>

            {section.faqs.map((faq, index) => {
              const currentIndex = `${sectionIndex}-${index}`;
              const isOpen = openIndex === currentIndex;

              return (
                <div
                  key={currentIndex}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : currentIndex)
                  }
                  className="mb-4 rounded-2xl border border-gray-800 bg-zinc-900 cursor-pointer transition hover:border-gray-600"
                >
                  <div className="flex justify-between items-center p-5">
                    <h4 className="font-medium text-lg">
                      {faq.question}
                    </h4>

                    <ChevronDown
                      size={22}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 px-5 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
