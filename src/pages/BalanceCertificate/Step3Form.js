import React, { useEffect } from 'react';
import { Card, QRCode, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setQrCertificate } from '../../store/slices/certificateSlice'
import { useSelector } from 'react-redux';

const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');

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

        // const base64String = getBase64StringFromDataURL(url);
        // console.log(base64String)
    }
};



const Step3Form = () => {

    const { certificates, certificate_loading } = useSelector((state) => state.certificate);
    const certificateData = certificates.length !== 0 ? certificates[0] : [];
    const dispatch = useDispatch();
    useEffect(() => {
        const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const base64String = getBase64StringFromDataURL(url);
            console.log(base64String)
            dispatch(setQrCertificate(base64String))
            
        }
    },[])
    return (
        <>
            <Card>
            <div id="myqrcode" style={{ display: 'flex', justifyContent: 'center' }}>
                <QRCode
                    value={certificateData['REFERENCE_NO']}
                    bgColor="#fff"
                    style={{
                        marginBottom: 19,
                        }}
                    errorLevel='H'    
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