import React from "react";

const teamMembers = [
  {
    name: "Aditya Kushwaha",
    branch: "IT",
    img: "https://img.freepik.com/free-vector/smiling-boy-hoodie_1308-178004.jpg?w=1380",
  },
  {
    name: "Kaushalendra Singh",
    branch: "Mechanical",
    img: "https://img.freepik.com/free-vector/young-man-traditional-attire_1308-173539.jpg?w=1380",
  },
  {
    name: "Harsh Gupta",
    branch: "Plastic",
    img: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?w=1380",
  },
];

const projectOverview = [
  "Secure account creation and authentication",
  "Real-time money transfers between users",
  "Balance checking and transaction history",
  "Money requesting feature for shared expenses",
  "Loan management system with repayment tracking",
  "Strong authentication and data security",
  "Real-time fraud detection and monitoring",
];

const workflowSteps = [
  "User registration and authentication",
  "Viewing balance and transaction history",
  "Secure money transfers",
  "Requesting money from other users",
  "Managing loans and repayment tracking",
  "Real-time alerts and fraud prevention",
];

const techStack = [
  "Node.js (Backend)",
  "React.js (Frontend)",
  "FastAPI",
  "MySQL (Database)",
  "JWT Authentication",
  "DeepSeek API",
  "Docker & Kubernetes",
  "Redis (for caching)",
  "RabbitMQ (for async tasks)",
];

const GlassContainer = ({ title, items }) => (
  <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-md w-full max-w-3xl">
    <h2 className="text-xl font-semibold text-blue-700 mb-3">{title}</h2>
    <ul className="list-disc list-inside text-lg text-blue-900">
      {items.map((item, index) => (
        <li key={index} className="py-1">{item}</li>
      ))}
    </ul>
  </div>
);

const TeamMember = ({ member }) => (
  <div className="bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-md text-center w-60">
    <img
      src={member.img}
      alt={member.name}
      className="w-28 h-28 rounded-full border-4 border-blue-600 mx-auto"
    />
    <h3 className="text-lg font-bold text-blue-800 mt-2">{member.name}</h3>
    <p className="text-blue-900">{member.branch}</p>
  </div>
);

const About = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,finance')" }}>
      <header className="text-white text-4xl font-bold uppercase mt-10">
        About Us
      </header>

      {/* Team Section */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-md w-full max-w-3xl mt-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">Meet Our Team</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>

      {/* Project Overview */}
      <GlassContainer title="Project Overview" items={projectOverview} />

      {/* Workflow */}
      <GlassContainer title="Workflow" items={workflowSteps} />

      {/* Tech Stack */}
      <GlassContainer title="Tech Stack" items={techStack} />

      <footer className="text-white text-sm my-6">
        © 2025 Hackathon Project. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
