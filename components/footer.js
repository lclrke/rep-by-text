import {
  Code as CodeIcon,
  Download as DownloadIcon,
  Info as InfoIcon,
  XCircle as StartOverIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer({ events, startOver }) {
  return (
    <footer className="w-full my-8">
      <div className="text-center">
        <Link href="/about" className="lil-button">
          <InfoIcon className="icon" />What is this?
        </Link>

        {events.length > 1 && (
          <button className="lil-button" onClick={startOver}>
            <StartOverIcon className="icon" />
            Start over
          </button>
        )}

        {/* Show download button if we have generated audio */}
        {events.length > 1 && events.some(ev => ev.audio) && (
          <Link
            href={events.findLast((ev) => ev.audio).audio}
            className="lil-button"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <DownloadIcon className="icon" />Download music
          </Link>
        )}

        <Link
          href="https://github.com/lclrke/rep-by-text"
          className="lil-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CodeIcon className="icon" />Fork repo
        </Link>
      </div>

      <div className="text-center lil-text mt-8">
        <div className="inline-block py-2 px-4 border border-yellow-200 rounded-lg bg-[#fef6aa]">
          🎵 Want to learn how to build AI music generators? Check out the{" "}
          <Link
            href="https://github.com/lclrke/rep-by-text#readme"
            target="_blank"
          >
            README
          </Link>.
        </div>
      </div>

      <div className="text-center lil-text mt-8">
        Powered by{" "}
        <Link href="https://replicate.com/lclrke" target="_blank">
          Your Fine-tuned Model
        </Link>
        ,{" "}
        <Link
          href="https://replicate.com?utm_source=project&utm_campaign=musicbytext"
          target="_blank"
        >
          Replicate
        </Link>
        ,{" "}
        <Link href="https://vercel.com/templates/ai" target="_blank">
          Vercel
        </Link>
        , and{" "}
        <Link href="https://github.com/lclrke/rep-by-text" target="_blank">
          GitHub
        </Link>
      </div>
    </footer>
  );
}
