// console.jsx — console easter egg (digitar sudo / help / etc.)

const { useState, useEffect, useRef } = React;

const COMMANDS = {
  help: () => [
    "available commands:",
    "  help        — show this list",
    "  whoami      — about juan",
    "  skills      — list stack",
    "  projects    — list projects",
    "  contact     — show contact",
    "  sudo        — escalate privileges",
    "  matrix      — enter the matrix",
    "  clear       — clear console",
    "  exit        — close console (or press esc)",
  ],
  whoami: () => [
    "juan oliveira marques",
    "  role:    backend developer",
    "  focus:   sistemas, automação, IA",
    "  status:  estudante de tecnologia · UNIP",
    "  uptime:  3+ anos compilando",
  ],
  skills: () => [
    "stack:",
    "  backend     python · django · fastapi · c# · .net · java",
    "  frontend    react · javascript · html · css · bootstrap",
    "  tooling     git · github · vs code",
    "  basics      apis rest · sql · lógica · c",
  ],
  projects: () => [
    "★ gestão clínica odontológica (em destaque)",
    "  gestor de ativos",
    "  pims — unip",
    "  aprendendo web · ui/ux",
    "→ scroll até #projects para detalhes",
  ],
  contact: () => [
    "email:    juanoliveira549@gmail.com",
    "github:   github.com/JuanMarques1",
    "linkedin: em breve",
  ],
  sudo: () => [
    "[sudo] password for juan: *********",
    "permission granted ✓",
    "  → unlocked: senso de humor",
    "  → unlocked: café ilimitado",
    "  → unlocked: dark mode supremo",
    "tip: try 'matrix'",
  ],
  matrix: () => {
    const lines = [];
    const charset = "01アイウエオカキクケコ$#&@";
    for (let i = 0; i < 6; i++) {
      let s = "";
      for (let j = 0; j < 60; j++) s += charset[Math.floor(Math.random() * charset.length)];
      lines.push(s);
    }
    lines.push("wake up, neo...");
    return lines;
  },
  clear: () => "__CLEAR__",
  exit: () => "__EXIT__",
};

function Console({ open, onClose }) {
  const [history, setHistory] = useState([
    "juan@portfolio:~$ welcome 👋",
    "type 'help' to see what's possible",
    "",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const echo = `juan@portfolio:~$ ${input}`;
    if (!cmd) {
      setHistory((h) => [...h, echo]);
      setInput("");
      return;
    }
    const fn = COMMANDS[cmd];
    let output;
    if (!fn) output = [`command not found: ${cmd}. try 'help'.`];
    else {
      const r = fn();
      if (r === "__CLEAR__") { setHistory([]); setInput(""); return; }
      if (r === "__EXIT__") { onClose(); setInput(""); return; }
      output = r;
    }
    setHistory((h) => [...h, echo, ...output, ""]);
    setInput("");
  };

  if (!open) return null;
  return (
    <div className="console-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="console-window">
        <div className="console-bar">
          <span className="terminal-dot r" />
          <span className="terminal-dot y" />
          <span className="terminal-dot g" />
          <span className="console-bar-title">juan@portfolio:~ — zsh — type 'help'</span>
        </div>
        <div className="console-body" ref={bodyRef}>
          {history.map((line, i) => (
            <div key={i} className="console-line">{line || " "}</div>
          ))}
          <form onSubmit={submit} className="console-input-row">
            <span className="console-prompt">$</span>
            <input
              ref={inputRef}
              className="console-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

window.Console = Console;
