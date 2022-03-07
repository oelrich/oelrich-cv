
import cv from "./cv.json";

interface TimeDesc {
  from: string,
  to?: string
}

function renderTime(when: TimeDesc) {
  if (when.to) {
    if (when.from === when.to) {
      return (<>{when.from}</>)
    } else {
      return (<>{when.from} &ndash; {when.to}</>)
    }
  } else {
    return (<>{when.from} &ndash;</>)
  }
}

interface SimpleDescription {
  text: string,
}

interface ReferencingDescription {
  text: string,
  reference: string,
}

type DescriptionSegment = SimpleDescription | ReferencingDescription;

interface Experience {
  organisation: Array<string>,
  title: string,
  description: Array<DescriptionSegment>,
}

function renderDescription(entries: Array<DescriptionSegment>) {
  return entries.map((entry) => { return (<div>{entry.text}</div>)})
}

function renderExperience(entry: Experience) {
  return (<div className="flex flex-col">
            <div className="font-bold text-l">{entry.title}</div>
            {renderDescription(entry.description)}
          </div>)
}

interface Details {
  swe?: Experience,
  eng: Experience,
}

function renderDetails(entry: Details, lang: string) {
  if (lang === "swe" && entry.swe) {
     return renderExperience(entry.swe);
  } else { 
    return renderExperience(entry.eng);
  }
}

function renderOrganisation(entry: Details, lang: string) {
  let org = entry.eng.organisation;
  if (lang === "swe" && entry.swe?.organisation) {
    org = entry.swe?.organisation 
  };
  return org.map((line) => <div className="text-l font-semibold">{line}</div>)
}

function renderWhenWhat(when: TimeDesc, what: Details, lang: string) {
  let org = what.eng.organisation;
  let details = what.eng.description;
  let title = what.eng.title;
  if (lang === "swe" && what.swe) {
    org = what.swe.organisation;
    details = what.swe.description;
    title = what.swe.title;
  };
  return (
      <div className="grid grid-cols-8 gap-x-2 gap-y-1">
        <div className="col-span-4 row-span-2 md:col-span-2 md:row-span-1 font-bold text-l self-end">{title}</div>
        <div className="col-span-4 justify-self-end self-end flex flex-col md:flex-row md:gap-2">
          <div className="font-medium text-sm justify-self-end">{org[0]}</div>
          {org.slice(1).map((elt) =>{ return (<div className="text-sm justify-self-end">{elt}</div>)})}
        </div>
        <div className="col-span-4 md:col-span-2 text-sm self-end justify-self-end">{renderTime(when)}</div>

        <div className="col-span-8">{details[0].text}</div>
        {details.slice(1).map((elt) =>{ return (<div className="col-span-8">{elt.text}</div>)})}
      </div>)
}

interface Education {
  "category": "education",
  when: TimeDesc,
  details: Details
}

function renderEducation(entry: Education, lang: string) {
  return (<>{renderWhenWhat(entry.when, entry.details, lang)}</>)
}

interface Employment {
  "category": "employment",
  when: TimeDesc,
  details: Details
}

function renderEmployment(entry: Employment, lang: string) {
  return (<>{renderWhenWhat(entry.when, entry.details, lang)}</>)
}

interface Training {
  "category": "training",
  when: TimeDesc,
  details: Details
}

function renderTraining(entry: Training, lang: string) {
  return (<>{renderWhenWhat(entry.when, entry.details, lang)}</>)
}

interface PaperCitation {
  "type": "paper",
  title: string,
  author: string,
  journal: string,
  volume: string,
  number: string,
  pages: string,
  year: string,
  publisher: string
}

function renderPaper(paper: PaperCitation) {
  return (<div><div>{paper.title} in {paper.journal}</div><div>{paper.author}</div></div>)
}

interface BookCitation {
  "type": "book",
  title: string,
  author: string,
  booktitle: string,
  pages: string,
  year: string,
  organisation: string
}

function renderBook(book: BookCitation) {
  return (<div><div>{book.title} in {book.booktitle}</div><div>{book.author}</div></div>)
}

type Citation = PaperCitation | BookCitation

function renderCitation(entry:Citation) {
  switch (entry.type) {
    case "book": return renderBook(entry);
    case "paper": return renderPaper(entry);
    default: return <div>Undefined Citation.</div>
  }
}

interface Author {
  "category": "author",
  reference: string
  citation: Citation
}

function renderAuthor(entry: Author) {
  return (<div id={entry.reference}>{renderCitation(entry.citation)}</div>);
}

type CvEntry = Education | Employment | Training | Author

export function renderCV(entry: CvEntry, lang: string) {
    switch (entry.category) {
      case "education": return renderEducation(entry, lang);
      case "employment": return renderEmployment(entry, lang);
      case "training": return renderTraining(entry, lang);
      case "author": return renderAuthor(entry);
      default: return <div>Undefined CvEntry</div>;
    }
}

function groupByCategory(entries: Array<CvEntry>) {
  const data : Map<string, CvEntry[]> = new Map();
  entries.forEach((entry) => {
    const collection = data.get(entry.category);
    if(!collection) {
      data.set(entry.category, [entry]);
    } else {
      collection.push(entry);
    }
  });
  return data;
}
export function loadCV() {
  return groupByCategory(cv as Array<CvEntry>);
}