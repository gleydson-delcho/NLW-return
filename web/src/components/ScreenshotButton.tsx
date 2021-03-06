import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenshotButtonProps {
  screenshot: string;
  onScreenshotTook: (screenshot: string | null) => void;
}

export const ScreenshotButton = ({ screenshot, onScreenshotTook }: ScreenshotButtonProps) => {
  const [isTakeScreenshot, setIsTakeScreenshot] = useState<boolean>(false);
  
  async function handleTakeScreenshot() {
    setIsTakeScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');
    onScreenshotTook(base64image);
    setIsTakeScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize:180
        }}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end 
      text-zinc-400 hover:text-zinc-100 transition-colors" >
        <Trash weight="fill" onClick={()=> onScreenshotTook(null)}/>

      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md borrder-transparent 
          hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-offset-zinc-500 focus:ring-brand-500 transition-colors">
      {
        isTakeScreenshot ? <Loading /> : <Camera className="w-6 h-6" />
      }

    </button>
  );
}