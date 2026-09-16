import { useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "How can honey improve my health?",
    answer: `
      <p>High-quality honey like PureWest Active Honey is packed with natural antioxidants, which help build strong defenses against colds, flu, and stomach bugs</p>

      <p>But the benefits don’t stop there—emerging research shows that active honey also supports gut health. Packed with prebiotic fiber, honey nourishes the trillions of beneficial bacteria, fungi, and viruses in your gut, collectively known as the microbiome. A well-fed microbiome promotes a healthy gut, which is crucial for good digestion, a robust immune system, and even better mental well-being.</p>
    `
  },
  {
    question: "What is Total Activity (TA)?",
    answer: `
      <p>Total Activity (TA) measures how effectively honey kills bacteria, with higher TA numbers indicating greater antimicrobial strength. Our Jarrah and Marri Wild honeys are among the highest rated TA honeys available, ensuring top-notch antimicrobial protection.</p>

      <p>The exceptional antimicrobial and antibacterial properties of our honeys come from an enzyme called glucose oxidase, naturally introduced by bees during honey production. This enzyme interacts with glucose and oxygen from the water present in honey to produce hydrogen peroxide—a safe yet powerful antimicrobial agent.</p>
    `
  },
  {
    question: "Where do Jarrah Honey come from?",
    answer: `
      <p>Our honey is crafted from bees foraging on the pristine Jarrah and Marri trees in the Southwest region of Western Australia. Jarrah trees, known for their exceptional quality, only flower every few years, making their honey a rare and treasured find. Thanks to Australia’s stringent quarantine measures—among the strictest globally—our honey is produced without pesticides or contaminants.</p>
    `
  },
  {
    question: "Why is Jarrah Active Honey considered low GI (Glycemic Index)?",
    answer: `
      <p>Jarrah honey has a significantly higher fructose content compared to glucose. It typically contains approximately 52% fructose and only 22% glucose. This higher fructose-to-glucose ratio is a key factor contributing to Jarrah honey's low glycemic index (GI) and its potential benefits for individuals with diabetes or those seeking to manage blood sugar levels.</p>

      <p>Fructose has a low glycemic index (GI) primarily because of how it's metabolized in the body. Here are the main reasons:</p>

      <p><b>Slower Absorption</b>: Unlike glucose, which is readily absorbed into the bloodstream from the small intestine, fructose is absorbed more slowly.</p>

      <p><b>Liver Metabolism</b>: Fructose is primarily metabolized in the liver, where it's converted into glucose, glycogen (a storage form of glucose), or other compounds. This process is slower than the direct utilization of glucose by the body's cells.</p>

      <p><b>Less Insulin Response</b>: Fructose stimulates a smaller insulin response compared to glucose. Insulin is a hormone that helps regulate blood sugar levels, and a lower insulin response leads to a slower rise in blood glucose levels after consuming fructose.   </p>
    `
  },
  {
    question: "Why Does Raw Honey Crystallize?",
    answer: `
      <p>Raw honey's natural composition, primarily a balance of glucose and fructose alongside water and other elements, contributes to its tendency to crystallize. When the glucose concentration surpasses its solubility limit within the honey, it begins to form crystals. Several factors can influence this process, including temperature fluctuations, moisture content, and the presence of pollen or other particulate matter. Consequently, some honey varieties crystallize rapidly, while others remain liquid for extended durations.</p>

      <p>A common misconception is that crystallized honey has spoiled. In reality, crystallization is a natural and reversible process that does not impact the honey's flavor or nutritional value.</p>
    `
  },
  {
    question: "Why doesn’t Jarrah Honey Crystalise?",
    answer: `
      <p>While all honey has the potential to crystallise, certain varieties are known for their resistance to this process. For example, Western Australian Jarrah honey has low glucose levels, making it far less prone to crystallisation. This unique honey variety offers a smooth and creamy texture even when stored for extended periods.</p>
    `
  }
];

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndices((prev) => 
      prev.includes(index) 
        ? prev.filter((i) => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div className="bg-dark min-h-[100svh] font-baskerville text-text">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 pt-[160px] pb-[80px] border-b border-rule bg-[linear-gradient(to_bottom,#120d07,#0e0a05)]">
        <div className="w-[6px] h-[6px] rotate-45 mx-auto mb-6 bg-gold" />
        <p className="font-baskerville text-[0.55rem] tracking-[6px] uppercase mb-5 text-gold">
          Discover More
        </p>
        <h1 className="font-garamond font-light leading-[1.05] mb-6 text-white tracking-[-0.5px] text-[clamp(2.8rem,6vw,5rem)]">
          Frequently Asked <em className="text-gold italic">Questions</em>
        </h1>
        <p className="max-w-xl text-[0.9rem] leading-relaxed text-text-muted">
          Learn more about our rare Western Australian honeys, their unique properties, and how best to enjoy them.
        </p>

        {/* Bottom rule */}
        <div className="flex items-center gap-4 mt-12">
          <div className="w-16 h-px opacity-30 bg-gold" />
          <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
          <div className="w-16 h-px opacity-30 bg-gold" />
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20">
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div 
                key={index} 
                className={`transition-colors duration-400 border ${isOpen ? 'bg-dark3 border-gold/35' : 'bg-transparent border-rule'}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer outline-none focus:outline-none bg-transparent border-none"
                >
                  <h3 
                    className={`text-left font-light m-0 transition-colors duration-300 font-garamond text-[clamp(1.2rem,2vw,1.5rem)] ${isOpen ? 'text-gold-light' : 'text-white'}`}
                  >
                    {item.question}
                  </h3>
                  <div 
                    className={`ml-6 flex items-center justify-center shrink-0 transition-transform duration-500 ease-in-out w-[30px] h-[30px] ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  >
                    <span className="text-gold text-[1.5rem] font-light inline-block leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>

                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ 
                    maxHeight: isOpen ? "1000px" : "0px",
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div 
                    className="px-6 pb-8 faq-answer text-text leading-[1.9] text-[0.95rem]"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer ornament */}
        <div className="flex items-center justify-center gap-4 mt-24">
          <div className="w-16 h-px opacity-30 bg-gold" />
          <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
          <div className="w-16 h-px opacity-30 bg-gold" />
        </div>
      </div>

      <style>{`
        .faq-answer p { margin-bottom: 1.2rem; }
        .faq-answer p:last-child { margin-bottom: 0; }
        .faq-answer strong { color: #C8AE80; font-weight: 600; }
      `}</style>
    </div>
  );
}
