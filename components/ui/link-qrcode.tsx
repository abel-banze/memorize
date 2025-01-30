'use client'

import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LinkQRCode({ url }: { url: string }) {
    const qrCodeRef = useRef<HTMLCanvasElement>(null);

    const downloadQRCode = () => {
        if (!qrCodeRef.current) return;
        
        // Convert canvas to data URL
        const imgData = qrCodeRef.current.toDataURL('image/png');
        
        // Create a new jsPDF instance
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Add the QR Code image to PDF
        pdf.addImage(imgData, 'PNG', 10, 10, 50, 50);
        pdf.setFontSize(16);
        pdf.text('QR Code for: ' + url, 10, 70);
        
        // Save the PDF
        pdf.save('qr-code.pdf');
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <QRCodeCanvas
                ref={qrCodeRef}
                value={url}
                size={128}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
            />
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
