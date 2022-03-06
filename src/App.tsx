import React from "react";
import { loadCV, renderCV } from "./CvData";
import "./App.css";
import {useLocation, useParams} from "react-router-dom";
import QRCode from "react-qr-code";

function App() {
  const cv_data = loadCV();
  const education = cv_data.get("education");
  const employment = cv_data.get("employment");
  const training = cv_data.get("training");
  const publications = cv_data.get("author");

  let query = new URLSearchParams(useLocation().search);

  const lang = query.get("lang") ?? "eng";
  const {id} = useParams();

  const url = "https://johan.oelrich.se/cv/" + (id ?? "") + "?lang=" + lang;

  return (
      <div className="w-full">
        <div className="flex flex-row p-3">
          <div className="grow">
            <h1 className="text-3xl p-8 font-bold underline">CV - Johan Oelrich</h1>
            <div className="flex flex-row">
              <address className="pr-8 pl-16">
              Johan Oelrich<br/>
              Birkagatan 12A<br/>
              75239 Uppsala
              </address>
              <div className="flex flex-col">
                <a href="mailto:johan@oelrich.se" className="flex flex-row w-64"><span className="w-8">✉</span><span>johan@oelrich.se</span></a>
                <a href="tel:+46707903153" className="flex flex-row w-64"><span className="w-8">☏</span><span>+46707903153</span></a>
                <a href="https://www.linkedin.com/in/johanoelrich" className="flex flex-row w-64"><span className="w-8"></span><span>LinkedIn</span></a>
              </div>
            </div>
          </div>
        <div className="p-3">
          <QRCode value={url} size={128} title="CV - Johan Oelrich" />
        </div>
      </div>
      <div className="flex flex-col w-full p-3">
        <div className="font-bold text-xl p-3 pl-5">{(lang === "swe") ? (<>Arbetslivserfarenhet</>) : (<>Work experience</>) }</div>
      {employment?.map( (entry) => { return renderCV(entry, lang) }) }
      </div>
      <div className="flex flex-col w-full p-3 break-before-page">
      <div className="font-bold text-xl p-3 pl-5">{(lang === "swe") ? (<>Utbildning</>) : (<>Education</>) }</div>
      {training?.map( (entry) => { return renderCV(entry, lang) }) }
      { education?.map( (entry) => { return renderCV(entry, lang) }) }
      </div>
      <div>
      <div className="font-bold text-xl p-3 pl-5">{(lang === "swe") ? (<>Publikationer</>) : (<>Publications</>) }</div>
        { publications?.map( (entry) => { return renderCV(entry, lang) } )}
      </div>
    </div>    
  );
}

export default App;
