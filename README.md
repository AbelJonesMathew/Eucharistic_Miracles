# Eucharistic Miracles - Historical & Scientific Archive

A premium, interactive web archive presenting documented Eucharistic Miracles throughout history alongside their corresponding forensic laboratory findings. Inspired by the cataloging work of **Saint Carlo Acutis**.

## 🌟 Key Features

*   **Cinematic Sanctuary Entrance**: An interactive scroll-based zoom and fade introduction focusing on the Eucharistic Host before seamlessly morphing into the face of Jesus Christ.
*   **Chronological Timeline Cards**: A simplified, single-column vertical timeline layout presenting historical miracles in a highly legible card format to reduce cognitive load.
*   **Forensic Science Analysis**: Inline accordions highlighting detailed histopathological, hematological, and immunological lab results for each miracle.
*   **User Inquiries**: An interactive inquiry and reflection intake form.
*   **GitHub Pages Ready**: Fully configured for static hosting with relative base paths (`base: './'`) and deployment automation.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite, Vanilla CSS, Lucide React icons)
*   **Backend** *(Optional Local API)*: Node.js, Express

---

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) (installed automatically with Node.js)

### Local Development

1.  **Clone the Repository**:
    ```bash
    git clone <your-repository-url>
    cd Eucharistic-Miracle
    ```

2.  **Run the Server (Optional API)**:
    ```bash
    cd server
    npm install
    npm run dev
    ```
    The server will run on `http://localhost:5000/`.

3.  **Run the Client**:
    ```bash
    cd ../client
    npm install
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173/`.

---

## 📦 Deploying to GitHub Pages

The application is pre-configured to build and deploy the frontend directly to GitHub Pages:

1.  Navigate to the `client/` folder:
    ```bash
    cd client
    ```

2.  Run the deploy script:
    ```bash
    npm run deploy
    ```
    This command will automatically:
    *   Build the application for production (`dist/` folder using relative paths).
    *   Create or update a local `gh-pages` branch.
    *   Push the built files directly to the `gh-pages` branch on your GitHub repository.

3.  Enable GitHub Pages:
    *   Go to your GitHub repository webpage.
    *   Navigate to **Settings** > **Pages**.
    *   Under **Build and deployment**, select **Deploy from a branch** and set the branch to `gh-pages` (root folder).

---

## 📜 Attribution

*   **Inspiration**: Inspired by the original digital archive created by **Saint Carlo Acutis** to catalog Eucharistic Miracles worldwide.
*   **Aesthetics**: Sanctuary-themed styling featuring curated dark-modes, gold accents, and glassmorphic layouts.
