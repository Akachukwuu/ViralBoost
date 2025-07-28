import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Check, Zap, Crown, ArrowRight } from "lucide-react";

export function PricingPage() {
  const { user } = useAuth();

  const features = {
    free: [
      "3 content generations per day",
      "All content types (Posts, Carousels, Reels, Memes)",
      "All niches supported",
      "Basic hashtag suggestions",
      "Copy to clipboard",
    ],
    pro: [
      "Unlimited content generations",
      "All content types (Posts, Carousels, Reels, Memes)",
      "All niches supported",
      "Advanced hashtag research",
      "Copy to clipboard",
      "Generation history",
      "Priority support",
      "Early access to new features",
    ],
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you're ready to scale your content
            creation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $0
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to={user ? "/generate" : "/auth"}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl border-4 border-purple-300 p-8 text-white relative hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-2">
                $10
                <span className="text-lg font-normal text-purple-200">
                  /month
                </span>
              </div>
              <p className="text-purple-200">For serious content creators</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.pro.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-100">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Flutterwave payment link */}
            <a
              href="https://sandbox.flutterwave.com/pay/signalpro-advanced"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-purple-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Upgrade to Pro</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my Pro subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your Pro subscription at any time. You'll
                continue to have Pro access until the end of your billing
                period.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens to my generations if I downgrade?
              </h3>
              <p className="text-gray-600">
                Your generation history will be preserved, but you'll be limited
                to 3 generations per day going forward.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not satisfied
                with ViralBoost Pro, contact us for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
