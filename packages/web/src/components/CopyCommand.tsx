import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  command: string;
}

export function CopyCommand({ command }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      // Fallback for browsers without the async clipboard API.
      const ta = document.createElement("textarea");
      ta.value = command;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="copy-command">
      <code title={command}>{command}</code>
      <button
        type="button"
        className={`copy-btn${copied ? " copied" : ""}`}
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
