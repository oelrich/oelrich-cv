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

  const url = "https://oelrich.github.io/oelrich-cv/" + (id ?? "") + "?lang=" + lang;

  return (
      <div className="w-full">
        <div className="flex flex-row p-3">
          <div className="grow">
            <h1 className="text-3xl p-8 font-bold">CV - Johan Oelrich</h1>
            <div className="flex flex-row">
              <address className="pr-8 pl-16  w-56">
              Johan Oelrich<br/>
              Birkagatan 12A<br/>
              75239 Uppsala
              </address>
              <div className="flex flex-col w-48">
                <a href="mailto:johan@oelrich.se"><span>johan@oelrich.se</span></a>
                <a href="https://oelrich.se">https://oelrich.se</a>
                <a href="tel:+46707903153"><span>070-790 31 53</span></a>
              </div>
              <div className="flex flex-col">
                <a href="https://github.com/oelrich">https://github.com/oelrich</a>
                <a href="https://www.linkedin.com/in/johanoelrich"><span>linkedin.com/in/johanoelrich</span></a>
              </div>
            </div>
          </div>
        <div className="p-3">
          <QRCode value={url} size={128} title="CV - Johan Oelrich" />
        </div>
      </div>
      <div className="flex flex-col w-full p-16 pt-8">
        <div className="font-bold text-2xl pb-5">{(lang === "swe") ? (<>Arbetslivserfarenhet</>) : (<>Work experience</>) }</div>
      {employment?.map( (entry) => { return renderCV(entry, lang) }) }
      </div>
      <div className="flex flex-col w-full p-16 break-before-page">
      <div className="font-bold text-2xl pl-5 pt-8">{(lang === "swe") ? (<>Utbildning</>) : (<>Education</>) }</div>
      {training?.map( (entry) => { return renderCV(entry, lang) }) }
      { education?.map( (entry) => { return renderCV(entry, lang) }) }
      </div>
      <div>
      <div className="font-bold text-2xl pl-5 pt-8">{(lang === "swe") ? (<>Publikationer</>) : (<>Publications</>) }</div>
        { publications?.map( (entry) => { return renderCV(entry, lang) } )}
      </div>
    </div>    
  );
}

export default App;
