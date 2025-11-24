# openKnight

**openKnight** is a real-time, full-stack multiplayer chess application designed for seamless player-vs-player gameplay and bot challenges. Built with a modern tech stack, it features live bidirectional communication, smooth UI animations, and robust game state management.

🚀 **Live Demo:** [https://openknight.onrender.com/](https://openknight.onrender.com/)

## Features

*   **Real-time Multiplayer**: Play against other users instantly using WebSockets for live move updates.
*   **Bot Opponents**: Challenge AI bots with varying difficulty levels.
*   **Time Controls**: Support for various chess time controls (e.g., Bullet, Blitz, Rapid).
*   **Interactive UI**: Smooth piece movements and board animations powered by Framer Motion.
*   **Containerization**: Docker support for consistent deployment environments.
*   **CI/CD**: Automated testing and deployment pipelines.
*   **User Management**: Secure user authentication and data storage.

## Tech Stack

### Frontend
*   **Framework**: [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [TailwindCSS](https://tailwindcss.com/)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **State/Logic**: `chess.js` (Game logic)

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
*   **Real-time**: [ws](https://github.com/websockets/ws) (WebSockets)
*   **Authentication**: JSON Web Tokens (JWT) & bcrypt

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Ganesh-Bhoyar/openKnight.git
    cd openKnight
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in the `backend` directory based on `.env.example`.
    *   Start the backend server:
        ```bash
        npm run dev
        ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```
    *   Start the frontend development server:
        ```bash
        npm run dev
        ```

4.  **Access the App**
    *   Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

*   `frontend/`: React application source code.
*   `backend/`: Node.js/Express API and WebSocket server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
