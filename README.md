# 🌟 Mental Well-being Platform

## 📝 Project Overview
The Mental Well-being Platform is a web application designed to help users track and improve their mental health. It allows users to write daily journals, which are analyzed using OpenAI's AI model to assess their mood and provide personalized feedback. The platform aims to create a safe and supportive space for users to express their thoughts and receive constructive insights to enhance their mental well-being.

---

## 🌟 **Content Section**

The Content Section of the Mental Well-being Platform is designed to enhance user experience and provide meaningful insights into their mental health. Click the links below to explore each feature in detail:  

---

### 📝 [**Journal Writing**](#-journal-writing)
- A simple and distraction-free editor for writing daily journal entries.  
- Auto-save feature to ensure no entry is lost.  
- Option to add tags or categories to journal entries for easy filtering and retrieval.

---

### 🧠 [**Mood Analysis**](#-mood-analysis)
- Sentiment analysis powered by OpenAI to evaluate user moods.  
- Detects emotions such as:  
  - 😊 Positive  
  - 😐 Neutral  
  - 😔 Negative  
- Sentiment results are stored alongside journal entries for historical tracking.

---

### 📊 [**Mood Insights Dashboard**](#-mood-insights-dashboard)
- A visual representation of mood trends over time using **Chart.js**.  
- Features include:  
  - Line graphs for tracking mood patterns.  
  - Filters to analyze data by week, month, or year.  
  - Insights into the most common mood categories.

---

### 🎯 [**Personalized Activity Suggestions**](#-personalized-activity-suggestions)
- Provides tailored activities based on the user's mood trend, such as:  
  - **Positive Mood**: Encourages continuation with uplifting activities.  
  - **Neutral Mood**: Suggests mindfulness practices or creative hobbies.  
  - **Negative Mood**: Recommends relaxation exercises or seeking support.

---

### 📂 [**Data Export Options**](#-data-export-options)
- **PDF Export**: Users can download a professional PDF report of their journal entries and mood trends.  
- **CSV Export**: For advanced users, a structured CSV file containing journal data and sentiment analysis results.


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

## 🛠️ **1. Project Setup Checklist**  
- ✅ **Project Initialization**:  
  - Set up a Next.js project.  
  - Configure Tailwind CSS for styling.  
- ✅ **Dependencies Installation**:  
  - Installed NextAuth, MongoDB, Axios, Chart.js, jsPDF, and PapaParse.  
- ✅ **Environment Variables**:  
  - Created `.env.local` for securely storing API keys and MongoDB credentials.  

---

## 🔒 **2. User Authentication**  
- ✅ **Authentication Setup**:  
  - Integrated NextAuth.js for user authentication.  
  - Configured sign-in with email/password and Google OAuth.  
  - Set up MongoDB to store user accounts and session data.  

---

## 📝 **3. Journal Entry System**  
- ⬜ Design and implement a user-friendly journal entry text editor.  
- ⬜ Create API routes to save and retrieve journal entries from MongoDB.  
- ⬜ Display journal entries on a user dashboard with timestamps.  

---

## 🧠 **4. Sentiment Analysis**  
- ⬜ Integrate the OpenAI API for sentiment analysis of journal entries.  
- ⬜ Send journal text to the API and retrieve mood sentiment (e.g., 😊 Positive, 😐 Neutral, 😔 Negative).  
- ⬜ Store sentiment results alongside journal entries in MongoDB.  

---

## 📊 **5. Mood Insights Dashboard**  
- ⬜ Fetch journal sentiment data from MongoDB.  
- ⬜ Use Chart.js to create a graph visualizing mood trends.  
- ⬜ Add filters like "Past Week," "Month," or "Year" for better analysis.  

---

## 🎯 **6. Activity Suggestions**  
- ⬜ Predefine activity suggestions based on sentiment categories.  
- ⬜ Dynamically display suggestions based on recent user mood trends.  

---

## 📂 **7. Export Journal Data**  
- ⬜ Provide options to export journal entries and mood data as PDF or CSV.  
- ⬜ Use jsPDF and PapaParse libraries for generating downloadable files.  

---

## 🧑‍💻 **8. User Profile and Settings**  
- ⬜ Create a profile page where users can update their details.    

---

### 🎉 Progress:  
- **Completed**: Steps 1 and 2 ✅  
- **Next Step**: Start working on the **Journal Entry System**.  

Stay tuned for updates as the project progresses! ✨  



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

