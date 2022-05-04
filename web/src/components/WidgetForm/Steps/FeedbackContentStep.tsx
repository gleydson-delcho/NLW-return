import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import CloseButton from "../../CloseButton";
import { ScreenshotButton } from "../../ScreenshotButton";


interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackResetRequested: () => void;
  onFeedbackSent: () => void;
}

const FeedbackContentStep = ({
  feedbackType,
  onFeedbackResetRequested,
  onFeedbackSent
}: FeedbackContentStepProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    console.log(screenshot, comment)
    onFeedbackSent()
  }
  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackResetRequested}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.title} className="w-6 h-6" />
        <span className="text-xl leading-6">{feedbackTypeInfo.title}</span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w[304px] w-full min-h[112px] text-sm placeholder-zinc-400 text-zinc-100
         border-zinc-100 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 
         focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 
         scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que esta acontecendo"
          onChange={(e) => setComment(e.target.value)} />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot!} 
            />
          <button
            disabled={comment.length === 0}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center 
            items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-offset-zinc-500 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:hover:bg-brand-500">
            Enviar Feedback
          </button>

        </footer>
      </form>
    </>
  );
}

export default FeedbackContentStep;