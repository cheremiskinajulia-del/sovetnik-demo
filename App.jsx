import { useState } from "react";

export default function App() {
  const [role, setRole] = useState("parent");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Привет! Чем могу помочь?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const reply =
        role === "parent"
          ? "Попробуй сказать: 'Я рядом, когда ты захочешь поговорить.'"
          : role === "teacher"
          ? "Рекомендую провести классный час о взаимопонимании. Могу помочь составить план."
          : "Игровой сбор — отличный формат. Хочешь пример?";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 800);
  };

  return (
    <div className="container">
      <h1>Демо: Помощник в воспитании</h1>
      <div className="roles">
        <button onClick={() => setRole("parent")}>Родитель</button>
        <button onClick={() => setRole("teacher")}>Педагог</button>
        <button onClick={() => setRole("mentor")}>Вожатый</button>
      </div>
      <div className="chat">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите вопрос..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
}