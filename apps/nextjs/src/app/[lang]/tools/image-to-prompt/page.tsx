"use client";

import React, { useState } from "react";
import { Button } from "@saasfly/ui/button";
import { Card } from "@saasfly/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@saasfly/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@saasfly/ui/select";
import * as Icons from "@saasfly/ui/icons";
import { toast } from "@saasfly/ui/use-toast";

export default function ImageToPromptPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("normal");
  const [apiStatus, setApiStatus] = useState<"checking" | "configured" | "not_configured" | "error">("checking");
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check API status on mount
  React.useEffect(() => {
    fetch("/api/tools/image-to-prompt")
      .then(res => res.json())
      .then(data => {
        console.log("API Status Response:", data);
        setApiStatus(data.status === "configured" ? "configured" : "not_configured");
        setIsDemoMode(data.demo_mode || false);
      })
      .catch((error) => {
        console.error("Failed to check API status:", error);
        setApiStatus("error");
        setIsDemoMode(true);
      });
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePrompt = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create FormData with the image and parameters matching workflow
      const formData = new FormData();
      formData.append("img", selectedImage);  // Changed from image to img
      formData.append("promptType", selectedModel);
      formData.append("userQuery", "Generate a detailed AI image prompt for this image");

      // Call the API
      const response = await fetch("/api/tools/image-to-prompt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate prompt");
      }

      const result = await response.json();
      
      if (result.success && result.prompt) {
        setGeneratedPrompt(result.prompt);
        toast({
          title: "Prompt generated successfully!",
          description: "You can now copy or edit the generated prompt",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Free Image to Prompt Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert Image to Prompt to generate your own image
          </p>
          {apiStatus === "not_configured" && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <Icons.Warning className="h-4 w-4" />
              <span className="text-sm">
                API not configured - Configure Coze API for real results
              </span>
            </div>
          )}
          {apiStatus === "checking" && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 rounded-lg">
              <Icons.Spinner className="h-4 w-4 animate-spin" />
              <span className="text-sm">
                Checking API status...
              </span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="image-to-prompt" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="image-to-prompt" className="flex items-center gap-2">
                <Icons.Image className="h-4 w-4" />
                Image to Prompt
              </TabsTrigger>
              <TabsTrigger value="text-to-prompt" className="flex items-center gap-2">
                <Icons.FileText className="h-4 w-4" />
                Text to Prompt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image-to-prompt">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left side - Upload */}
                <div>
                  <div className="mb-4">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-8 text-center hover:border-purple-400 transition-colors h-[400px] flex items-center justify-center">
                        {imagePreview ? (
                          <div className="relative w-full">
                            <img 
                              src={imagePreview} 
                              alt="Uploaded" 
                              className="max-w-full h-auto rounded-lg mx-auto max-h-[350px] object-contain"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedImage(null);
                                setImagePreview(null);
                                setGeneratedPrompt("");
                              }}
                            >
                              <Icons.Close className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Icons.Upload className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                            <p className="text-lg font-medium mb-2">Upload a photo or drag and drop</p>
                            <p className="text-sm text-gray-500">PNG, JPG, or WEBP up to 5MB</p>
                          </div>
                        )}
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mb-4"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Upload Image
                  </Button>

                  <p className="text-sm text-center text-gray-500">
                    Input Image URL
                  </p>
                </div>

                {/* Right side - Preview */}
                <div>
                  <Card className="p-6 h-[400px]">
                    <h3 className="font-semibold mb-4">Image Preview</h3>
                    <div className="h-[calc(100%-2rem)] flex items-center justify-center">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-full max-h-full rounded-lg object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Icons.Image className="h-16 w-16 mb-4" />
                          <p>Your image will show here</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>

              {/* Model Selection */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className={`p-4 cursor-pointer border-2 transition-all ${
                  selectedModel === 'normal' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'hover:border-purple-300'
                }`} onClick={() => setSelectedModel('normal')}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedModel === 'normal' && <Icons.Check className="h-4 w-4 text-purple-600" />}
                    <h4 className="font-semibold">General Image Prompt</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Natural language description of the image
                  </p>
                </Card>

                <Card className={`p-4 cursor-pointer border-2 transition-all ${
                  selectedModel === 'flux' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'hover:border-purple-300'
                }`} onClick={() => setSelectedModel('flux')}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedModel === 'flux' && <Icons.Check className="h-4 w-4 text-purple-600" />}
                    <h4 className="font-semibold">Flux</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimized for state-of-the-art Flux AI models, concise natural language
                  </p>
                </Card>

                <Card className={`p-4 cursor-pointer border-2 transition-all ${
                  selectedModel === 'midjouney' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'hover:border-purple-300'
                }`} onClick={() => setSelectedModel('midjouney')}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedModel === 'midjouney' && <Icons.Check className="h-4 w-4 text-purple-600" />}
                    <h4 className="font-semibold">Midjourney</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tailored for Midjourney generation with Midjourney parameters
                  </p>
                </Card>

                <Card className={`p-4 cursor-pointer border-2 transition-all ${
                  selectedModel === 'stableDiffusion' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'hover:border-purple-300'
                }`} onClick={() => setSelectedModel('stableDiffusion')}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedModel === 'stableDiffusion' && <Icons.Check className="h-4 w-4 text-purple-600" />}
                    <h4 className="font-semibold">Stable Diffusion</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Formatted for Stable Diffusion models
                  </p>
                </Card>
              </div>

              {/* Generate Button */}
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                  onClick={handleGeneratePrompt}
                  disabled={isGenerating || !selectedImage}
                >
                  {isGenerating ? (
                    <>
                      <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Prompt"
                  )}
                </Button>

                <Button variant="link" className="text-purple-600">
                  View History
                </Button>
              </div>

              {/* Generated Prompt Output Box */}
              <div className="mt-8 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-6 min-h-[200px]">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    {generatedPrompt ? "" : "Generated prompt will appear here"}
                  </p>
                  {generatedPrompt && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyPrompt}
                    >
                      <Icons.Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
                {generatedPrompt && (
                  <div>
                    <p className="text-sm whitespace-pre-wrap">{generatedPrompt}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="text-to-prompt">
              <div className="text-center py-16">
                <Icons.FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Text to Prompt</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This feature will be available soon
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Want to analyze specific aspects like art style or describe people in the image? Try our{" "}
              <a href="#" className="text-purple-600 hover:underline font-medium">
                AI Describe Image
              </a>{" "}
              tool for detailed analysis.
            </p>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pb-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Highly Accurate Image to Prompt Generation
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Convert original images to prompts and regenerated with AI to see our prompt accuracy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}