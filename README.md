# PULSE - PlantUML Script Engine

An AI-powered web application that converts natural language requirements into PlantUML diagrams using Large Language Models (LLM).

![PULSE Banner](https://img.shields.io/badge/PULSE-PlantUML%20Script%20Engine-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat&logo=tailwind-css)

## 🚀 Features

### Single Mode
- **AI-Powered Generation**: Convert natural language to PlantUML using Claude 3.5 Sonnet (or any OpenRouter-compatible LLM)
- **Live Preview**: Real-time diagram rendering with zoom and pan controls
- **Monaco Editor**: VS Code-style editor with syntax support
- **Smart Chat Interface**: Interactive AI assistant for diagram creation
- **Multiple Export Formats**: Download as SVG, PNG, or raw .puml files
- **Debounced Rendering**: Optimized to prevent server spam (500ms delay)

### Batch Mode ✨ NEW
- **Excel Upload**: Process multiple requirements from Excel files
- **Automated Bulk Processing**: Generate PlantUML diagrams for all requirements at once
- **Progress Tracking**: Beautiful animated progress bar with real-time status
- **Batch Export**: Automatically save .puml code and .png diagrams for each requirement
- **Error Reporting**: Detailed success/failure statistics and error logs
- **Smart Parsing**: Automatically detects SYS ID and SYS Requirement columns

### General
- **Dockerized**: Complete containerization for easy deployment
- **Tab Navigation**: Easy switching between Single and Batch modes

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand
- **Code Editor**: Monaco Editor
- **LLM Integration**: OpenRouter API (Claude 3.5 Sonnet)
- **Diagram Rendering**: PlantUML Server
- **Zoom/Pan**: react-zoom-pan-pinch
- **Encoding**: plantuml-encoder
- **Excel Parsing**: xlsx (for batch mode)

### Project Structure

```
PULSE/
├── src/
│   ├── components/
│   │   ├── ChatPanel.jsx       # AI chat interface (Single Mode)
│   │   ├── CodeEditor.jsx      # Monaco editor component (Single Mode)
│   │   ├── DiagramPreview.jsx  # Live preview with zoom/pan (Single Mode)
│   │   ├── BatchPanel.jsx      # Batch processing interface ✨ NEW
│   │   └── ProgressBar.jsx     # Animated progress bar ✨ NEW
│   ├── services/
│   │   ├── llmService.js       # OpenRouter API integration
│   │   ├── plantUmlService.js  # PlantUML encoding & rendering
│   │   └── batchService.js     # Excel parsing & batch processing ✨ NEW
│   ├── store/
│   │   └── useAppStore.js      # Zustand state management
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # Frontend container
├── nginx.conf                  # Nginx configuration
├── package.json                # Dependencies
├── BATCH_MODE_GUIDE.md         # Batch mode documentation ✨ NEW
└── README.md                   # This file
```

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for containerized deployment)
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PULSE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenRouter API key:
   ```env
   VITE_OPENROUTER_API_KEY=your_actual_api_key_here
   VITE_LLM_MODEL=anthropic/claude-3.5-sonnet
   VITE_PLANTUML_SERVER_URL=https://www.plantuml.com/plantuml
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Docker Deployment

1. **Build and start containers**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: `http://localhost:3000`
   - PlantUML Server: `http://localhost:8080`

3. **Stop containers**
   ```bash
   docker-compose down
   ```

## 🎯 Usage

### Single Mode - Creating Diagrams with AI

1. **Enter a natural language prompt** in the chat panel:
   ```
   "Create a sequence diagram for a login flow with user, frontend, backend, and database"
   ```

2. **AI generates PlantUML code** automatically

3. **Code appears in the editor** and preview updates in real-time

4. **Edit manually** if needed - changes reflect immediately (with 500ms debounce)

#### Example Prompts

- "Create a class diagram for an e-commerce system"
- "Generate a sequence diagram showing OAuth2 authentication flow"
- "Make an activity diagram for order processing"
- "Design a component diagram for a microservices architecture"

#### Exporting Diagrams

Click the **Export** button in the preview panel to download:
- **SVG**: Vector format (recommended for scaling)
- **PNG**: Raster image format
- **Code**: Raw `.puml` file for version control

### Batch Mode - Processing Multiple Requirements ✨ NEW

1. **Switch to Batch Mode** by clicking the "Batch Mode" tab at the top

2. **Prepare Excel File** with columns:
   - Column B: **SYS ID** (e.g., REQ-001, REQ-002)
   - Column C: **SYS Requirement** (requirement text)

3. **Upload Excel File** using the "Choose Excel File" button

4. **Select Output Folder** (optional) - files will download to your Downloads folder

5. **Start Processing** - Click "Start Batch Processing"
   - Watch the animated progress bar
   - Each requirement generates:
     - `{SYS_ID}.puml` - PlantUML code file
     - `{SYS_ID}.png` - Diagram image

6. **Review Results** - See success/failure statistics and error details

📖 **For detailed batch mode instructions, see [BATCH_MODE_GUIDE.md](./BATCH_MODE_GUIDE.md)**

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key | Required |
| `VITE_OPENROUTER_BASE_URL` | OpenRouter API endpoint | `https://openrouter.ai/api/v1` |
| `VITE_LLM_MODEL` | LLM model to use | `anthropic/claude-3.5-sonnet` |
| `VITE_SITE_URL` | Your site URL (for OpenRouter) | `http://localhost:5173` |
| `VITE_SITE_NAME` | Your site name | `PULSE - PlantUML Script Engine` |
| `VITE_PLANTUML_SERVER_URL` | PlantUML server URL | `https://www.plantuml.com/plantuml` |

### Switching to Local PlantUML Server

For production, update `.env`:
```env
VITE_PLANTUML_SERVER_URL=http://localhost:8080
```

The Docker Compose setup includes a local PlantUML server automatically.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Features Implementation

#### Two-Way Binding
- Chat updates → Editor → Preview
- Manual edits in Editor → Preview (debounced)

#### Debouncing
- 500ms delay after typing stops before re-rendering
- Prevents excessive API calls to PlantUML server

#### LLM System Prompt
```
You are an expert Software Architect specializing in PlantUML diagrams.
Output ONLY valid PlantUML code inside ```plantuml code blocks.
Do not provide explanations unless explicitly asked.
```

## 🐳 Docker Details

### Services

1. **pulse-app** (Port 3000)
   - React frontend built with Vite
   - Served via Nginx
   - Multi-stage build for optimization

2. **plantuml-server** (Port 8080)
   - Official PlantUML server (Jetty)
   - Handles diagram rendering
   - Health checks enabled

### Network

Both services communicate via `pulse-network` bridge network.

## 🛠️ Troubleshooting

### API Key Issues
- Ensure `.env` file exists and contains valid OpenRouter API key
- Check that key is not set to placeholder value
- Verify key has sufficient credits

### Rendering Issues
- Check PlantUML syntax in editor
- Verify PlantUML server is accessible
- Try using public server: `https://www.plantuml.com/plantuml`

### Docker Issues
- Ensure ports 3000 and 8080 are not in use
- Check Docker daemon is running
- View logs: `docker-compose logs -f`

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Resources

- [PlantUML Documentation](https://plantuml.com/)
- [OpenRouter API](https://openrouter.ai/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🎨 Screenshots

### Main Interface
Three-panel layout with Chat, Editor, and Preview

### AI Generation
Natural language to diagram conversion in seconds

### Export Options
Multiple format support for various use cases

---

**Built with ❤️ using React, Vite, and Claude 3.5 Sonnet**
