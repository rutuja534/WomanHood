import { GoogleGenerativeAI } from '@google/generative-ai';

const API_ERROR_MESSAGES = {
  NO_API_KEY: 'API key not configured. Please check your environment settings.',
  INVALID_API_KEY: 'Invalid API key. Please check your configuration.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNKNOWN: 'An unexpected error occurred. Please try again later.',
};

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiError';
  }
}

function getApiKey(): string {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiError(API_ERROR_MESSAGES.NO_API_KEY);
  }
  return apiKey;
}

async function handleGeminiError(error: unknown): Promise<never> {
  console.error('Gemini API Error:', error);
  
  if (error instanceof Error) {
    if (error.message.includes('API key')) {
      throw new GeminiError(API_ERROR_MESSAGES.INVALID_API_KEY);
    }
    if (error.message.includes('429')) {
      throw new GeminiError(API_ERROR_MESSAGES.RATE_LIMIT);
    }
    if (error.message.includes('network')) {
      throw new GeminiError(API_ERROR_MESSAGES.NETWORK_ERROR);
    }
    throw new GeminiError(error.message);
  }
  
  throw new GeminiError(API_ERROR_MESSAGES.UNKNOWN);
}

let genAI: GoogleGenerativeAI | null = null;

function initializeGemini(): GoogleGenerativeAI {
  if (!genAI) {
    try {
      const apiKey = getApiKey();
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (error) {
      throw new GeminiError(API_ERROR_MESSAGES.NO_API_KEY);
    }
  }
  return genAI;
}

export async function analyzeSymptoms(symptoms: string): Promise<string> {
  try {
    const ai = initializeGemini();
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `As a healthcare AI assistant specialized in women's health, analyze these symptoms and provide insights: ${symptoms}

    Please provide a structured response including:
    1. Potential Causes
    2. Recommended Actions
    3. Warning Signs (when to seek immediate medical attention)
    4. General Advice

    Important: Always emphasize that this is AI-generated advice and recommend consulting healthcare professionals for accurate diagnosis.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new GeminiError('No response received from Gemini API');
    }
    
    return text;
  } catch (error) {
    return handleGeminiError(error);
  }
}

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const ai = initializeGemini();
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new GeminiError('No response received from Gemini API');
    }
    
    return text;
  } catch (error) {
    return handleGeminiError(error);
  }
}