// app.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const resumeData = {
  name: "SIBICHAKARAVARTHI S",
  title: "Software Developer and Learner",
  registerNumber: "2023503027",
  contact: {
    phone: "+91 93616 53673",
    email: "sibichakaravarthi588@gmail.com",
    location: "Chromepet, Chennai, 600 004",
  },
  about: "Dedicated software developer with a passion for learning...",
  expertise: ["Python", "DBMS", "Data Structures", "C/C++", "Java", "Problem Solving"],
  education: [
    {
      institution: "Madras Institute of Technology, Chromepet",
      degree: "B.E Computer Science and Engineering",
      period: "2023-Present",
      registerNumber: "2023503027",
    },
    { institution: "MGM Matric Hr Sec School, Pochampalli", period: "2015-2023" },
  ],
  achievements: [
    "Ranked 1st at school with 98%",
    "SPL & Parade Captain",
    "Diploma in computer application at CSC",
    "Member of PDA MIT",
  ],
  languages: ["English", "Tamil"],
  hobbies: [
    "Leadership quality",
    "Listening to music",
    "Watching tech news in free time",
    "Watching and playing cricket and kabaddi",
  ],
  projects: ["Replicated an online shopping management system in C++"],
};

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const generateResponse = (question) => {
    question = question.toLowerCase();
    if (question.includes('register')) return `Register Number: ${resumeData.registerNumber}`;
    if (question.includes('name')) return `Name: ${resumeData.name}`;
    if (question.includes('contact')) return `Contact:\nEmail: ${resumeData.contact.email}\nPhone: ${resumeData.contact.phone}`;
    if (question.includes('education')) {
      return resumeData.education.map(
        (edu) => `${edu.institution} (${edu.period})${edu.degree ? `\nDegree: ${edu.degree}` : ''}`
      ).join('\n');
    }
    return "Ask about education, skills, contact, etc.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { type: 'user', content: input },
      { type: 'bot', content: generateResponse(input) },
    ];
    setMessages(newMessages);
    setInput('');
  };

  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="header-content">
          <h1>{resumeData.name}</h1>
          <p>{resumeData.title}</p>
          <p>Register Number: {resumeData.registerNumber}</p>
        </div>
      </header>

      <main className="main-content">
        <section className="section">
          <h2>About Me</h2>
          <div className="card">
            <p>{resumeData.about}</p>
          </div>
        </section>

        <section className="section">
          <h2>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="card">
              <h3>{edu.institution}</h3>
              {edu.degree && <p>Degree: {edu.degree}</p>}
              <p>Period: {edu.period}</p>
            </div>
          ))}
        </section>

        <section className="section">
          <h2>Skills</h2>
          <div className="grid">
            {resumeData.expertise.map((skill, index) => (
              <div key={index} className="skill-card">
                <i className="fas fa-code"></i>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="chatbot">
        {isChatOpen ? (
          <div className="chat-window">
            <div className="chat-header">
              <span>Chatbot</span>
              <button onClick={() => setIsChatOpen(false)}>Close</button>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.type === 'user' ? 'user-message' : 'bot-message'}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <form className="input-form" onSubmit={handleSendMessage}>
              <input
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </div>
        ) : (
          <button className="chat-button" onClick={() => setIsChatOpen(true)}>
            <i className="fas fa-comments"></i>
          </button>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
