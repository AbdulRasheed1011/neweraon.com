// ── HuggingFace LLM Configuration ─────────────────────────────────
// Step 1: Copy .env.example to .env
// Step 2: Add your HuggingFace API key (free at https://huggingface.co/settings/tokens)
// Step 3: Choose a model below or set VITE_HF_MODEL in .env

export const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || ''

// Model used for the Home page chat interface
// Recommended free models that support chat:
//   mistralai/Mistral-7B-Instruct-v0.2   (general purpose, fast)
//   HuggingFaceH4/zephyr-7b-beta         (instruction-tuned, good quality)
//   meta-llama/Meta-Llama-3-8B-Instruct  (requires HF Pro access)
export const HF_MODEL = import.meta.env.VITE_HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2'

// Chat completions endpoint (OpenAI-compatible)
export const HF_ENDPOINT = `https://api-inference.huggingface.co/models/${HF_MODEL}/v1/chat/completions`

// Max queries a user can send before hitting the limit
export const QUERY_LIMIT = 3

// System prompt for the chat — personalise this to your use case
export const CHAT_SYSTEM_PROMPT = `You are an intelligent AI assistant. Answer questions clearly and helpfully.
Keep responses concise but thorough. You are powered by Abdul Rasheed's AI platform.`
