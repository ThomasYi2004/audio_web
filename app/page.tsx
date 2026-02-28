'use client'

import { useEffect, useRef } from "react";

// This component handles automatic speech recognition (STT) and
// text-to-speech (TTS) entirely in the browser.  When the user starts
// speaking the Web Speech API generates text which is POSTed to the
// Python server.  The server reply is then spoken back automatically.
// No buttons are required – speech detection and playback is fully
// automatic.  Errors are logged to the console.

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const speakingRef = useRef<boolean>(false);
  const processingRef = useRef(false);

  useEffect(() => {
    // guard against unsupported browsers
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not available in this browser.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous = true; // keep listening until we call stop()
    recog.interimResults = false; // we only care about final results
    recog.lang = "en-US";

    const speak = (text: string) => {
    if (!text) return;
    if (!("speechSynthesis" in window)) {
      console.warn("SpeechSynthesis not available");
      return;
    }
    speakingRef.current = true;
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => {
      speakingRef.current = false;
      // restart recognition after speaking finishes
      recognitionRef.current?.start();
    };
    window.speechSynthesis.speak(utter);
  };

    recog.onresult = async (event: any) => {
      // if (processingRef.current) return;
      try {
        // processingRef.current = true;
        const last = event.results[event.results.length - 1];
        const text = last[0].transcript.trim();
        console.log("Recognized:", text);
        if (text) {
          const response = await fetch("http://localhost:8000/reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });
          const json = await response.json();
          const reply = json.reply || json.text || "";
          console.log("Server reply:", reply);
          speak(reply);
        }
      } catch (err) {
        processingRef.current = false;
        console.error("Error handling recognition result", err);
      }
    };

    recog.onerror = (e: any) => {
      console.error("Recognition error", e.error);
    };

    recog.onend = () => {
      // if we weren't intentionally speaking, restart recognition
      console.log("Recognition ended", speakingRef.current);
      if (!speakingRef.current) {
        recog.start();
      }
    };

    recognitionRef.current = recog;
    recog.start();

    return () => {
      recog.stop();
    };
  }, []);

  // const speak = (text: string) => {
  //   if (!text) return;
  //   if (!("speechSynthesis" in window)) {
  //     console.warn("SpeechSynthesis not available");
  //     return;
  //   }
  //   speakingRef.current = true;
  //   const utter = new SpeechSynthesisUtterance(text);
  //   utter.onend = () => {
  //     speakingRef.current = false;
  //     // restart recognition after speaking finishes
  //     recognitionRef.current?.start();
  //   };
  //   window.speechSynthesis.speak(utter);
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="p-8 max-w-xl text-center">
        <h1 className="text-2xl font-bold mb-4">Voice Chat</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Speak into your microphone and the server will reply verbally. The
          conversation happens in real time without any buttons.
        </p>
        {/* audio element is not needed since we use SpeechSynthesis, but kept
            here in case you want to pipe raw audio data in future */}
        <audio id="dummy" hidden />
      </main>
    </div>
  );
}
