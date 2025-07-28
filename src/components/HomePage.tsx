import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Zap,
  TrendingUp,
  Target,
  Sparkles,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
} from "lucide-react";

export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Create Viral Content That
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Gets Results
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate engaging Instagram and Facebook posts in seconds with
              AI-powered content that's designed to go viral
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={user ? "/generate" : "/auth"}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Zap className="w-6 h-6" />
                <span>Generate Viral Post Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200 transform hover:scale-105"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SignalPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI understands what makes content go viral and creates posts
              tailored to your niche and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Viral-Ready Content
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes millions of viral posts to create content that's
                optimized for maximum engagement and shares.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Niche-Specific
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you're in fitness, fashion, business, or any other
                niche, we create content that speaks to your audience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Complete Package
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get everything you need: catchy hooks, full captions, trending
                hashtags, and effective calls-to-action.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Goal-Oriented
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you want to gain followers, make sales, or just
                entertain, we tailor content to your specific goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate professional-quality content in seconds. No more
                staring at blank screens or creative blocks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                ROI Focused
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our content is designed to drive real business results, from
                increased followers to more sales and conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Go Viral?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of content creators who are already using SignalPro
            to grow their social media presence
          </p>
          <Link
            to={user ? "/generate" : "/auth"}
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Zap className="w-6 h-6" />
            <span>Start Creating Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
