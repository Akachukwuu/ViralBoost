import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUserProfile } from "../hooks/useUserProfile";
import { useGenerations } from "../hooks/useGenerations";
import { toast } from "react-hot-toast";
import {
  Copy,
  RefreshCw,
  Sparkles,
  Target,
  Type,
  Hash,
  Zap,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  niche: string;
  goal: string;
  contentType: string;
}

interface GeneratedContent {
  hook: string;
  caption: string;
  hashtags: string;
  cta: string | null;
}

export function GenerateContent() {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const { todayCount, addGeneration } = useGenerations();
  const [formData, setFormData] = useState<FormData>({
    niche: "",
    goal: "",
    contentType: "",
  });
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

  const niches = [
    "Fitness & Health",
    "Fashion & Style",
    "Christianity & Faith",
    "Business & Entrepreneurship",
    "Food & Cooking",
    "Travel & Adventure",
    "Technology",
    "Beauty & Skincare",
    "Personal Development",
    "Finance & Investment",
    "Entertainment",
    "Education",
  ];

  const goals = [
    "Gain Followers",
    "Get Sales",
    "Go Viral",
    "Be Funny",
    "Educate Audience",
    "Build Community",
  ];

  const contentTypes = [
    "Text Post",
    "Carousel",
    "Reels Idea",
    "Meme",
    "Story",
    "Video Script",
  ];

  const canGenerate = profile?.subscription_tier === "pro" || todayCount < 1;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateContent = async () => {
    if (!canGenerate) {
      toast.error(
        "Daily limit reached. Upgrade to Pro for unlimited generations!"
      );
      return;
    }

    if (!formData.niche || !formData.goal || !formData.contentType) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Simulate AI content generation (replace with actual OpenAI API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockContent: GeneratedContent = {
        hook: generateMockHook(formData),
        caption: generateMockCaption(formData),
        hashtags: generateMockHashtags(formData),
        cta: generateMockCTA(formData),
      };

      setGeneratedContent(mockContent);

      // Save to database
      await addGeneration({
        niche: formData.niche,
        goal: formData.goal,
        content_type: formData.contentType,
        hook: mockContent.hook,
        caption: mockContent.caption,
        hashtags: mockContent.hashtags,
        cta: mockContent.cta,
      });

      toast.success("Content generated successfully!");
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const copyFullContent = async () => {
    if (!generatedContent) return;

    const fullContent = `${generatedContent.hook}\n\n${
      generatedContent.caption
    }\n\n${generatedContent.hashtags}${
      generatedContent.cta ? `\n\n${generatedContent.cta}` : ""
    }`;
    await copyToClipboard(fullContent);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to continue
          </h2>
          <Link
            to="/auth"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Generate Viral Content
          </h1>
          <p className="text-xl text-gray-600">
            Create engaging posts that your audience will love
          </p>

          {/* Usage Counter */}
          <div className="mt-6 inline-flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md border border-purple-100">
            {profile?.subscription_tier === "pro" ? (
              <>
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Pro: Unlimited generations
                </span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">
                  {todayCount}/3 generations used today
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Content Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niche
                </label>
                <select
                  value={formData.niche}
                  onChange={(e) => handleInputChange("niche", e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select your niche</option>
                  {niches.map((niche) => (
                    <option key={niche} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select your goal</option>
                  {goals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={formData.contentType}
                  onChange={(e) =>
                    handleInputChange("contentType", e.target.value)
                  }
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select content type</option>
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={generateContent}
                disabled={loading || !canGenerate}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </button>

              {!canGenerate && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-700 mb-2">
                    You've reached your daily limit of 3 generations.
                  </p>
                  <Link
                    to="/pricing"
                    className="text-sm font-medium text-purple-600 hover:text-purple-500 underline"
                  >
                    Upgrade to Pro for unlimited generations →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Generated Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Generated Content
              </h2>
              {generatedContent && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyFullContent}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy All</span>
                  </button>
                  <button
                    onClick={generateContent}
                    disabled={loading || !canGenerate}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                </div>
              )}
            </div>

            {generatedContent ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900">Hook</h3>
                    <button
                      onClick={() => copyToClipboard(generatedContent.hook)}
                      className="text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {generatedContent.hook}
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Type className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900">Caption</h3>
                    <button
                      onClick={() => copyToClipboard(generatedContent.caption)}
                      className="text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {generatedContent.caption}
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Hash className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900">Hashtags</h3>
                    <button
                      onClick={() => copyToClipboard(generatedContent.hashtags)}
                      className="text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {generatedContent.hashtags}
                  </p>
                </div>

                {generatedContent.cta && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Zap className="w-5 h-5 text-purple-500" />
                      <h3 className="font-semibold text-gray-900">
                        Call to Action
                      </h3>
                      <button
                        onClick={() => copyToClipboard(generatedContent.cta!)}
                        className="text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {generatedContent.cta}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Fill out the form and click "Generate Content" to see your
                  viral post!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock content generation functions (replace with actual OpenAI API calls)
function generateMockHook(formData: FormData): string {
  const hooks = {
    "Gain Followers": [
      "Stop scrolling if you want to grow your following 👇",
      "This one tip changed everything for me...",
      "POV: You finally cracked the code to viral content",
      "You’re invisible online because of *this* one mistake 👀",
      "No one tells you this about building an audience...",
      "3 followers yesterday, 300 today — here’s what changed.",
      "If you're not doing this, your growth is stuck.",
      "Before you blame the algorithm, try this...",
      "Struggling to gain traction? Try posting this once a week.",
      "Growth isn’t magic. It’s method. Here’s mine:",
    ],
    "Get Sales": [
      "My client made $10K in one week using this strategy:",
      "The simple method that doubled my income:",
      "Why 99% of people fail at selling (and how to be the 1%)",
      "You don’t need more leads. You need this.",
      "This sales trick made me more in 1 day than the whole month.",
      "It’s not your product — it’s how you sell it.",
      "Here’s why your DMs aren’t converting (and how to fix it):",
      "How to turn content into cash — no hard sells, no stress.",
      "Forget funnels. Do this instead and watch your sales spike.",
      "The fastest path from post to profit? Let me show you.",
    ],
    "Go Viral": [
      "This is about to blow your mind 🤯",
      "Plot twist: Everything you know is wrong",
      "The secret that influencers don't want you to know:",
      "I didn’t expect this to go viral. But it did. Here’s why:",
      "100K views in 24 hours. Here’s what made it work:",
      "You won't believe how simple this viral hack is...",
      "Everyone told me this wouldn’t work — now it has 1M views.",
      "This post broke the internet. Let’s break it again.",
      "Here’s how I made the algorithm fall in love with my content:",
      "This isn’t a trend. It’s a strategy that wins. Every. Time.",
    ],
    "Be Funny": [
      "Me trying to be productive on Monday:",
      "When someone says pineapple doesn't belong on pizza:",
      "That awkward moment when...",
      "POV: You think you're just vibing, but your camera's on.",
      "My face when the group chat starts popping off at 2AM:",
      "If anxiety were a sport, I'd have 3 Olympic medals.",
      "They said 'act natural' — so I panicked.",
      "Who needs therapy when you’ve got group chats like this:",
      "Siri, play the soundtrack to my quarter-life crisis.",
      "Spoiler alert: I didn’t have my life together at 5AM either.",
    ],
    "Educate Audience": [
      "Most people misunderstand this — let me break it down:",
      "What schools never taught us but we all need to know:",
      "This one concept changed how I see everything:",
      "Don't learn the hard way. Here's what I wish I knew sooner.",
      "Here’s what no one’s teaching (but should be):",
      "Your brain is about to grow 3 sizes. 🧠",
      "Warning: This will challenge what you thought was true.",
      "No fluff, just facts — here’s how it *actually* works:",
      "The truth behind the trend everyone is blindly following:",
      "Ever wondered how this really works? Let me show you.",
    ],
    "Build Community": [
      "Let’s get real for a second — no filters, no fluff.",
      "If you've ever felt alone, this one’s for you.",
      "We're all figuring it out — here’s what helped me.",
      "The comments are open — let's talk about it. 👇",
      "You belong here, even on your worst days.",
      "I built this space for people like us.",
      "We’re stronger together. Always.",
      "Here's your reminder that you’re not alone in this.",
      "Join the conversation — your voice matters.",
      "Let’s normalize talking about this stuff. Today.",
    ],
  };

  const goalHooks =
    hooks[formData.goal as keyof typeof hooks] || hooks["Go Viral"];
  return goalHooks[Math.floor(Math.random() * goalHooks.length)];
}

function generateMockCaption(formData: FormData): string {
  return `Here's the thing about ${formData.niche.toLowerCase()}...

Most people get it completely wrong.

They chase overnight success.
They copy trends hoping for virality.
They think success comes from complicated strategies, expensive tools, or having the “perfect” setup.

But the truth? It's much simpler—and far more powerful.

After working with hundreds of clients, digging into what truly moves the needle, I've discovered the ONE thing that separates real winners from the rest:

✨ Consistency + Value + Authenticity = Results that last ✨

It’s not about going viral once. It’s about building trust daily.
It's not about shouting louder. It’s about speaking clearer.
It’s not about followers. It’s about the lives you impact.

Your audience isn’t looking for a celebrity.
They’re craving realness.
They’re searching for someone who understands their struggles,
Their doubts,
Their dreams.

They don’t need another guru.
They need someone who’s walked their path.
Someone who failed, learned, and rose again.
Someone who can show them what’s possible without pretending to be perfect.

That someone could be you.

If you’re ready to stop blending in,
If you’re ready to start building something meaningful…

Then this is your sign to begin.

Let’s write your story, one authentic piece of content at a time. 📈🚀`;
}

function generateMockHashtags(formData: FormData): string {
  const nicheHashtags = {
    "Fitness & Health":
      "#fitness #health #workout #gym #motivation #fitnessmotivation #healthylifestyle #fitspo #training #wellness",
    "Fashion & Style":
      "#fashion #style #ootd #fashionista #styleinspo #outfitoftheday #fashionblogger #trendy #stylish #fashionstyle",
    "Christianity & Faith":
      "#faith #christian #jesus #god #prayer #bible #blessed #christianlife #faithjourney #godisgood",
    "Business & Entrepreneurship":
      "#business #entrepreneur #success #mindset #hustle #businessowner #motivation #leadership #growth #entrepreneurlife",
  };

  const niche = formData.niche as keyof typeof nicheHashtags;
  return (
    nicheHashtags[niche] ||
    "#viral #content #socialmedia #instagram #fyp #facebook #trending #growth #engagement #influence #creator"
  );
}

function generateMockCTA(formData: FormData): string | null {
  const ctas = [
    "Double tap if you agree! 💪",
    `Save this post on ${formData} for later and share with someone who needs to see it!`,
    "What's your biggest challenge? Drop it in the comments below! 👇",
    "Follow for more tips like this! 🔥",
    "Tag a friend who needs to see this! 👥",
  ];

  return Math.random() > 0.3
    ? ctas[Math.floor(Math.random() * ctas.length)]
    : null;
}
