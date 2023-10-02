import React from 'react';
import { Card, QRCode, Button } from 'antd';

const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
    if (canvas) {
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.download = 'QRCode.png';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};

const Step3Form = () => {

    return (
        <>
            <Card>
            <div id="myqrcode" style={{ display: 'flex', justifyContent: 'center' }}>
                <QRCode
                    value="https://ant.design/"
                    bgColor="#fff"
                    style={{
                        marginBottom: 16,
                    }}
                />

            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" onClick={downloadQRCode}>
                    Download
                </Button>
                </div>
                </Card>
            <br/>
        </>
    );
};

export default Step3Form;