
import cv from './cv.json';

interface TimeDesc {
  from: string,
  to?: string
}

function renderTime(when: TimeDesc) {
  if (when.to) {
    if (when.from === when.to) {
      return (<div className="text-sm">{when.from}</div>)
    } else {
      return (<div className="text-sm">{when.from} &ndash; {when.to}</div>)
    }
  } else {
    return (<div className="text-sm">{when.from} &ndash;</div>)
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
  return (
      <div className="flex flex-row p-1 py-3  print:py-1">
        <div className="flex flex-col basis-1/4 pr-2">
          {renderOrganisation(what, lang)}
          {renderTime(when)}
        </div>
        <div className="flex flex-col basis-3/4">
          {renderDetails(what, lang)}
        </div>
      </div>)  
}

interface Education {
  "category": "education",
  when: TimeDesc,
  details: Details
}

function renderEducation(entry: Education, lang: string) {
  return (<div>{renderWhenWhat(entry.when, entry.details, lang)}</div>)
}

interface Employment {
  "category": "employment",
  when: TimeDesc,
  details: Details
}

function renderEmployment(entry: Employment, lang: string) {
  return (<div>{renderWhenWhat(entry.when, entry.details, lang)}</div>)
}

interface Training {
  "category": "training",
  when: TimeDesc,
  details: Details
}

function renderTraining(entry: Training, lang: string) {
  return (<div>{renderWhenWhat(entry.when, entry.details, lang)}</div>)
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