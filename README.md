# 🌟 Mental Well-being Platform

## 📝 Project Overview
The Mental Well-being Platform is a web application designed to help users track and improve their mental health. It allows users to write daily journals, which are analyzed using OpenAI's AI model to assess their mood and provide personalized feedback. The platform aims to create a safe and supportive space for users to express their thoughts and receive constructive insights to enhance their mental well-being.

---

## 🚀 Features
- **Journal Writing**: A secure and user-friendly interface for users to write daily journals.
- **Mood Analysis**: Leverages OpenAI's API to analyze journal entries and assess the user's mood.
- **Personalized Feedback**: Provides tailored feedback and suggestions based on the mood analysis.
- **Authentication**: Secure login and registration implemented using NextAuth with options for Google and credential-based sign-in.
- **Mood History**: Visualizes trends in the user's mood over time to track mental health progress.
- **Privacy-First**: Ensures user data is secure and private.

---

## 🛠️ Technologies Used
- **Frontend**: Next.js with Tailwind CSS for a responsive and accessible UI.
- **Backend**: Next.js API routes for server-side functionality.
- **Database**: MongoDB (with Mongoose) for storing user journals and mood data.
- **AI Integration**: OpenAI API for natural language processing and mood analysis.
- **Authentication**: NextAuth.js for secure and flexible user authentication.
- **Visualization**: Chart.js for displaying mood history trends.

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or above)
- MongoDB (local or cloud instance)
- OpenAI API Key

### Steps
1. Clone the repository:
 ```bash
 git clone https://github.com/your-username/mental-wellbeing-platform.git
 cd mental-wellbeing-platform
 ```
2. Install Dependencies:
 ```bash
 npm install
 ```
3. Configure environment variables: Create a .env.local file in the root directory and add the following:
 ```env
 NEXTAUTH_SECRET=<your-nextauth-secret>
 NEXTAUTH_URL=http://localhost:3000
 MONGODB_URI=<your-mongodb-connection-string>
 OPENAI_API_KEY=<your-openai-api-key>
 ```
4. Run the development server:
 ```bash
 npm run dev
 ```
5. Open your browser and navigate to:
 ```bash
 http://localhost:3000
 ```

## 🛡️ Security and Privacy
 - All user data is securely stored in MongoDB with proper authentication and
    authorization.
 - Sensitive information, such as passwords, is hashed using bcrypt.
 - Journals are analyzed anonymously through OpenAI.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.