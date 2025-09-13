import Link from "next/link";
import { getDictionary } from "~/lib/get-dictionary";
import { Button } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";
import type { Locale } from "~/config/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isZh = params.lang === "zh";
  
  return {
    title: isZh 
      ? "Image to Prompt Generator - AI图像转提示词生成器 | 免费在线工具"
      : "Image to Prompt Generator - Free AI-Powered Image Prompt Tool",
    description: isZh
      ? "最强大的AI图像转提示词生成器。将任何图片转换为详细的AI提示词，支持Midjourney、DALL-E、Stable Diffusion等。免费的image to prompt在线工具。"
      : "The most powerful image to prompt generator. Convert any image to detailed AI prompts for Midjourney, DALL-E, Stable Diffusion. Free online image prompt tool.",
    keywords: isZh
      ? "image to prompt, 图像转提示词, image prompt generator, AI提示词生成器, prompt generator, 提示词生成, image prompt, AI图像分析"
      : "image to prompt, image to prompt generator, image prompt, prompt generator, AI prompt tool, reverse image prompt, photo to prompt, picture to text prompt",
    openGraph: {
      title: isZh 
        ? "Image to Prompt Generator - AI图像转提示词生成器"
        : "Image to Prompt Generator - Convert Images to AI Prompts",
      description: isZh
        ? "将图片转换为强大的AI提示词。支持所有主流AI绘画工具。"
        : "Convert images to powerful AI prompts. Support all major AI art tools.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isZh 
        ? "Image to Prompt Generator - AI图像转提示词生成器"
        : "Image to Prompt Generator - Free AI Tool",
      description: isZh
        ? "最好用的免费image to prompt工具"
        : "The best free image to prompt generator online",
    },
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
        'ja': '/ja',
        'ko': '/ko',
      },
    },
  };
}

export default async function IndexPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Free </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Image to Prompt
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Generator</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            The Most Powerful AI-Powered Image Prompt Generator
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
            Convert any image to detailed prompts instantly. Perfect for Midjourney, DALL-E, Stable Diffusion and more.
          </p>

          <div className="flex justify-center gap-4 mb-16">
            <Link href={`/${lang}/tools/image-to-prompt`}>
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full"
              >
                Try it now!
              </Button>
            </Link>
            <Link href={`/${lang}/docs`}>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg rounded-full border-2"
              >
                Tutorials
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Image to Prompt */}
          <Link href={`/${lang}/tools/image-to-prompt`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow cursor-pointer h-full">
              <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Image to Prompt Converter</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced image to prompt generator - Convert any image to detailed AI prompts instantly
              </p>
            </div>
          </Link>

          {/* Magic Enhance */}
          <Link href={`/${lang}/tools/magic-enhance`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow cursor-pointer h-full">
              <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Prompt Generator Plus</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enhanced prompt generator - Transform simple ideas into professional image prompts
              </p>
            </div>
          </Link>

          {/* AI Describe Image */}
          <Link href={`/${lang}/tools/ai-describe`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow cursor-pointer h-full">
              <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Image Prompt Analyzer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional image prompt analysis - Extract detailed descriptions from any image
              </p>
            </div>
          </Link>

          {/* AI Image Generator */}
          <Link href={`/${lang}/tools/ai-generator`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow cursor-pointer h-full">
              <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Prompt to Image Generator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete the cycle - Use generated prompts to create stunning AI images
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Image to Prompt Generator Suite
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            The most comprehensive image prompt generator toolkit - From image to prompt and back to image
          </p>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Fast Processing */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
            <div className="mb-4 mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
              <Icons.Rocket className="w-10 h-10 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning-Fast Image to Prompt</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our image to prompt generator delivers results in seconds with state-of-the-art AI models.
            </p>
          </div>

          {/* Cloud Powered */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
            <div className="mb-4 mx-auto w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-full flex items-center justify-center">
              <Icons.Cloud className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Prompt Generator Technology</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our cloud-based prompt generator ensures 99.9% uptime and consistent performance.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Why Choose Our Image to Prompt Generator?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">What is Image to Prompt?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Image to prompt</strong> technology uses advanced AI to analyze any image and generate detailed text descriptions that can be used as prompts for AI art generators. Our <strong>image to prompt generator</strong> supports all major platforms including Midjourney, DALL-E, and Stable Diffusion.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Whether you're looking to recreate a style, understand composition, or generate similar artwork, our <strong>image prompt</strong> tools provide the perfect solution.
              </p>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">How Our Prompt Generator Works</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our <strong>prompt generator</strong> uses state-of-the-art vision AI models to understand images at multiple levels - from basic objects and scenes to artistic styles, composition, and mood. The <strong>image to prompt generator</strong> process is simple:
              </p>
              <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Upload any image to our image prompt analyzer</li>
                <li>AI processes and extracts detailed descriptions</li>
                <li>Receive optimized prompts for your preferred AI tool</li>
                <li>Use generated prompts to create new AI artwork</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Features of Our Image to Prompt Generator</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">✨ Accurate Image Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our image to prompt AI accurately identifies objects, styles, colors, and composition
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🚀 Fast Prompt Generation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Generate image prompts in seconds with our optimized prompt generator engine
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎨 Multi-Platform Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Image prompts optimized for Midjourney, DALL-E, Stable Diffusion, and more
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔧 Customizable Output</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Adjust prompt generator settings for different styles and detail levels
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💡 Smart Enhancement</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our image to prompt generator adds artistic keywords automatically
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🆓 Free to Use</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Start using our image prompt generator completely free, no credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">What is an image to prompt generator?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                An image to prompt generator is an AI tool that analyzes images and converts them into detailed text descriptions (prompts) that can be used with AI image generation tools like Midjourney, DALL-E, or Stable Diffusion.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">How accurate is the image prompt generation?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our image to prompt technology uses advanced AI models to achieve high accuracy in identifying objects, styles, colors, composition, and artistic elements, providing detailed and usable prompts for AI art generation.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Can I use generated prompts with any AI tool?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Our prompt generator creates versatile image prompts that work with all major AI art platforms including Midjourney, DALL-E, Stable Diffusion, Leonardo AI, and more.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Is the image to prompt generator free?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, our basic image to prompt generator is completely free to use. We offer premium features for professional users who need advanced prompt generation capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}