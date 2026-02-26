# PROJECT REPORT

# Devin AI – A Collaborative AI-Powered Coding Platform

---

## CERTIFICATE

This is to certify that the project entitled **"Devin AI – A Collaborative AI-Powered Coding Platform"** is a bonafide work carried out by:

| Name | Roll No. |
|------|----------|
| Sohail Yunus Shaikh | 112 |
| Rahul Sachin Pawar | 91 |

in partial fulfillment of the requirements for the award of the degree of **Bachelor of Science (Computer Science)** at **New Arts, Commerce & Science College, Parner**, during the academic year **2025–2026**.

**Project Guide:** Prof. Nilesh Sobale
**Department:** B.Sc. Computer Science
**Date:** February 2026

---

## ACKNOWLEDGMENT

We would like to express our sincere gratitude to our respected project guide **Prof. Nilesh Sobale** for his valuable guidance, constant encouragement, and support throughout the development of this project. We are also deeply thankful to our respected Head of Department, **Prof. Ramdas Gholap**, for providing the necessary resources and facilities.

We extend our gratitude to all the faculty members of the **Department of B.Sc. Computer Science, New Arts, Commerce & Science College, Parner** for their constructive suggestions and support. We would also like to thank our families and friends for their constant motivation and encouragement.

Finally, we are grateful to all the open-source communities and documentation teams behind the technologies used in this project, including React, Node.js, MongoDB, Socket.io, and Google Gemini.

---

## ABSTRACT

**Devin AI** is a full-stack, real-time collaborative coding platform that integrates artificial intelligence for code generation and in-browser code execution. The platform enables multiple users to collaborate on software projects simultaneously through real-time chat and shared workspaces.

The system leverages a modern technology stack comprising React 19 for the frontend, Node.js with Express 5 for the backend, MongoDB for data persistence, Redis for session management, and Socket.io for real-time bidirectional communication. A key feature of the platform is its integration with multiple AI providers—Google Gemini, Hugging Face, and OpenAI—allowing users to generate code through natural language prompts. The generated code is rendered in an in-browser IDE powered by Monaco Editor and executed using WebContainer API without any server-side compilation.

The platform addresses the growing need for remote collaboration tools in software development by combining project management, real-time communication, AI-assisted code generation, and code execution into a single unified interface. Security is implemented through JWT-based authentication with Redis-backed token blacklisting, bcrypt password hashing, and rate limiting on AI requests.

**Keywords:** Real-time Collaboration, Artificial Intelligence, Code Generation, WebContainer, MERN Stack, Socket.io, WebSocket, JWT Authentication

---

## TABLE OF CONTENTS

