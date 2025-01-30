'use client'

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function LinkQRCode({ url }: { url: string }) {
    const qrCodeRef = React.useRef(null);

    const downloadQRCode = () => {
        // Create a new jsPDF instance
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Get the QR code SVG element
        const svgElement = qrCodeRef.current;
        if (!svgElement) return;

        // Convert SVG to canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            
            // Add the image to PDF
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10, 50, 50);
            
            // Add some text
            pdf.setFontSize(16);
            pdf.text('QR Code for: ' + url, 10, 70);
            
            // Save the PDF
            pdf.save('qr-code.pdf');
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div ref={qrCodeRef}>
                <QRCodeSVG
                    value={url}
                    title={"Title for my QR Code"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                />
            </div>
            <Button 
                onClick={downloadQRCode}
                className='flex items-center w-full justify-center gap-2'
            >   
                <Download size={20} />
                Baixar PDF
            </Button>
        </div>
    );
}