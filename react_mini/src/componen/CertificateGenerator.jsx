import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Input } from "./ui/input";
import Button from "./ui/button";

const CertificateGenerator = () => {
  const [fullName, setFullName] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [logo, setLogo] = useState(""); // For storing the uploaded logo as base64
  const [certificateTitle, setCertificateTitle] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  // Handle logo upload and convert it to base64
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result); // Store base64 image in state
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate input and generate preview
  const handleGenerateCertificate = () => {
    if (!fullName || !event || !date || !certificateTitle) {
      alert("Please fill in all fields.");
      return;
    }
    setIsGenerated(true);
  };

  // Generate and download the PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Add Logo if uploaded
    if (logo) {
      doc.addImage(logo, "PNG", centerX - 10, 50, 80, 60); // Logo centered at the top
    }

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor("#0066B3");
    doc.text("EVENT PARTICIPATION CERTIFICATE", centerX, 140, { align: "center" });

    // Awarding Text
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000000");
    doc.text("The certificate is awarded to", centerX, 180, { align: "center" });

    // Full Name
    doc.setFontSize(32);
    doc.setFont("Lucida Calligraphy", "bold");
    doc.setTextColor("#0066B3");
    doc.text(fullName, centerX, 210, { align: "center" });

    // Completion Text
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000000");
    doc.text("for successfully attending the event", centerX, 240, { align: "center" });

    // Event Name
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#0066B3");
    doc.text(event, centerX, 280, { align: "center" });

    // Date
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000000");
    doc.text(`on ${date}`, centerX, 320, { align: "center" });

    // Footer
    doc.setFontSize(18);
    doc.setTextColor("#FF5733");
    doc.text("Congratulations! You make us proud!", centerX, 350, { align: "center" });

    // Add Border
    doc.setDrawColor("#0066B3");
    doc.setLineWidth(2);
    doc.rect(20, 20, pageWidth - 40, 400);

    // Save PDF
    doc.save("certificate.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F7]">
      <div className="w-full max-w-lg bg-[#3F72AF] shadow-lg rounded-lg p-6">
        {!isGenerated ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-[#0D1282] mb-2">
              Cert Hub
            </h2>
            <p className="text-sm text-center text-[#CBDCEB] mb-4">
              Certify With Ease
            </p>
            <form className="space-y-4">
              {/* Full Name */}
              <label className="block">
                <span className="text-[#112D4E] font-medium">Full Name:</span>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Full Name"
                  className="bg-[#DBE2EF] focus-visible:ring-transparent"
                />
              </label>

              {/* Event */}
              <label className="block">
                <span className="text-[#112D4E] font-medium">Event/Occasion:</span>
                <Input
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  placeholder="Enter Event/Occasion"
                  className="bg-[#DBE2EF] focus-visible:ring-transparent"
                />
              </label>

              {/* Date */}
              <label className="block">
                <span className="text-[#112D4E] font-medium">Date:</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 rounded bg-[#DBE2EF]"
                />
              </label>

              {/* Certificate Title */}
              <label className="block">
                <span className="text-[#112D4E] font-medium">Certificate Title:</span>
                <Input
                  type="text"
                  value={certificateTitle}
                  onChange={(e) => setCertificateTitle(e.target.value)}
                  placeholder="Enter Certificate Title"
                  className="bg-[#DBE2EF] focus-visible:ring-transparent"
                />
              </label>

              {/* Logo Upload */}
              <label className="block">
                <span className="text-[#112D4E] font-medium">Upload Logo:</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleLogoUpload}
                  className="w-full p-2 bg-[#DBE2EF] rounded"
                />
              </label>

              {/* Generate Certificate */}
              <Button
                type="button"
                onClick={handleGenerateCertificate}
                className="w-full bg-[#112D4E] text-white py-2 rounded hover:bg-[#0D1282]"
              >
                Generate Certificate
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#112D4E] mb-4">
              Certificate Preview
            </h2>
            <div className="border p-6 rounded bg-white shadow">
              <p className="text-lg text-[#000] font-semibold">{certificateTitle}</p>
              <p className="text-gray-600 mt-2">{fullName}</p>
              <p className="text-gray-600 mt-2">{event}</p>
              <p className="text-gray-600">{date}</p>
              {logo && (
                <img src={logo} alt="Logo Preview" className="w-20 mx-auto mt-4" />
              )}
            </div>
            <Button
              onClick={handleDownloadPDF}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Download as PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;
