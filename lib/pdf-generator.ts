// dynamic import used inside function

export interface PDFExportOptions {
  title?: string;
  categoryTitle?: string;
  complainantName?: string;
  respondentName?: string;
  date?: string;
}

export async function generateLegalNoticePDF(
  letterText: string,
  options: PDFExportOptions = {}
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 25;
  const marginBottom = 25;
  const contentWidth = pageWidth - marginLeft - marginRight;

  // Header banner on first page
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 14, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("MERA HAQ (میرا حق)  —  LEGAL RIGHTS ASSISTANT FOR PAKISTAN", marginLeft, 9);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("OFFICIAL LEGAL NOTICE DRAFT", pageWidth - marginRight, 9, { align: "right" });

  // Body content
  let cursorY = marginTop;

  // Title / Category stamp
  if (options.categoryTitle) {
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(marginLeft, cursorY, contentWidth, 8, 1.5, 1.5, "F");
    doc.setTextColor(13, 148, 136); // teal-600
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`DISPUTE FORUM / CATEGORY: ${options.categoryTitle.toUpperCase()}`, marginLeft + 3, cursorY + 5.5);
    cursorY += 12;
  }

  // Split lines
  doc.setTextColor(15, 23, 42);
  doc.setFont("times", "normal");
  doc.setFontSize(10.5);

  const rawParagraphs = letterText.split("\n");

  for (let i = 0; i < rawParagraphs.length; i++) {
    const rawLine = rawParagraphs[i];

    // Check if line looks like a header or subject
    const isHeaderLine =
      rawLine.startsWith("LEGAL DEMAND NOTICE") ||
      rawLine.startsWith("STATUTORY LEGAL NOTICE") ||
      rawLine.startsWith("FORMAL WRITTEN COMPLAINT") ||
      rawLine.startsWith("SUBJECT:") ||
      rawLine.startsWith("BY REGISTERED");

    if (isHeaderLine) {
      doc.setFont("times", "bold");
      doc.setFontSize(11);
    } else {
      doc.setFont("times", "normal");
      doc.setFontSize(10);
    }

    const wrappedLines = doc.splitTextToSize(rawLine || " ", contentWidth);

    for (let j = 0; j < wrappedLines.length; j++) {
      const line = wrappedLines[j];

      // Check if page overflow
      if (cursorY + 6 > pageHeight - marginBottom) {
        // Add footer to current page
        addFooter(doc, pageWidth, pageHeight, marginLeft, marginRight);
        doc.addPage();
        
        // Mini top bar for subsequent pages
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pageWidth, 6, "F");
        cursorY = marginTop;
      }

      doc.text(line, marginLeft, cursorY);
      cursorY += 5.2;
    }

    if (rawLine === "") {
      cursorY += 2;
    }
  }

  // Add footer to the last page
  addFooter(doc, pageWidth, pageHeight, marginLeft, marginRight);

  // Save PDF
  const safeName = options.complainantName
    ? options.complainantName.replace(/[^a-zA-Z0-9]/g, "_")
    : "Citizen";
  const filename = `Mera_Haq_Legal_Notice_${safeName}.pdf`;
  doc.save(filename);
}

function addFooter(
  doc: any,
  pageWidth: number,
  pageHeight: number,
  marginLeft: number,
  marginRight: number
) {
  const footerY = pageHeight - 12;

  // Thin separator
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.3);
  doc.line(marginLeft, footerY - 3, pageWidth - marginRight, footerY - 3);

  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(
    "Generated via Mera Haq (میرا حق) — Civic Legal Information Assistant. For court representation, consult a licensed advocate.",
    marginLeft,
    footerY + 1
  );

  const pageCount = (doc.internal as any).getNumberOfPages
    ? (doc.internal as any).getNumberOfPages()
    : doc.getNumberOfPages();
  const currentPage = (doc.internal as any).getCurrentPageInfo
    ? (doc.internal as any).getCurrentPageInfo().pageNumber
    : pageCount;

  doc.text(`Page ${currentPage}`, pageWidth - marginRight, footerY + 1, {
    align: "right",
  });
}
