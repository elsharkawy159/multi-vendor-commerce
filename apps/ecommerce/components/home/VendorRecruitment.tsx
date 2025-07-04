import { Button } from "@workspace/ui/components/button";
import { TrendingUp, Users, DollarSign } from "lucide-react";
import Link from "next/link";

const VendorRecruitment = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description:
        "Reach millions of customers and expand your market presence",
    },
    {
      icon: Users,
      title: "Large Customer Base",
      description: "Access to our growing community of active shoppers",
    },
    {
      icon: DollarSign,
      title: "Competitive Fees",
      description: "Low commission rates and transparent pricing structure",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Have a Brand? Let's{" "}
            <span className="text-yellow-300">Grow Together</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join thousands of successful vendors on our platform and take your
            business to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={benefit.title} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <IconComponent className="h-12 w-12 text-yellow-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/become-seller">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Become a Partner
            </Button>
          </Link>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default VendorRecruitment;
