import { RotateCcw as UndoIcon } from "lucide-react";
import { Fragment, useEffect, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Message from "./message";

export default function Messages({ events, isProcessing, onUndo }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (events.length > 2) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events.length]);

  return (
    <section className="w-full">
      {events.map((ev, index) => {
        // Changed from ev.image to ev.audio
        if (ev.audio) {
          return (
            <Fragment key={"audio-" + index}>
              <Message sender="replicate" shouldFillWidth>
                <div className="w-full">
                  <audio 
                    controls 
                    className="w-full"
                    src={ev.audio}
                  >
                    Your browser does not support the audio element.
                  </audio>
                  
                  {/* Optional: Add download link */}
                  <div className="mt-2 text-sm text-gray-600">
                    <a 
                      href={ev.audio} 
                      download 
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      Download MP3
                    </a>
                  </div>
                </div>

                {onUndo && index > 0 && index === events.length - 1 && (
                  <div className="mt-2 text-right">
                    <button
                      className="lil-button"
                      onClick={() => {
                        onUndo(index);
                      }}
                    >
                      <UndoIcon className="icon" /> Undo and try a different
                      prompt
                    </button>
                  </div>
                )}
              </Message>

              {(isProcessing || index < events.length - 1) && (
                <Message sender="replicate" isSameSender>
                  {index === 0
                    ? "What music should we generate?"
                    : "What music should we generate now?"}
                </Message>
              )}
            </Fragment>
          );
        }

        if (ev.prompt) {
          return (
            <Message key={"prompt-" + index} sender="user">
              {ev.prompt}
            </Message>
          );
        }
      })}

      {isProcessing && (
        <Message sender="replicate">
          <PulseLoader color="#999" size={7} />
        </Message>
      )}

      <div ref={messagesEndRef} />
    </section>
  );
}
