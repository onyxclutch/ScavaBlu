import { useState } from "react";

function AIAssistant() {
  const [aiInput, setAiInput] = useState("");

  const [aiMessages, setAiMessages] = useState([
    {
      type: "ai",
      text: "System ready. Ask me about SCAVABLU sensor data.",
    },
  ]);

  const getAIResponse = (question) => {
    const q = question.toLowerCase().trim();

    /* GREETINGS */

    if (
      q === "hi" ||
      q === "hello" ||
      q.includes("hey")
    ) {
      return "Hello! SCAVABLU Environmental AI is online. What would you like to know?";
    }

    /* POLLUTION */

    if (
      q.includes("pollution") ||
      q.includes("polluted") ||
      q.includes("pollution level") ||
      q.includes("pollution score")
    ) {
      return "The current pollution score is 27/100. SCAVABLU currently classifies this as a low pollution level.";
    }

    /* PH */

    if (
      q.includes("ph") ||
      q.includes("acidity") ||
      q.includes("alkaline")
    ) {
      return "The current water pH is 7.4. This reading is currently considered normal for the monitored sample.";
    }

    /* TURBIDITY */

    if (
      q.includes("turbidity") ||
      q.includes("water clarity") ||
      q.includes("clear water")
    ) {
      return "The current turbidity reading is 18 NTU. SCAVABLU currently reports this reading as normal.";
    }

    /* TEMPERATURE */

    if (
      q.includes("temperature") ||
      q.includes("water temperature") ||
      q.includes("how warm")
    ) {
      return "The current water temperature is 28.6°C and the reading is stable.";
    }

    /* LOCATION */

    if (
      q.includes("gps") ||
      q.includes("location") ||
      q.includes("where") ||
      q.includes("coordinates") ||
      q.includes("monitoring unit")
    ) {
      return "SCAVABLU-01 is monitoring the Chennai Ocean Zone at approximately 13.0827° N, 80.2707° E.";
    }

    /* WATER QUALITY */

    if (
      q.includes("water quality") ||
      q.includes("water good") ||
      q.includes("water safe") ||
      q.includes("quality")
    ) {
      return "Current water quality is GOOD. The monitored readings are pH 7.4, turbidity 18 NTU and temperature 28.6°C.";
    }

    /* SENSORS */

    if (
      q.includes("sensor") ||
      q.includes("sensors") ||
      q.includes("readings")
    ) {
      return "SCAVABLU is currently monitoring water quality, pH, turbidity, temperature and GPS location data.";
    }

    /* SYSTEM STATUS */

    if (
      q.includes("status") ||
      q.includes("system") ||
      q.includes("online")
    ) {
      return "SCAVABLU-01 is online and actively monitoring the Chennai Ocean Zone.";
    }

    /* SUMMARY */

    if (
      q.includes("summary") ||
      q.includes("overall") ||
      q.includes("everything")
    ) {
      return "SCAVABLU-01 is currently online in the Chennai Ocean Zone. Pollution score: 27/100. Water quality: GOOD. pH: 7.4. Turbidity: 18 NTU. Temperature: 28.6°C.";
    }

    /* HELP */

    if (
      q.includes("help") ||
      q.includes("what can you do") ||
      q.includes("what do you know")
    ) {
      return "I can analyse SCAVABLU pollution levels, water quality, pH, turbidity, temperature, GPS location, sensor readings and system status.";
    }

    /* UNKNOWN */

    return "I couldn't find that information in the current SCAVABLU data. Try asking about pollution, water quality, pH, turbidity, temperature, GPS, sensors or system status.";
  };

  const sendMessage = () => {
    const userMessage = aiInput.trim();

    if (!userMessage) {
      return;
    }

    const aiResponse = getAIResponse(userMessage);

    setAiMessages((messages) => [
      ...messages,
      {
        type: "user",
        text: userMessage,
      },
      {
        type: "ai",
        text: aiResponse,
      },
    ]);

    setAiInput("");
  };

  return (
    <main className="dashboard">

      <section className="page-title">

        <p className="eyebrow">
          SCAVABLU INTELLIGENCE
        </p>

        <h1>
          AI Assistant
        </h1>

        <p>
          Ask SCAVABLU about ocean conditions, pollution levels and
          sensor readings.
        </p>

      </section>

      <section className="activity-card ai-card">

        <div className="ai-icon">
          AI
        </div>

        <h2>
          SCAVABLU Environmental AI
        </h2>

        <p>
          AI-powered analysis of environmental monitoring data.
        </p>

        <div className="ai-chat">

          <div className="ai-chat-messages">

            {aiMessages.map((message, index) => (
              <div
                key={index}
                className={`ai-chat-message ${message.type}`}
              >

                <span>
                  {message.type === "ai" ? "AI" : "YOU"}
                </span>

                <p>
                  {message.text}
                </p>

              </div>
            ))}

          </div>

          <div className="ai-input-area">

            <input
              type="text"
              placeholder="Ask about the ocean data..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              SEND →
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AIAssistant;