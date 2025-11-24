# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure API Key
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenRouter API key:
```env
VITE_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

**Get your API key**: https://openrouter.ai/keys

### Step 3: Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser!

## 🎯 First Diagram

1. In the chat panel, type:
   ```
   Create a sequence diagram for user login
   ```

2. Press Enter and watch the magic happen!

3. The AI will generate PlantUML code and render it instantly

## 🐳 Docker Quick Start

If you prefer Docker:
```bash
docker-compose up -d
```

Access at http://localhost:3000

## 💡 Tips

- **Edit manually**: Changes in the editor update the preview automatically (500ms delay)
- **Export**: Click the Export button to download SVG, PNG, or code
- **Zoom**: Use the zoom controls in the preview panel
- **Clear chat**: Click the trash icon to start fresh

## ⚠️ Troubleshooting

### "API key not configured" error
- Make sure `.env` file exists
- Verify the API key is correct
- Restart the dev server after changing `.env`

### Preview not updating
- Check your PlantUML syntax
- Wait 500ms after typing (debounce delay)
- Check browser console for errors

### Port already in use
- Change port in `vite.config.js`
- Or kill the process using port 5173

## 📚 Example Prompts

Try these in the chat:

- "Create a class diagram for a blog system with User, Post, and Comment"
- "Generate a sequence diagram for OAuth2 authentication"
- "Make an activity diagram for order processing workflow"
- "Design a component diagram for microservices architecture"

---

**Need help?** Check the full README.md for detailed documentation.
