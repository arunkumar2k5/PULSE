Project: AI-Powered PlantUML Studio

1. Executive Summary

Build a React-based web application that uses Large Language Models (LLM) to convert natural language requirements into PlantUML scripts, renders them instantly using a local PlantUML server, and allows exporting the diagrams. The entire stack must be containerized for easy deployment.

2. Technical Stack

Frontend: React (Vite), Tailwind CSS, Lucide React (Icons).

State Management: Zustand or React Context.

Editor: @monaco-editor/react (VS Code style editor).

LLM Integration: Openrouter-compatible API format (to support all LLM models).

Diagram Rendering: Self-hosted PlantUML Server (Docker).

Encoding Library: plantuml-encoder (Crucial for communicating with the server).

3. Core Features & Functional Requirements

3.1. The "Smart" Chat Interface (Left Panel)

Chat UI: A chat interface where users enter requirements (e.g., "Create a sequence diagram for a login flow").

LLM Logic:

System Prompt: "You are an expert Software Architect. Output ONLY valid PlantUML code inside ```plantuml``` blocks. Do not explain unless asked."

Parsing: Automatically extract content between plantuml code blocks from the LLM response.

Update: Automatically insert the extracted code into the Editor.

3.2. The Code Editor (Middle/Right Panel)

Syntax Highlighting: visual support for PlantUML syntax.

Two-way Binding:

Updates from Chat -> update Editor.

Manual typing in Editor -> updates Preview.

Debouncing: Wait 500ms after typing stops before triggering a re-render to prevent server spam.

3.3. The Live Preview (Right Panel)

Rendering Logic:

Take text from Editor.

Encode using plantuml-encoder.

Construct URL: http://localhost:8080/svg/{encoded_string}.

Display inside an <img> tag or fetch and render inline SVG.

Zoom/Pan: Allow users to zoom in/out of large diagrams (react-zoom-pan-pinch recommended).

3.4. Export & Dockerization

Download Options:

PNG: Fetch blob from /png/{code} endpoint and trigger download.

SVG: Fetch blob from /svg/{code} endpoint.

Code: Download raw .puml file.

Docker: A docker-compose.yml that spins up the React App and the PlantUML server together.

4. Implementation Details for the AI Coder

4.1 PlantUML Server Integration

You cannot send raw text to the server. You must use the plantuml-encoder package.

import plantumlEncoder from 'plantuml-encoder';

const encoded = plantumlEncoder.encode("Alice -> Bob: Hello");
// For Public Testing:
// const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
use the public plantuml server for initial testing: https://www.plantuml.com/plantuml (specifically https://www.plantuml.com/plantuml/svg/{encoded_string}).



5. Development Phases

Scaffold: Vite + Tailwind + Docker Compose.

Core: Implement Editor + PlantUML Preview. Use the official public server for initial testing: https://www.plantuml.com/plantuml (specifically https://www.plantuml.com/plantuml/svg/{encoded_string}).

Intelligence: Implement LLM API calls and Response parsing.

Packaging: Switch to local Docker PlantUML server and finalize export features.