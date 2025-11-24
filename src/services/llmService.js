import axios from 'axios';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = import.meta.env.VITE_OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'anthropic/claude-3.5-sonnet';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'PULSE - PlantUML Script Engine';

const SYSTEM_PROMPT = `You are an expert Software Architect specializing in PlantUML diagrams. 

CRITICAL RULES:
1. Output ONLY valid PlantUML code inside \`\`\`plantuml code blocks
2. Do NOT provide explanations unless explicitly asked
3. Ensure all diagrams are syntactically correct
4. Use appropriate PlantUML diagram types (sequence, class, activity, component, etc.)
5. Follow PlantUML best practices for clarity and readability

Your response should contain ONLY the PlantUML code block, nothing else.`;

export const generatePlantUML = async (userPrompt) => {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
    throw new Error('OpenRouter API key not configured. Please set VITE_OPENROUTER_API_KEY in your .env file.');
  }

  try {
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: LLM_MODEL,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': SITE_URL,
          'X-Title': SITE_NAME,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    return extractPlantUMLCode(content);
  } catch (error) {
    console.error('LLM API Error:', error);
    if (error.response) {
      throw new Error(`API Error: ${error.response.data.error?.message || error.response.statusText}`);
    }
    throw new Error(`Failed to generate PlantUML: ${error.message}`);
  }
};

const extractPlantUMLCode = (content) => {
  // Extract content between ```plantuml and ```
  const plantumlRegex = /```plantuml\s*([\s\S]*?)```/i;
  const match = content.match(plantumlRegex);
  
  if (match && match[1]) {
    return match[1].trim();
  }
  
  // Fallback: try to extract any code block
  const codeBlockRegex = /```\s*([\s\S]*?)```/;
  const codeMatch = content.match(codeBlockRegex);
  
  if (codeMatch && codeMatch[1]) {
    return codeMatch[1].trim();
  }
  
  // If no code block found, return the content as-is (might be raw PlantUML)
  return content.trim();
};
