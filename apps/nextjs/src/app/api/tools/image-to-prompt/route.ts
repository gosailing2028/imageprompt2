import { NextRequest, NextResponse } from "next/server";
import { cozeAPI } from "~/lib/coze-api";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("img") as File;  // Changed from image to img
    const promptType = formData.get("promptType") as string;
    const userQuery = formData.get("userQuery") as string;
    
    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Check if API is configured
    if (!cozeAPI.isConfigured()) {
      console.error("Coze API is not configured");
      return NextResponse.json(
        { error: "API configuration missing. Please set COZE_API_KEY and COZE_WORKFLOW_ID in environment variables." },
        { status: 500 }
      );
    }

    // Generate prompt using Coze API
    const generatedPrompt = await cozeAPI.generatePromptFromImage(imageFile, {
      model: promptType || "normal",  // This will be passed as promptType in the workflow - normal/flux/midjouney/stableDiffusion
      userQuery: userQuery || "Generate a detailed AI image prompt for this image",
    });

    return NextResponse.json({
      success: true,
      prompt: generatedPrompt,
    });

  } catch (error) {
    console.error("Error in image-to-prompt API:", error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Internal server error",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check API configuration status
export async function GET() {
  const isConfigured = cozeAPI.isConfigured();
  
  return NextResponse.json({
    status: isConfigured ? "configured" : "not_configured",
    message: isConfigured 
      ? "Coze API is properly configured" 
      : "Please configure COZE_API_KEY and COZE_WORKFLOW_ID in environment variables",
    demo_mode: !isConfigured && process.env.NODE_ENV === "development",
    environment: process.env.NODE_ENV,
  });
}