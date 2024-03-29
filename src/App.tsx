//import React from "react";
import { loadCV, renderCV } from "./CvData";
import QRCode from "react-qr-code";

function App() {
  const cv_data = loadCV();
  const education = cv_data.get("education");
  const employment = cv_data.get("employment");
  const training = cv_data.get("training");
  const publications = cv_data.get("author");
  const responsibilities = cv_data.get("responsibility");

  const url = "https://oelrich.github.io/oelrich-cv";

  return (
      <div className="w-full p-5">
        <div className="flex flex-row gap-4 md:w-3/4 xl:w-1/2 md:m-auto print:w-full print:m-auto">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-justify">CV - Johan Oelrich</h1>
            <div className="flex flex-wrap justify-between gap-4 text-sm pt-4 md:justify-start print:justify-start">
              <address className="flex flex-col gap-0.5">
              <span>Johan Oelrich</span>
              <span>Birkagatan 12A</span>
              <span>752 39 Uppsala</span>
              </address>
              <div className="flex flex-col gap-0.5">
                <a href="mailto:johan@oelrich.se"><span>johan@oelrich.se</span></a>
                <a href="https://oelrich.se">https://oelrich.se</a>
                <a href="tel:+46707903153"><span>070-790 31 53</span></a>
              </div>
              <div className="flex flex-col gap-0.5">
                <a href="https://github.com/oelrich">https://github.com/oelrich</a>
                <a href="https://www.linkedin.com/in/johanoelrich"><span>linkedin.com/in/johanoelrich</span></a>
              </div>
            </div>
          </div>
        <div className="invisible hidden md:block md:visible print:block print:visible">
          <QRCode value={url} size={128} title="CV - Johan Oelrich" />
        </div>
      </div>

      <div className="flex flex-col pt-8 gap-y-4 md:w-3/4 m-auto md:grid md:grid-cols-8 print:w-full print:grid print:grid-cols-8 xl:w-1/2">
        <h2 className="font-bold text-xl md:col-span-6 md:col-start-3 print:col-span-6 print:col-start-3">Arbetslivserfarenheter</h2>
        {employment?.map( (entry) => { return renderCV(entry, "swe") }) }
      </div>
      <div className="break-before-page flex flex-col pt-8 gap-y-4 md:w-3/4 m-auto md:grid md:grid-cols-8 print:w-full print:grid print:grid-cols-8 xl:w-1/2">
        <h2 className="font-bold text-xl md:col-span-6 md:col-start-3 print:col-span-6 print:col-start-3">Utbildning</h2>
        { education?.map( (entry) => { return renderCV(entry, "swe") }) }
      </div>
      <div className="flex flex-col pt-8 gap-y-4 md:w-3/4 m-auto md:grid md:grid-cols-8 print:w-full print:grid print:grid-cols-8 xl:w-1/2">
        <h2 className="font-bold text-xl md:col-span-6 md:col-start-3 print:col-span-6 print:col-start-3">Kurser och vidareutbildning</h2>
        {training?.map( (entry) => { return renderCV(entry, "swe") }) }
      </div>
      <div className="break-before-page flex flex-col pt-8 gap-y-4 md:w-3/4 m-auto md:grid md:grid-cols-8 print:w-full print:grid print:grid-cols-8 xl:w-1/2">
        <h2 className="font-bold text-xl md:col-span-6 md:col-start-3 print:col-span-6 print:col-start-3">Språk</h2>
        <p className="md:col-start-3 md:col-span-6 print:col-span-6 print:col-start-3">Modersmål svenska. Talar och skriver engelska flytande.</p>
      </div>
      <div className="flex flex-col pt-8 gap-y-4 md:w-3/4 m-auto md:grid md:grid-cols-8 print:w-full print:grid print:grid-cols-8 xl:w-1/2">
        <h2 className="font-bold text-xl md:col-span-6 md:col-start-3 print:col-span-6 print:col-start-3">Förtroendeuppdrag</h2>
        { responsibilities?.map( (entry) => { return renderCV(entry, "swe") } )}
      </div>
      <div className="flex flex-col pt-8 gap-y-4 md:w-3/4 m-auto md:grid md:grid-cols-8 print:w-full print:grid print:grid-cols-8 xl:w-1/2">
        <h2 className="font-bold text-xl md:col-span-6 md:col-start-3 print:col-span-6 print:col-start-3">Publikationer</h2>
        { publications?.map( (entry) => { return renderCV(entry, "swe") } )}
      </div>
      <div className="flex flex-col pt-8 gap-y-4 md:w-3/4 m-auto md:grid md:grid-cols-8 print:w-full print:grid print:grid-cols-8 xl:w-1/2">
        <h2 className="font-bold text-xl md:col-span-6 md:col-start-3 print:col-span-6 print:col-start-3">Referenser</h2>
        <p className="md:col-start-3 md:col-span-6 print:col-span-6 print:col-start-3">Referenser lämnas på begäran.</p>
      </div>
    </div>
  );
}

export default App;
