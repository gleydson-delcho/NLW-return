import { Heart } from "phosphor-react";
import { useState } from "react";
import bugImage from '../../assets/bug.svg';
import ideaImage from '../../assets/idea.svg';
import thoughtImage from '../../assets/thought.svg';
import FeedbackTypeStep from "./Steps/FeedbackTypeStep";
import FeedbackContentStep from "./Steps/FeedbackContentStep";
import FeedbackSuccessStep from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImage,
      alt: 'imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImage,
      alt: 'imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImage,
      alt: 'imagem de um balão do pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

const WidgetForm = () => {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  function handleResetFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div
      className="bg-zinc-900 p-4 relative rounded-xl mb-4 flex flex-col items-center shadow-lg
        w-[calc(100vw-2rem)] md:w-auto"
    >
      {
        feedbackSent ? (
          <FeedbackSuccessStep  onFeedbackResetRequested={handleResetFeedback}/>
        ) : (
          <>
            {
              !feedbackType ?
                <FeedbackTypeStep
                  onFeedbackTypeChanged={setFeedbackType}
                />
                :
                <FeedbackContentStep
                  onFeedbackResetRequested={handleResetFeedback}
                  feedbackType={feedbackType}
                  onFeedbackSent={() => setFeedbackSent(true)} />
            }
          </>
        )

      }

      <footer className="text-xs text-neutral-400 flex">
        Feito com  < Heart className="mr-1 ml-1" />  <a className="underline underline-offset-2"
          href="https://github.com/gleydson-delcho" target='_blank'>Gleydson</a>
      </footer>

    </div>
  )
}

export default WidgetForm;