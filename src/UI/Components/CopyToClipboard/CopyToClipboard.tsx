import * as React from "react";
import { LuCheck, LuCopy } from "react-icons/lu";
import { cfx } from "classifyx";

interface Command {
  codeToCopy: string;
}

interface CopyToClipboardProps {
  commands: Command[];
}

const CopyToClipboard = React.forwardRef<HTMLDivElement, CopyToClipboardProps>(
  ({ commands }, ref) => {
    const [currentCommandIndex, setCurrentCommandIndex] = React.useState(0);
    const [copied, setCopied] = React.useState(false);

    const handleCopyCode = () => {
      navigator.clipboard.writeText(commands[currentCommandIndex].codeToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    React.useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentCommandIndex(
          (prevIndex) => (prevIndex + 1) % commands.length,
        );
      }, 3000); // Change command every 3 seconds
      return () => clearInterval(intervalId);
    }, [currentCommandIndex, commands.length]);

    return (
      <div
        ref={ref}
        className={cfx(
          "mx-auto flex w-fit items-center space-x-3 rounded-full border bg-white px-3 py-1 dark:border-[#ffffff33] dark:bg-[#202020]",
        )}
      >
        <CommandText codeToCopy={commands[currentCommandIndex].codeToCopy} />
        <CopyButton onClick={handleCopyCode} copied={copied} />
      </div>
    );
  },
);

CopyToClipboard.displayName = "CopyToClipboard";

// CommandText Subcomponent
const CommandText = React.forwardRef<HTMLDivElement, { codeToCopy: string }>(
  ({ codeToCopy }, ref) => (
    <div
      ref={ref}
      className={cfx("text-center font-mono text-xl")}
    >{`${codeToCopy}`}</div>
  ),
);

CommandText.displayName = "CommandText";

// CopyButton Subcomponent
const CopyButton = React.forwardRef<
  HTMLButtonElement,
  { onClick: () => void; copied: boolean }
>(({ onClick, copied }, ref) => (
  <div className="relative flex flex-col items-center">
    <button
      ref={ref}
      onClick={onClick}
      aria-label="Copy to Clipboard"
      className="group"
    >
      {copied ? (
        <span className="text-green-500">
          <LuCheck />
        </span>
      ) : (
        <LuCopy />
      )}
    </button>
    <ClipboardTooltip copied={copied} />
  </div>
));

CopyButton.displayName = "CopyButton";

// ClipboardTooltip Subcomponent
const ClipboardTooltip = React.forwardRef<HTMLDivElement, { copied: boolean }>(
  ({ copied }, ref) => (
    <div ref={ref} className="absolute bottom-2 mb-6 hidden group-hover:flex">
      <span
        className={cfx(
          "w-[4rem] rounded-full p-2 text-center text-xs shadow-lg",
          copied ? "bg-gray-400 text-green-400" : "bg-gray-400 text-white",
        )}
      >
        {copied ? "Copied" : "Copy"}
      </span>
      <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-400"></div>
    </div>
  ),
);

ClipboardTooltip.displayName = "ClipboardTooltip";

export default CopyToClipboard;
export { ClipboardTooltip, CopyButton, CommandText };
