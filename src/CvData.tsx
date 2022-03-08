
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

type DescriptionSegment = {
  text: string,
  ref?: string,
};
interface Experience {
  organisation: Array<string>,
  title: string,
  description: Array<DescriptionSegment>,
}
interface Details {
  swe?: Experience,
  eng: Experience,
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
      <div className="md:grid md:grid-cols-8 md:col-span-8 print:grid print:grid-cols-8 print:col-span-8">
        <h3 className="font-semibold md:col-start-3 md:col-span-6 print:col-start-3 print:col-span-6">{title}</h3>
        <div className="text-sm md:col-span-2 print:col-span-2">
          <div className="font-medium">{org[0]}</div>
          {org.slice(1).map((elt) =>{ return (<div className="">{elt}</div>)})}
          <div className="">{renderTime(when)}</div>
        </div>
        <p className="md:col-span-6 print:col-span-6"><span>{details[0].text}</span>{details.slice(1).map((elt) => {
          return (elt.ref ? <a href={"#" + elt.ref} className="col-span-8 block">{elt.text} <span className="underline">[ref]</span></a> : <span className="col-span-8 block">{elt.text}</span>)
            })}</p>
        
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

function renderRefAuthor(author: string) {
  const primary = author.split(" and ")[0].split(",")
  return (<>{primary[1] + " " + primary[0] + " et al."}</>)
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
  return (<>
      <span>{renderRefAuthor(paper.author)}</span> <span className="italic">"{paper.title}"</span>. In: <span className="italic">{paper.journal}</span> <span>{paper.volume}</span>.<span>{paper.number}</span> <span>({paper.year})</span>, pp. <span>{paper.pages.replace("--","–")}</span>.
    </>)
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
  return (<>
    <span>{renderRefAuthor(book.author)}</span> <span>"{book.title}"</span> In: <span className="italic">{book.booktitle}</span>. <span>{book.organisation}</span>. <span>{book.year}</span>, pp. <span>{book.pages.replace("--","–")}</span>.
    </>)
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
  return (<div id={entry.reference} className="col-start-3 col-span-5">{renderCitation(entry.citation)}</div>);
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