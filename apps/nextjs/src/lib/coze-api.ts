/**
 * Coze API Integration Library
 * Handles communication with Coze AI platform for image analysis and prompt generation
 */

interface CozeConfig {
  apiKey: string;
  workflowId: string;
  baseUrl?: string;
}

interface UploadFileResponse {
  code: number;
  msg: string;
  data?: {
    file_info: {
      id: string;
      file_name: string;
      file_size: number;
      file_type: string;
      upload_time: string;
    };
  };
}

interface WorkflowRunResponse {
  code: number;
  msg: string;
  data?: {
    execute_id: string;
    status: string;
    output?: any;
    result?: any;
  };
}

export class CozeAPI {
  private config: CozeConfig;
  private baseUrl: string;

  constructor(config: Partial<CozeConfig> = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.COZE_API_KEY || '',
      workflowId: config.workflowId || process.env.COZE_WORKFLOW_ID || '',
      baseUrl: config.baseUrl || 'https://api.coze.cn',
    };
    this.baseUrl = this.config.baseUrl || 'https://api.coze.cn';
  }

  /**
   * Check if the API is properly configured
   */
  isConfigured(): boolean {
    return !!(this.config.apiKey && this.config.workflowId);
  }

  /**
   * Upload a file to Coze
   */
  async uploadFile(file: File): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Coze API is not properly configured');
    }

    const formData = new FormData();
    formData.append('file', file);

    console.log('Uploading file to Coze:', file.name, 'Size:', file.size);
    
    const response = await fetch(`${this.baseUrl}/v1/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: formData,
    });

    console.log('Upload response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload failed with error:', errorText);
      throw new Error(`Failed to upload file: ${errorText}`);
    }

    const result = await response.json();
    console.log('Upload response:', JSON.stringify(result, null, 2));

    // Check different possible response formats
    // Format 1: { code: 0, data: { id: ... } } (Based on actual response)
    if (result.code === 0 && result.data?.id) {
      return result.data.id;
    }
    
    // Format 2: { code: 0, data: { file_info: { id: ... } } }
    if (result.code === 0 && result.data?.file_info?.id) {
      return result.data.file_info.id;
    }
    
    // Format 3: { id: ... } (direct file ID)
    if (result.id) {
      return result.id;
    }
    
    // Format 4: { file_id: ... }
    if (result.file_id) {
      return result.file_id;
    }
    
    // If none of the expected formats, log the actual response
    console.error('Unexpected upload response format:', result);
    throw new Error(`No file ID found in response. Response: ${JSON.stringify(result)}`);
  }

  /**
   * Run a workflow with parameters
   */
  async runWorkflow(parameters: Record<string, any>): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Coze API is not properly configured');
    }

    // Parameters should be passed as an object, not stringified
    const requestBody = {
      workflow_id: this.config.workflowId,
      parameters: parameters, // Pass as object directly
    };

    console.log('Running workflow with params:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${this.baseUrl}/v1/workflow/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Workflow response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Workflow failed with error:', errorText);
      throw new Error(`Failed to run workflow: ${errorText}`);
    }

    const result = await response.json();
    console.log('Workflow response:', JSON.stringify(result, null, 2));

    if (result.code !== 0) {
      throw new Error(`Workflow execution failed: ${result.msg}`);
    }

    // If workflow is asynchronous, poll for completion
    if (result.data?.execute_id && result.data?.status !== 'completed') {
      return await this.pollWorkflowResult(result.data.execute_id);
    }

    // Parse the data field if it's a JSON string
    if (typeof result.data === 'string') {
      try {
        return JSON.parse(result.data);
      } catch (e) {
        return result.data;
      }
    }

    return result.data;
  }

  /**
   * Poll for workflow result
   */
  private async pollWorkflowResult(executeId: string, maxAttempts: number = 30): Promise<any> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

      const response = await fetch(`${this.baseUrl}/v1/workflow/run/${executeId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        continue; // Retry on network errors
      }

      const result: WorkflowRunResponse = await response.json();

      if (result.data?.status === 'completed') {
        return result.data;
      } else if (result.data?.status === 'failed') {
        throw new Error('Workflow execution failed');
      }
    }

    throw new Error('Workflow execution timeout');
  }

  /**
   * Generate prompt from image
   */
  async generatePromptFromImage(
    imageFile: File,
    options: {
      model?: string;
      userQuery?: string;
    } = {}
  ): Promise<string> {
    console.log('Processing image:', imageFile.name, 'Size:', imageFile.size);

    // Workflow expects: userQuery, img, promptType
    
    // First upload the file to get a file_id
    const fileId = await this.uploadFile(imageFile);
    console.log('File uploaded with ID:', fileId);
    
    // Parameters should be passed as an object with img containing file_id object
    const workflowParams = {
      userQuery: options.userQuery || "Generate a detailed AI image prompt for this uploaded image",
      img: { file_id: fileId },  // Object with file_id property
      promptType: options.model || 'normal',  // Model type as promptType - normal/flux/midjouney/stableDiffusion
    };
    
    console.log('Running workflow with correct params:', workflowParams);
    
    try {
      const workflowResult = await this.runWorkflow(workflowParams);
      return this.extractPromptFromResult(workflowResult);
    } catch (error) {
      console.error('Workflow execution failed:', error);
      throw error;
    }
  }

  /**
   * Extract prompt from workflow result
   */
  private extractPromptFromResult(workflowResult: any): string {
    console.log('Extracting prompt from result:', JSON.stringify(workflowResult, null, 2));
    
    // Parse the data field if it's a string (workflow returns JSON string in data field)
    let workflowData = workflowResult;
    if (typeof workflowResult === 'string') {
      try {
        workflowData = JSON.parse(workflowResult);
      } catch (e) {
        // If not JSON, use as-is
      }
    }
    
    // Check for prompt in various locations
    // The workflow returns data as a JSON string with output1 or outpu2 field containing the prompt
    let prompt = '';
    if (workflowData.output1) {
      prompt = workflowData.output1;
    } else if (workflowData.outpu2) {
      prompt = workflowData.outpu2;
    } else if (workflowData.output2) {
      prompt = workflowData.output2;
    } else if (workflowData.output) {
      prompt = workflowData.output;
    } else {
      prompt = 
        workflowResult.output?.prompt ||
        workflowResult.result?.prompt ||
        workflowResult.data?.prompt ||
        workflowResult.data?.output ||
        workflowResult.data?.result ||
        workflowResult.prompt ||
        workflowResult.text ||
        workflowResult.message ||
        '';
    }

    if (!prompt) {
      console.error('Could not find prompt in result:', workflowResult);
      throw new Error(`No prompt found in workflow result. Available keys: ${Object.keys(workflowResult).join(', ')}`);
    }

    console.log('Extracted prompt:', prompt);
    return prompt;
  }
}

// Export a singleton instance
export const cozeAPI = new CozeAPI();