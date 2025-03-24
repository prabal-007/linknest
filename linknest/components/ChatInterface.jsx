// components/ChatInterface.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm StarkAI. How can I help you with ViewMee.live today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const [typing, setTyping] = useState(false); // New state for typing indicator

  const faqResponses = {
    "what is viewmee.live":
      "ViewMee.live is a platform that empowers you to create a personalized landing page with all your important links in one place.",
    "what is viewmee":
      "ViewMee.live is a platform that empowers you to create a personalized landing page with all your important links in one place.",
    "viewmee":
      "ViewMee.live is a platform that empowers you to create a personalized landing page with all your important links in one place.",
    "how to create a link":
      "To create a link, go to the 'Create ViewMee.live' section in your dashboard.",
    "what is stark ai":
      "Stark AI is your AI assistant on ViewMee.live, here to help you manage your online presence and content.",
    "how to get premium":
      "You can unlock premium features by clicking the 'Get Premium' button in the sidebar.",
    "default":
      "I'm not sure about that yet, but I'm learning every day! Try asking about ViewMee features, AI tools, or link management.",
  };

  // Dummy function for content generation (replace with actual LLM integration)
  const generateContent = (userInput, userSocialData) => {
    // This is where we'll integrate with the LLM (RAG)
    // For now, we'll just return some dummy content
    const lowerCaseInput = userInput.toLowerCase();
    if (lowerCaseInput.includes("post idea")) {
      return "Here's a post idea: Share a behind-the-scenes look at your work process! You could also talk about a recent project or a challenge you overcame.";
    }
    if (lowerCaseInput.includes("caption")) {
      return "Here's a caption: 'Just finished this project! What do you think? Let me know in the comments!'";
    }
    if (lowerCaseInput.includes("blog draft")) {
      return "Here's a blog draft: 'The Importance of Building an Online Presence'. You can start by discussing why it's important and how ViewMee.live can help.";
    }
    if (lowerCaseInput.includes("bio")) {
      return "Here's a bio: 'I'm a passionate creator, helping others build their online presence. Check out my ViewMee.live page for more!'";
    }
    return "I'm not sure what kind of content you want to generate. Try asking for a 'post idea', 'caption', 'blog draft' or 'bio'.";
  };

  const generateAIResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    // Check for exact matches in faqResponses
    if (faqResponses[lowerCaseInput]) {
      return faqResponses[lowerCaseInput];
    }

    // Basic Greetings & Small Talk
    if (
      lowerCaseInput.includes("hello") ||
      lowerCaseInput.includes("hi") ||
      lowerCaseInput.includes("hey")
    ) {
      return "Hello there! How can I assist you with ViewMee.live today?";
    }
    if (lowerCaseInput.includes("how are you")) {
      return "I'm doing great! Thanks for asking. How can I help you today?";
    }
    if (lowerCaseInput.includes("thank")) {
      return "You're very welcome! Let me know if you need anything else.";
    }
    if (lowerCaseInput.includes("ok")) {
      return "Great! Let me know if you need anything else.";
    }
    if (lowerCaseInput.includes("bye") || lowerCaseInput.includes("goodbye")) {
      return "Goodbye! Have a great day, and visit ViewMee.live anytime!";
    }

    // General Help & FAQs
    if (lowerCaseInput.includes("help") || lowerCaseInput.includes("support")) {
      return "I'm here to help! What do you need assistance with? You can ask about features, pricing, or how to get started.";
    }
    if (lowerCaseInput.includes("what can you do")) {
      return "I can answer questions about ViewMee.live, help you set up your page, and suggest content ideas!";
    }
    if (lowerCaseInput.includes("how does it work")) {
      return "ViewMee.live lets you create a personalized page with all your important links in one place. You can then share it easily!";
    }

    // Account & Dashboard Navigation
    if (lowerCaseInput.includes("dashboard")) {
      return "You can access your dashboard by clicking on the 'Dashboard' link in the sidebar. From there, you can manage your ViewMee.live page.";
    }
    if (lowerCaseInput.includes("review")) {
      return "You can review your ViewMee.live page by clicking on the 'Review' link in the sidebar. Make sure everything looks perfect before publishing!";
    }
    if (lowerCaseInput.includes("edit") && lowerCaseInput.includes("profile")) {
      return "You can edit your profile in the 'Review' section. Customize your background, links, and more!";
    }

    // Premium & Pricing Information
    if (lowerCaseInput.includes("premium")) {
      return "ViewMee Premium unlocks advanced features and more customization options! Click the 'Get Premium' button in the sidebar to upgrade.";
    }
    if (
      lowerCaseInput.includes("pricing") ||
      lowerCaseInput.includes("cost") ||
      lowerCaseInput.includes("price")
    ) {
      return "ViewMee offers free and premium plans. Check our Pricing page in the dashboard for details!";
    }

    // Features & Upcoming Tools
    if (lowerCaseInput.includes("features")) {
      return "ViewMee.live offers a customizable landing page, multiple links, AI-powered branding tools, and soon, website and portfolio builders!";
    }
    if (lowerCaseInput.includes("benefits")) {
      return "With ViewMee.live, you get all your links in one place, a professional online presence, and AI-generated branding content!";
    }
    if (lowerCaseInput.includes("website builder")) {
      return "Our Website Builder is coming soon! It will help you create a full website directly on ViewMee.live. Stay tuned!";
    }
    if (lowerCaseInput.includes("resume builder")) {
      return "The Resume Builder is under development. It will generate a professional resume based on your input using AI!";
    }
    if (lowerCaseInput.includes("portfolio builder")) {
      return "The Portfolio Builder is coming soon! You'll get beautiful templates to showcase your work.";
    }
    if (lowerCaseInput.includes("ai") && lowerCaseInput.includes("features")) {
      return "Our AI features include smart content suggestions, AI-powered bios, resume optimization, and branding tools!";
    }
    if (lowerCaseInput.includes("analytics")) {
      return "Our analytics tool helps track profile visits, click rates, and engagement insights to grow your audience.";
    }

    // Content Creation & Branding Assistance
    if (lowerCaseInput.includes("improve") && lowerCaseInput.includes("bio")) {
      return "To improve your bio: 1. Be concise. 2. Highlight key skills. 3. Use engaging language. Need suggestions?";
    }
    if (lowerCaseInput.includes("suggest") && lowerCaseInput.includes("bio")) {
      return generateContent(userInput);
    }
    if (lowerCaseInput.includes("headline") || lowerCaseInput.includes("caption")) {
      return generateContent(userInput);
    }
    if (lowerCaseInput.includes("portfolio") && lowerCaseInput.includes("summary")) {
      return "A strong portfolio summary highlights your best work and skills. What are your key areas of expertise?";
    }
    if (lowerCaseInput.includes("seo") && lowerCaseInput.includes("optimization")) {
      return "SEO tip: Use relevant keywords in your bio and link descriptions to rank higher in search results!";
    }

    // Link & Profile Management
    if (lowerCaseInput.includes("create") && lowerCaseInput.includes("link")) {
      return "To create a link, go to 'Create ViewMee.live' in your dashboard. It's quick and easy!";
    }
    if (lowerCaseInput.includes("delete") && lowerCaseInput.includes("link")) {
      return "You can delete a link from your dashboard. Go to 'Manage Links' and remove the ones you don't need.";
    }
    if (lowerCaseInput.includes("custom") && lowerCaseInput.includes("url")) {
      return "With ViewMee Premium, you can customize your URL! Upgrade to Premium to unlock this feature.";
    }

    // Social Media & Integrations
    if (lowerCaseInput.includes("social") && lowerCaseInput.includes("links")) {
      return "You can add social media links in your dashboard under 'Manage Links'. Connect your audience effortlessly!";
    }
    if (lowerCaseInput.includes("linkedin")) {
      return "Yes! You can add your LinkedIn profile link to ViewMee. Just paste it in your 'Manage Links' section.";
    }
    if (
      lowerCaseInput.includes("instagram") ||
      lowerCaseInput.includes("twitter") ||
      lowerCaseInput.includes("tiktok")
    ) {
      return "You can add your social media links easily from the 'Manage Links' section in your dashboard!";
    }
    if (lowerCaseInput.includes("embed") && lowerCaseInput.includes("video")) {
      return "You can embed YouTube or Vimeo videos in your ViewMee page. Just add the video link in 'Manage Links'.";
    }

    // Content Generation
    if (
      lowerCaseInput.includes("suggest a post idea") ||
      lowerCaseInput.includes("write a caption") ||
      lowerCaseInput.includes("write a blog draft") ||
      lowerCaseInput.includes("write a bio")
    ) {
      return generateContent(userInput);
    }

    // Miscellaneous
    if (lowerCaseInput.includes("mobile app")) {
      return "A ViewMee mobile app is in our future plans! For now, the website is fully mobile-friendly.";
    }
    if (lowerCaseInput.includes("dark mode")) {
      return "Yes! You can toggle dark mode in your dashboard settings.";
    }
    if (lowerCaseInput.includes("roadmap")) {
      return "Exciting features are coming! Check our official announcements for the latest updates.";
    }
    if (lowerCaseInput.includes("what is your name")) {
      return "I'm Stark AI, your assistant on ViewMee.live!";
    }
    if (lowerCaseInput.includes("how old are you")) {
      return "I'm a new AI, so I don't have an age, but I'm learning every day!";
    }
    if (lowerCaseInput.includes("who created you")) {
      return "I was created by the ViewMee.live team!";
    }

    return faqResponses["default"];
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    setTyping(true);
    setTimeout(() => {
      const botResponse = generateAIResponse(input);
      typeWriterEffect(botResponse);
    }, 500);
  };

  const typeWriterEffect = (text) => {
    let index = 0;
    const intervalId = setInterval(() => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage.sender === "bot") {
          // Update the last bot message
          return [
            ...prevMessages.slice(0, -1),
            { ...lastMessage, text: text.substring(0, index + 1) },
          ];
        } else {
          // Add a new bot message
          return [
            ...prevMessages,
            { text: text.substring(0, index + 1), sender: "bot" },
          ];
        }
      });
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
        setTyping(false); // Stop typing indicator
      }
    }, 30); // Adjust the typing speed here (lower number = faster)
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full border">
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-2"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-md ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.text}
              {/* {typing && message.sender === "bot" && <span className="animate-pulse">|</span>} */}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="p-2 rounded-lg max-w-md bg-gray-200 text-gray-800">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border rounded-l-md p-2 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
