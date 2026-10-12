import { Shield, Wrench, MessageSquare, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: <Shield className="w-8 h-8 text-onray-yellow" />,
    title: "Tailored Solutions",
    description: "Every property is unique. We design systems specifically optimized for your site and energy requirements."
  },
  {
    icon: <Wrench className="w-8 h-8 text-onray-yellow" />,
    title: "Professional Installation",
    description: "Our installation teams adhere to strict quality and safety standards, ensuring a robust and reliable solar array."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-onray-yellow" />,
    title: "Clear Communication",
    description: "We provide transparent guidance at every step, so you are always informed about your project's progress."
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-onray-yellow" />,
    title: "Dedicated Support",
    description: "Our commitment does not end at installation. We offer ongoing support to ensure your system performs optimally."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 md:py-32 bg-onray-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <h2 className="font-manrope text-4xl md:text-5xl font-bold text-onray-charcoal mb-6">
            Why choose Onray Solar Solution?
          </h2>
          <p className="font-inter text-lg text-onray-slate max-w-2xl mx-auto">
            We combine technical expertise with a commitment to customer service, delivering solar solutions you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-onray-white rounded-full shadow-sm flex items-center justify-center mb-6">
                {reason.icon}
              </div>
              <h3 className="font-manrope text-xl font-bold text-onray-navy mb-4">
                {reason.title}
              </h3>
              <p className="font-inter text-onray-slate leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
