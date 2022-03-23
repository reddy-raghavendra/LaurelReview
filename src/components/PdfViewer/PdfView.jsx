import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "./PdfView.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// const { pdf } = `https://firebasestorage.googleapis.com/v0/b/laurel-review.appspot.com/o/images%2F54.2%20Interior%20Proof%202.pdf?alt=media&token=02cbbdd6-3ac3-4827-a3d1-2593320e6e42`;
export default function PdfView(props) {
  const { state } = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(state.pageNo); //setting 1 to show fisrt page
  console.log("pageno", state);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(state.pageNo);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function navigateToThirdParty(){
    window.open("https://thelaurelreview.submittable.com/submit")
  }

  const { pdf } = props;
  console.log(pdf);

  return (
    <section className="float-container">
      {/* <div className="laurel-issue-degtails-container"> */}
      <div className="float-child">
        <h2>{state.title}</h2>
        {/* <div class = "laurel-issue-details-img"> */}
        <img className="issue-image" src={state.image}></img>
        {/* </div> */}
        <button
          class="order-now"
          onClick={navigateToThirdParty}
        >
          Order Now
        </button>
      </div>
      <div className="float-pdf">
        <div class="pdf">
          <Document
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{ workerSrc: "/pdf.worker.js" }}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <button
              class="pdfbutton"
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              class="pdfbutton"
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}
