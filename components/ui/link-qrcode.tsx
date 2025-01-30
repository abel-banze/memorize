import { QRCodeSVG } from 'qrcode.react';


export default function LinkQRCode({ url }: { url: string }) {
    return (
        <QRCodeSVG
            value={url}
            title={"Title for my QR Code"}
            size={128}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
        />
    )
}