1. [Introduction](#1-introduction)
2. [Literature Review](#2-literature-review)
3. [System Analysis](#3-system-analysis)
4. [System Design](#4-system-design)
5. [Implementation](#5-implementation)
6. [Testing and Results](#6-testing-and-results)
7. [Screenshots](#7-screenshots)
8. [Conclusion](#8-conclusion)
9. [References](#9-references)

---

## 1. INTRODUCTION

### 1.1 Overview

Software development has increasingly become a collaborative endeavor, with distributed teams working across different geographies and time zones. The need for real-time collaboration tools has grown significantly, especially after the global shift towards remote work. Simultaneously, Artificial Intelligence has emerged as a powerful tool for assisting developers in writing, debugging, and understanding code.

**Devin AI** is a web-based collaborative coding platform that brings together real-time communication, AI-powered code generation, and in-browser code execution. It allows teams to create shared projects, communicate through real-time chat, request AI assistance for code generation, and execute code directly in the browser—all within a single, unified interface.

### 1.2 Problem Statement

Existing development workflows often require developers to switch between multiple tools: a code editor, a terminal, a chat application, and an AI assistant. This context-switching reduces productivity and makes collaboration cumbersome. There is a need for an integrated platform that combines these functionalities into a seamless experience.

### 1.3 Objectives

The primary objectives of this project are:

1. **Develop a real-time collaborative platform** that allows multiple users to work on projects simultaneously with live chat functionality.
2. **Integrate multiple AI providers** (Google Gemini, Hugging Face, OpenAI) to enable natural language-based code generation within the platform.
3. **Implement an in-browser IDE** with syntax highlighting, file management, and code execution capabilities using WebContainer technology.
4. **Ensure security** through JWT-based authentication, password hashing, token blacklisting, and rate limiting.
5. **Build a scalable architecture** using the MERN stack with real-time communication via WebSockets.

### 1.4 Scope

The scope of the project includes:

- User registration and authentication with secure session management
- Project creation and management with collaborator support
- Real-time messaging within project workspaces using WebSockets
- AI-powered code generation using multiple AI providers
- In-browser code editing using Monaco Editor
- In-browser code execution using WebContainer API
- Rate limiting and security measures

### 1.5 Significance

This project demonstrates the practical application of several advanced web development concepts:

- **Full-stack development** using the MERN (MongoDB, Express, React, Node.js) stack
- **Real-time communication** using WebSocket protocol (Socket.io)
- **AI integration** with external APIs for intelligent code generation
- **Browser-based computation** using WebContainer technology
- **Security best practices** including JWT, bcrypt, Redis-based token management, and CORS

---

## 2. LITERATURE REVIEW

### 2.1 Collaborative Development Platforms

Collaborative coding platforms have evolved significantly over the past decade. Tools like **GitHub Codespaces**, **Replit**, and **CodeSandbox** have pioneered the concept of browser-based development environments. These platforms allow developers to write, run, and debug code entirely within a web browser, eliminating the need for local development environment setup.

**GitHub Codespaces** provides cloud-hosted development environments integrated with GitHub repositories. **Replit** offers a collaborative browser-based IDE with multiplayer editing capabilities. **CodeSandbox** focuses on rapid prototyping with instant preview and deployment features.

### 2.2 AI-Assisted Code Generation

The integration of AI into software development has been accelerated by large language models (LLMs). Notable developments include:

- **GitHub Copilot** (powered by OpenAI Codex): Provides inline code suggestions within IDEs
- **Google Gemini**: A multimodal AI model capable of understanding and generating code across multiple programming languages
- **Hugging Face Models**: An open-source ecosystem hosting thousands of AI models, including code-specialized models like Qwen2.5-Coder

These AI tools have demonstrated the ability to understand natural language descriptions and generate corresponding code, significantly accelerating the development process.

### 2.3 WebSocket Communication

The WebSocket protocol (RFC 6455) enables full-duplex communication channels over a single TCP connection. **Socket.io** is a widely-used library that abstracts WebSocket communication and provides additional features such as:

- Automatic reconnection
- Room-based messaging
- Fallback to HTTP long-polling
- Binary streaming

Socket.io is particularly well-suited for real-time collaborative applications where low-latency bidirectional communication is essential.

### 2.4 WebContainer Technology

**WebContainer** is a browser-based runtime developed by StackBlitz that allows Node.js applications to run entirely within the browser. It provides:

- A virtual file system
- A Node.js-compatible runtime
- npm package installation capabilities
- Process spawning and management

This technology eliminates the need for server-side code execution, reducing infrastructure costs and improving security.

### 2.5 JWT Authentication

JSON Web Tokens (JWT) are an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. In web applications, JWTs are commonly used for:

- Stateless authentication
- Authorization and access control
- Information exchange

Combined with Redis-based token blacklisting, JWT provides a robust authentication mechanism that supports both stateless verification and immediate token invalidation on logout.

---

## 3. SYSTEM ANALYSIS

### 3.1 Existing System

Current development workflows typically involve:

- **Code Editors:** Visual Studio Code, Sublime Text, or web-based editors
- **Communication Tools:** Slack, Discord, or Microsoft Teams for team communication
- **AI Assistants:** ChatGPT, GitHub Copilot, or Google Gemini as standalone tools
- **Terminals:** Local terminal emulators for code execution

**Limitations of the existing system:**

1. Requires switching between multiple applications
2. No unified workspace for code, chat, and AI assistance
3. Local environment setup required for code execution
4. No real-time code sharing without third-party tools
5. AI assistants are disconnected from the coding environment

### 3.2 Proposed System

Devin AI addresses these limitations by providing an integrated platform that combines:

1. **Project Management** – Create and manage projects with collaborators
2. **Real-Time Chat** – Socket.io-powered messaging within project workspaces
3. **AI Assistant** – Multi-provider AI integration for code generation
4. **Code Editor** – Monaco Editor with syntax highlighting and file management
5. **Code Execution** – WebContainer-based in-browser execution with terminal

**Advantages of the proposed system:**

1. Single platform for all development activities
2. No local environment setup required
3. Real-time collaboration with team members
4. AI assistance integrated directly into the workflow
5. Instant code execution in the browser
6. Secure authentication and session management

### 3.3 Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | User registration with email and password | High |
| FR-02 | User login with JWT-based authentication | High |
| FR-03 | User logout with token blacklisting | High |
| FR-04 | Create new projects | High |
| FR-05 | Add collaborators to projects | High |
| FR-06 | Real-time chat within project workspaces | High |
| FR-07 | AI-powered code generation via @ai command | High |
| FR-08 | Multiple AI provider support (Gemini, HF, OpenAI) | Medium |
| FR-09 | In-browser code editor with syntax highlighting | High |
| FR-10 | File tree management | Medium |
| FR-11 | In-browser code execution | High |
| FR-12 | Terminal emulator | Medium |
| FR-13 | Connection status indicator | Low |
| FR-14 | Rate limiting for AI requests | Medium |

### 3.4 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | Performance | Page load time under 3 seconds |
| NFR-02 | Scalability | Support multiple concurrent users per project |
| NFR-03 | Security | Encrypted passwords, secure token management |
| NFR-04 | Usability | Intuitive UI with minimal learning curve |
| NFR-05 | Reliability | Automatic reconnection on connection loss |
| NFR-06 | Compatibility | Support modern browsers (Chrome, Firefox, Edge) |

### 3.5 Hardware and Software Requirements

**Hardware Requirements:**

| Component | Minimum Specification |
|-----------|----------------------|
| Processor | Intel Core i3 or equivalent |
| RAM | 4 GB |
| Storage | 500 MB free disk space |
| Network | Broadband internet connection |

**Software Requirements:**

| Software | Version |
|----------|---------|
| Node.js | v18.0 or higher |
| MongoDB | v4.4 or higher |
| Redis | v6.0 or higher |
| Web Browser | Chrome 90+, Firefox 90+, Edge 90+ |
| Operating System | Windows 10/11, macOS, Linux |

---

## 4. SYSTEM DESIGN

### 4.1 System Architecture

The application follows a **client-server architecture** with real-time communication capabilities:

```
+-------------------+         +-------------------+         +------------------+
|                   |  HTTP   |                   |         |                  |
|   React Frontend  |<------->|  Express Backend  |<------->|     MongoDB      |
|   (Port 5173)     |         |  (Port 8001)      |         |   (Database)     |
|                   |         |                   |         |                  |
+-------------------+         +-------------------+         +------------------+
        |                            |                              
        |      WebSocket             |                              
        |      (Socket.io)           |                      +------------------+
        +<-------------------------->+                      |                  |
                                     |                      |      Redis       |
                                     +--------------------->|  (Token Store)   |
                                     |                      |                  |
                                     |                      +------------------+
                                     |
                                     |                      +------------------+
                                     |                      |   AI Services    |
                                     +--------------------->|  - Gemini API    |
                                                            |  - Hugging Face  |
                                                            |  - OpenAI API    |
                                                            +------------------+
```

### 4.2 Module Description

The system is divided into the following modules:

**Module 1: Authentication Module**
- Handles user registration, login, logout
- JWT token generation and verification
- Password hashing using bcrypt
- Token blacklisting using Redis

**Module 2: Project Management Module**
- Project creation and listing
- Collaborator management (add users to projects)
- Project data retrieval

**Module 3: Real-Time Communication Module**
- WebSocket connection management
- Per-project chat rooms using Socket.io rooms
- Message broadcasting to project members
- Connection status tracking

**Module 4: AI Integration Module**
- Multi-provider AI service integration
- Natural language prompt processing
- JSON response parsing and file tree extraction
- Rate limiting for AI requests

**Module 5: Code Editor Module**
- Monaco Editor integration
- Syntax highlighting for multiple languages
- File tree navigation and tab management
- Auto-save functionality

**Module 6: Code Execution Module**
- WebContainer initialization and management
- File system mounting
- Process spawning and terminal emulation
- Output streaming

### 4.3 Data Flow Diagram

**Level 0 (Context Diagram):**

| Source | Data Flow (Input) | System | Data Flow (Output) | Destination |
|--------|-------------------|--------|-------------------|-------------|
| User | Registration, Login, Chat Messages, AI Requests, Run Code | Devin AI System | JWT Token, Project List, Messages, Generated Code, Output | User |

**Level 1 (Detailed Data Flow):**

| User Action | Module | Data Sent | Data Store | Response to User |
|-------------|--------|-----------|------------|------------------|
| Register / Login | Authentication Module | Email, Password | MongoDB (User Collection) | JWT Token |
| Logout | Authentication Module | JWT Token | Redis (Blacklist) | Confirmation |
| Create Project | Project Management Module | Project Name | MongoDB (Project Collection) | Project Details |
| Add Collaborator | Project Management Module | Project ID, User IDs | MongoDB (Project Collection) | Updated Project |
| Send Message | Real-Time Communication Module | Message Text | - (broadcast only) | Message to all members |
| Send @ai Message | AI Integration Module | Prompt Text | - | AI-Generated Code + Text |
| Run Code | Code Execution Module (WebContainer) | File Contents | - (in-browser) | Terminal Output |

### 4.4 Database Design

**Entity-Relationship Diagram:**

| Entity: USER | Relationship | Entity: PROJECT |
|--------------|--------------|-----------------|
| _id (ObjectId) - Primary Key | One User can belong to Many Projects | _id (ObjectId) - Primary Key |
| email (String) | Many Projects can have Many Users | name (String) |
| password (String) | (Many-to-Many via users array) | users [ObjectId] - References User |

**User Collection Schema:**

| Field | Type | Constraints |
|-------|------|-------------|
| _id | ObjectId | Auto-generated primary key |
| email | String | Required, Unique, Lowercase, 6-50 chars |
| password | String | Required, Hashed with bcrypt (select: false) |

**Project Collection Schema:**

| Field | Type | Constraints |
|-------|------|-------------|
| _id | ObjectId | Auto-generated primary key |
| name | String | Required, Unique, Lowercase, Trimmed |
| users | [ObjectId] | Array of references to User collection |

### 4.5 API Design

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/user/register` | Register a new user | No |
| POST | `/user/login` | Authenticate user, return JWT | No |
| GET | `/user/profile` | Get current user profile | Yes |
| GET | `/user/logout` | Logout, blacklist token | Yes |
| GET | `/user/all-users` | List all registered users | Yes |
| POST | `/project/create-project` | Create a new project | Yes |
| GET | `/project/all` | List user's projects | Yes |
| GET | `/project/get-project/:id` | Get project details | Yes |
| PUT | `/project/add-user` | Add collaborators | Yes |
| GET | `/ai/get-result?prompt=` | Get AI response | Yes |

### 4.6 Use Case Diagram

**Actor:** User

| Use Case | Module | Description |
|----------|--------|-------------|
| Register | Authentication Module | User creates a new account with email and password |
| Login | Authentication Module | User logs in with credentials and receives a JWT token |
| Logout | Authentication Module | User logs out; token is blacklisted in Redis |
| Create Project | Project Management Module | User creates a new project workspace |
| Add Collaborator | Project Management Module | User adds other registered users to a project |
| Send Message | Real-Time Chat Module | User sends a text message to project members |
| Receive Message | Real-Time Chat Module | User receives messages from other project members |
| Request AI Assistance (@ai) | AI Integration Module | User types @ai + prompt to request code generation |
| Receive Generated Code | AI Integration Module | User receives AI-generated code and file tree |
| Edit Code | Code Editor Module | User edits files using Monaco Editor |
| Run Code | Code Execution Module (WebContainer) | User executes code in the browser terminal |
| View Output | Code Execution Module (WebContainer) | User sees real-time output in the terminal |

---

## 5. IMPLEMENTATION

### 5.1 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | React | 19.1.1 | UI Framework |
| Frontend | Vite | 7.1.7 | Build Tool |
| Frontend | Tailwind CSS | 4.1.16 | Styling |
| Frontend | React Router | 7.9.4 | Client-side Routing |
| Frontend | Axios | 1.12.2 | HTTP Client |
| Frontend | Socket.io Client | 4.8.1 | WebSocket Client |
| Frontend | Monaco Editor | 4.7.0 | Code Editor |
| Frontend | WebContainer API | 1.6.1 | In-Browser Execution |
| Backend | Node.js | 18+ | Runtime |
| Backend | Express | 5.1.0 | Web Framework |
| Backend | Socket.io | 4.8.1 | WebSocket Server |
| Backend | Mongoose | 8.19.2 | MongoDB ODM |
| Backend | ioredis | 5.8.2 | Redis Client |
| Backend | jsonwebtoken | 9.0.2 | JWT Authentication |
| Backend | bcrypt | 6.0.0 | Password Hashing |
| Database | MongoDB | - | Primary Database |
| Cache | Redis | - | Token Blacklisting |
| AI | Google Gemini | gemini-2.0-flash-001 | Code Generation |
| AI | Hugging Face | Qwen2.5-Coder-32B | Code Generation |
| AI | OpenAI | - | Code Generation |

### 5.2 Project Structure

```
Devin-AI/
├── Backend/
│   ├── app.js                    # Express app configuration
│   ├── server.js                 # HTTP server + Socket.io setup
│   ├── DB/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── userModel.js          # User schema with auth methods
│   │   └── project_model.js      # Project schema
│   ├── controllers/
│   │   ├── userController.js     # User authentication logic
│   │   ├── project_controller.js # Project CRUD operations
│   │   └── ai_controller.js      # AI request handling
│   ├── services/
│   │   ├── ai_service.js         # Google Gemini integration
│   │   ├── OpenAI_Service.js     # OpenAI integration
│   │   ├── Hugging_Face_Ai.js    # Hugging Face integration
│   │   ├── user_services.js      # User business logic
│   │   ├── project_service.js    # Project business logic
│   │   └── Redis_Services.js     # Redis connection
│   ├── routes/
│   │   ├── userRoutes.js         # User API routes
│   │   ├── projectRoutes.js      # Project API routes
│   │   └── ai_routes.js          # AI API routes
│   ├── middleware/
│   │   └── authMid.js            # JWT authentication middleware
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx              # Entry point
│   │   ├── screens/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Home.jsx          # Project dashboard
│   │   │   └── Project.jsx       # Collaborative IDE
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx     # Route definitions
│   │   ├── config/
│   │   │   ├── axios.js          # HTTP client configuration
│   │   │   ├── socket.js         # Socket.io client setup
│   │   │   └── webContainer.js   # WebContainer initialization
│   │   ├── context/
│   │   │   └── context.jsx       # Global state management
│   │   ├── Auth/
│   │   │   └── AuthMid.jsx       # Protected route wrapper
│   │   └── utils/
│   │       └── cookies.js        # Cookie utilities
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

### 5.3 Key Implementation Details

#### 5.3.1 Authentication Flow

The authentication system uses JWT tokens with Redis-based blacklisting:

1. **Registration:** User submits email and password. Password is hashed using bcrypt with 10 salt rounds. User document is created in MongoDB.

2. **Login:** User submits credentials. Email is looked up in MongoDB. Password is compared using bcrypt. On success, a JWT token is generated with 24-hour expiry and sent as an HTTP cookie.

3. **Authentication Middleware:** Every protected request passes through the `authMid` middleware which:
   - Extracts the token from cookies or Authorization header
   - Checks if the token exists in the Redis blacklist
   - Verifies the token signature using the JWT secret
   - Attaches decoded user information to the request object

4. **Logout:** The token is added to the Redis blacklist, preventing its reuse even before expiry.

#### 5.3.2 Real-Time Communication

Socket.io is used for real-time bidirectional communication:

1. **Connection:** When a user opens a project, a WebSocket connection is established. The socket handshake includes JWT authentication and the project ID.

2. **Socket Authentication Middleware:** Before accepting a connection, the server:
   - Validates the project ID format
   - Retrieves the project from MongoDB
   - Verifies the JWT token
   - Attaches user and project info to the socket

3. **Room-Based Messaging:** Each project has its own Socket.io room. When a user joins a project, they join the corresponding room. Messages are broadcast to all members of that room.

4. **AI Trigger:** When a message contains `@ai`, the server:
   - Extracts the prompt by removing the `@ai` prefix
   - Checks rate limits for the user
   - Routes the request to the selected AI provider
   - Parses the AI response (JSON with text and optional fileTree)
   - Broadcasts the response to all project members

#### 5.3.3 AI Integration

The system supports three AI providers:

1. **Google Gemini (Default):** Uses the `gemini-2.0-flash-001` model with a system instruction that enforces JSON output containing `text` and optional `fileTree` fields.

2. **Hugging Face:** Uses the `Qwen/Qwen2.5-Coder-32B-Instruct` model, specialized for code generation tasks.

3. **OpenAI:** Provides an alternative AI provider option.

The AI response format:
```json
{
  "text": "Explanation of the generated code",
  "fileTree": {
    "filename.js": {
      "file": {
        "contents": "// Generated code here"
      }
    }
  }
}
```

#### 5.3.4 WebContainer Integration

The WebContainer API enables in-browser code execution:

1. **Initialization:** A WebContainer instance is created when the user opens a project.
2. **File Mounting:** When AI generates a fileTree, the files are mounted to the WebContainer's virtual file system.
3. **Code Execution:** Users can run files using a spawned process (e.g., `node app.js`).
4. **Terminal:** A shell process (`jsh`) provides an interactive terminal experience.
5. **Output Streaming:** Process output is streamed in real-time to the terminal UI.

#### 5.3.5 Rate Limiting

AI requests are rate-limited per user to prevent abuse:

- **Maximum Requests:** 10 per minute (rolling window)
- **Cooldown Period:** 5 seconds between consecutive requests
- **Implementation:** In-memory Map with automatic cleanup every 5 minutes
- **User Feedback:** Clear error messages with countdown timers when limits are exceeded

### 5.4 Security Implementation

| Security Measure | Implementation |
|------------------|----------------|
| Password Storage | bcrypt hashing with 10 salt rounds |
| Authentication | JWT tokens with 24h expiry |
| Token Invalidation | Redis-based blacklisting on logout |
| API Protection | Authentication middleware on all protected routes |
| CORS | Whitelist-based origin validation |
| Input Validation | express-validator for request validation |
| Socket Auth | JWT verification in Socket.io middleware |
| Rate Limiting | Per-user AI request throttling |
| Cookie Security | httpOnly, secure, sameSite flags |

---

## 6. TESTING AND RESULTS

### 6.1 Testing Methodology

The application was tested using **manual testing** across different modules:

### 6.2 Test Cases

#### 6.2.1 Authentication Module

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| TC-01 | Register with valid data | email: test@example.com, password: test123 | User created, JWT returned | Pass |
| TC-02 | Register with duplicate email | Existing email | Error: Email already exists | Pass |
| TC-03 | Register with short email | email: ab | Validation error | Pass |
| TC-04 | Login with valid credentials | Valid email and password | JWT token returned | Pass |
| TC-05 | Login with wrong password | Valid email, wrong password | Error: Invalid credentials | Pass |
| TC-06 | Login with non-existent email | Non-existent email | Error: User not found | Pass |
| TC-07 | Access protected route without token | No token | Error: Access denied | Pass |
| TC-08 | Access protected route with blacklisted token | Blacklisted token | Error: Token blacklisted | Pass |
| TC-09 | Logout | Valid token | Token blacklisted, cookie cleared | Pass |

#### 6.2.2 Project Management Module

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| TC-10 | Create project | name: "my-project" | Project created with user as member | Pass |
| TC-11 | Create duplicate project | Existing name | Error: Duplicate name | Pass |
| TC-12 | List user projects | Authenticated user | Array of user's projects | Pass |
| TC-13 | Get project by ID | Valid project ID | Project details with users | Pass |
| TC-14 | Add collaborator | Valid project ID and user IDs | Users added to project | Pass |
| TC-15 | Add collaborator without auth | No token | Error: Access denied | Pass |

#### 6.2.3 Real-Time Communication Module

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| TC-16 | Socket connection with valid token | Valid JWT + project ID | Connected to project room | Pass |
| TC-17 | Socket connection without token | No token | Connection rejected | Pass |
| TC-18 | Send message | Text message | Message broadcast to room | Pass |
| TC-19 | Send @ai message | "@ai create a hello world" | AI response received | Pass |
| TC-20 | Disconnect and reconnect | Network interruption | Auto-reconnection | Pass |

#### 6.2.4 AI Integration Module

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| TC-21 | Simple AI query | "@ai hello" | JSON text response | Pass |
| TC-22 | Code generation query | "@ai create express server" | JSON with fileTree | Pass |
| TC-23 | Rate limit exceeded | 11 requests in 1 minute | Rate limit error message | Pass |
| TC-24 | Cooldown period | 2 requests within 5 seconds | Cooldown error message | Pass |
| TC-25 | Switch AI provider | Select "Hugging Face" | Response from HF model | Pass |

#### 6.2.5 Code Execution Module

| Test ID | Test Case | Input | Expected Output | Result |
|---------|-----------|-------|-----------------|--------|
| TC-26 | Run JavaScript file | `console.log('Hello')` | "Hello" in terminal | Pass |
| TC-27 | Run with syntax error | Invalid JS code | Error message in terminal | Pass |
| TC-28 | Terminal command | `ls` | File listing | Pass |
| TC-29 | Run without file selected | No file selected | Alert message | Pass |

### 6.3 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Google Chrome | 120+ | Fully Compatible |
| Microsoft Edge | 120+ | Fully Compatible |
| Mozilla Firefox | 120+ | Fully Compatible |
| Safari | 17+ | Partially Compatible (WebContainer limitations) |

---

## 7. SCREENSHOTS

### 7.1 Dashboard - Project Management

![Dashboard](Github/Dashboard.png)

*Figure 7.1: Home page showing the project dashboard where users can create new projects, view existing projects with collaborator count, and manage their workspace.*

### 7.2 Project IDE - Collaborative Workspace

![Project IDE](Github/Project.png)

*Figure 7.2: The project workspace featuring the real-time chat panel (left), file explorer, Monaco code editor with syntax highlighting, and the WebContainer-powered terminal (bottom). Users can select AI providers, add collaborators, and run code directly in the browser.*

---

## 8. CONCLUSION

The **Devin AI** project successfully demonstrates the development of a full-stack, real-time collaborative coding platform with AI integration. The system effectively combines multiple advanced technologies to deliver a unified development experience.

**Key achievements:**

1. **Real-Time Collaboration:** Successfully implemented WebSocket-based real-time communication using Socket.io, enabling multiple users to collaborate within project workspaces with minimal latency.

2. **Multi-AI Integration:** Integrated three different AI providers (Google Gemini, Hugging Face, and OpenAI), giving users the flexibility to choose their preferred AI assistant for code generation.

3. **In-Browser Code Execution:** Leveraged WebContainer API to enable code execution entirely within the browser, eliminating the need for server-side compilation infrastructure.

4. **Security:** Implemented a comprehensive security layer including JWT authentication, bcrypt password hashing, Redis-based token blacklisting, CORS protection, and rate limiting.

5. **Modern Architecture:** Built using the MERN stack with modern versions of all technologies (React 19, Express 5, Vite 7), demonstrating proficiency in current industry standards.

The project effectively addresses the problem of context-switching in development workflows by providing a single platform where developers can code, communicate, get AI assistance, and execute code.

---

## 9. REFERENCES

1. React Documentation. (2025). React – A JavaScript library for building user interfaces. https://react.dev/

2. Node.js Documentation. (2025). Node.js v18 Documentation. https://nodejs.org/docs/

3. Express.js. (2025). Express - Node.js web application framework. https://expressjs.com/

4. MongoDB Documentation. (2025). MongoDB Manual. https://docs.mongodb.com/manual/

5. Socket.io Documentation. (2025). Socket.IO - Bidirectional and low-latency communication. https://socket.io/docs/v4/

6. Google AI. (2025). Gemini API Documentation. https://ai.google.dev/docs

7. Hugging Face. (2025). Hugging Face Inference API. https://huggingface.co/docs/api-inference/

8. WebContainers. (2025). WebContainer API Documentation. https://webcontainers.io/

9. Monaco Editor. (2025). Monaco Editor Documentation. https://microsoft.github.io/monaco-editor/

10. JWT.io. (2025). Introduction to JSON Web Tokens. https://jwt.io/introduction

11. Redis Documentation. (2025). Redis Documentation. https://redis.io/documentation

12. Tailwind CSS. (2025). Tailwind CSS Documentation. https://tailwindcss.com/docs

13. Vite. (2025). Vite - Next Generation Frontend Tooling. https://vitejs.dev/

14. Fielding, R. T. (2000). Architectural Styles and the Design of Network-based Software Architectures. Doctoral dissertation, University of California, Irvine.

15. Jones, M., Bradley, J., & Sakimura, N. (2015). JSON Web Token (JWT). RFC 7519. Internet Engineering Task Force.

---

**--- END OF PROJECT REPORT ---**
