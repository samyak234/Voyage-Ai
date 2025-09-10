import jsPDF from 'jspdf';
import { Itinerary } from '../types';

export const exportItineraryToPDF = (itinerary: Itinerary) => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt', // Use points for better font control
    format: 'a4'
  });

  // --- Constants for styling ---
  const MARGIN = 40;
  const PAGE_WIDTH = doc.internal.pageSize.getWidth();
  const PAGE_HEIGHT = doc.internal.pageSize.getHeight();
  const MAX_WIDTH = PAGE_WIDTH - MARGIN * 2;
  const FONT_SIZES = {
    title: 24,
    subtitle: 16,
    header: 14,
    body: 10,
    small: 8,
  };
  const LINE_HEIGHT_MULTIPLIER = 1.4;
  const COLORS = {
    primary: '#0D9488', // Teal
    dark: '#111827', // Gray 900
    text: '#374151', // Gray 700
    lightText: '#6B7280', // Gray 500
    border: '#E5E7EB', // Gray 200
  };

  let cursorY = MARGIN;

  // --- Reusable Functions ---

  const addPageNumbers = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(FONT_SIZES.small);
        doc.setTextColor(COLORS.lightText);
        doc.text(
            `Page ${i} of ${pageCount}`,
            PAGE_WIDTH / 2,
            PAGE_HEIGHT - MARGIN / 2,
            { align: 'center' }
        );
    }
  };
  
  const checkPageBreak = (spaceNeeded: number) => {
    if (cursorY + spaceNeeded > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      cursorY = MARGIN;
    }
  };

  // --- Title Page ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_SIZES.title);
  doc.setTextColor(COLORS.dark);
  doc.text(itinerary.tripTitle, PAGE_WIDTH / 2, cursorY + 20, { align: 'center' });
  cursorY += FONT_SIZES.title * LINE_HEIGHT_MULTIPLIER;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONT_SIZES.subtitle);
  doc.setTextColor(COLORS.primary);
  doc.text(`${itinerary.duration}-Day Adventure in ${itinerary.destination}`, PAGE_WIDTH / 2, cursorY + 20, { align: 'center' });
  
  // Start content on a new page after the title page
  doc.addPage();
  cursorY = MARGIN;

  // --- Itinerary Details ---
  itinerary.dailyPlans.forEach(day => {
    // --- Day Header ---
    const dayHeaderHeight = FONT_SIZES.header * LINE_HEIGHT_MULTIPLIER * 2;
    const summaryLines = doc.splitTextToSize(day.summary, MAX_WIDTH);
    const summaryHeight = summaryLines.length * (FONT_SIZES.body * LINE_HEIGHT_MULTIPLIER);
    checkPageBreak(dayHeaderHeight + summaryHeight);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_SIZES.header);
    doc.setTextColor(COLORS.primary);
    doc.text(`Day ${day.day}: ${day.title}`, MARGIN, cursorY);
    cursorY += FONT_SIZES.header * LINE_HEIGHT_MULTIPLIER;
    
    // Day Summary
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(FONT_SIZES.body);
    doc.setTextColor(COLORS.text);
    doc.text(summaryLines, MARGIN, cursorY);
    cursorY += summaryHeight + 15; // Add extra padding

    // Separator line
    doc.setDrawColor(COLORS.border);
    doc.setLineWidth(1);
    doc.line(MARGIN, cursorY - 5, PAGE_WIDTH - MARGIN, cursorY - 5);
    

    // --- Activities ---
    day.activities.forEach(activity => {
      // Calculate height needed for the activity block
      const contentX = MARGIN + 30;
      const contentMaxWidth = MAX_WIDTH - 30;

      const timeHeight = FONT_SIZES.body * LINE_HEIGHT_MULTIPLIER;
      const nameLines = doc.splitTextToSize(activity.name, contentMaxWidth);
      const nameHeight = nameLines.length * (FONT_SIZES.body * LINE_HEIGHT_MULTIPLIER);
      const descriptionLines = doc.splitTextToSize(activity.description, contentMaxWidth);
      const descriptionHeight = descriptionLines.length * (FONT_SIZES.body * LINE_HEIGHT_MULTIPLIER);
      const locationLines = doc.splitTextToSize(`Location: ${activity.location}`, contentMaxWidth);
      const locationHeight = locationLines.length * (FONT_SIZES.small * LINE_HEIGHT_MULTIPLIER);
      const totalActivityHeight = timeHeight + nameHeight + descriptionHeight + locationHeight + 10; // Extra padding

      checkPageBreak(totalActivityHeight + 20); // 20 for margin bottom
      
      const activityStartY = cursorY;

      // Draw timeline line (part of the timeline visual)
      doc.setDrawColor(COLORS.border);
      doc.setLineWidth(2);
      doc.line(MARGIN + 10, activityStartY - 10, MARGIN + 10, cursorY + totalActivityHeight);
      
      // Draw timeline circle
      doc.setFillColor(COLORS.primary);
      doc.circle(MARGIN + 10, cursorY + 5, 5, 'F');
      
      // Time
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(FONT_SIZES.body);
      doc.setTextColor(COLORS.dark);
      doc.text(activity.time, contentX, cursorY + 5);
      cursorY += timeHeight;

      // Name
      doc.setFont('helvetica', 'bold');
      doc.text(nameLines, contentX, cursorY);
      cursorY += nameHeight;

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.text);
      doc.text(descriptionLines, contentX, cursorY);
      cursorY += descriptionHeight + 5;

      // Location
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(FONT_SIZES.small);
      doc.setTextColor(COLORS.lightText);
      doc.text(locationLines, contentX, cursorY);
      cursorY += locationHeight + 20; // Margin bottom for next activity
    });

    // Add a larger space between days, or a page break if it's not the last day
    if (itinerary.dailyPlans.indexOf(day) < itinerary.dailyPlans.length - 1) {
        doc.addPage();
        cursorY = MARGIN;
    }
  });

  // --- Add Page Numbers to all pages ---
  addPageNumbers();

  // --- Save the PDF ---
  const filename = `VoyageAI-${itinerary.destination.replace(/, /g, '-')}.pdf`;
  doc.save(filename);
};
