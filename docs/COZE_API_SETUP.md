# Coze API Setup Guide

This guide explains how to configure the Coze API integration for the Image to Prompt feature.

## Prerequisites

1. A Coze account (https://www.coze.cn)
2. A bot and workflow created in Coze for image analysis
3. API credentials from Coze

## Configuration Steps

### 1. Get Coze API Credentials

1. Log in to your Coze account
2. Navigate to the Workflow section
3. Create or select your image analysis workflow
4. Go to the workflow's API settings
5. Note down your:
   - Personal Access Token (API Key)
   - Workflow ID

### 2. Configure Environment Variables

Add the following variables to your `.env.local` file:

```env
# Coze API Configuration
COZE_API_KEY="your-personal-access-token"
COZE_WORKFLOW_ID="your-workflow-id"
```

### 3. Workflow Requirements

Your Coze workflow should:

1. **Accept Parameters:**
   - `image_file_id` (string) - The ID of the uploaded image
   - `model` (string, optional) - The model type to use

2. **Return Output:**
   - The workflow should return a prompt in one of these fields:
     - `output.prompt`
     - `result.prompt`
     - `data.prompt`
     - `prompt`

### 4. Testing the Integration

1. Start your development server:
   ```bash
   bun run dev:web
   ```

2. Check API status:
   ```bash
   curl http://localhost:3001/api/tools/image-to-prompt
   ```

   You should see:
   ```json
   {
     "status": "configured",
     "message": "Coze API is properly configured"
   }
   ```

3. Test the image-to-prompt feature at:
   http://localhost:3001/tools/image-to-prompt

## Demo Mode

When the Coze API is not configured, the application runs in **Demo Mode**:
- Returns sample prompts for testing
- Shows a warning banner on the UI
- Allows testing the interface without API access

## API Endpoints

### POST /api/tools/image-to-prompt
Upload an image and generate a prompt.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `image` (File) - The image file
  - `model` (string) - Model type (general, flux, midjourney, stable-diffusion)
  - `language` (string) - Output language

**Response:**
```json
{
  "success": true,
  "prompt": "Generated prompt text here...",
  "demo": false
}
```

### GET /api/tools/image-to-prompt
Check API configuration status.

**Response:**
```json
{
  "status": "configured",
  "message": "Coze API is properly configured",
  "demo_mode": false,
  "environment": "production"
}
```

## Troubleshooting

### API Not Configured Error
- Ensure all three environment variables are set
- Restart the development server after changing `.env.local`

### Upload Failures
- Check your API key has upload permissions
- Verify file size limits (typically 5MB for images)

### Workflow Execution Errors
- Verify the workflow ID is correct
- Check the workflow is published and active
- Review workflow parameter requirements

### Timeout Issues
- The API has a 30-second timeout for workflow execution
- Complex workflows may need optimization

## Security Notes

1. Never commit API keys to version control
2. Use environment variables for all sensitive configuration
3. In production, consider using a secrets management service
4. Implement rate limiting to prevent API abuse

## Support

For issues with:
- Coze API: Contact Coze support
- Integration: Create an issue in this repository
- Workflow creation: Refer to Coze documentation