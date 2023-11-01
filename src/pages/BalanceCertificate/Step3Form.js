import React, { useEffect,useState } from 'react';
import { Card, QRCode, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setQrCertificate } from '../../store/slices/certificateSlice'
import { useSelector } from 'react-redux';
import { encrypt } from '../../hooks/crypto';

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
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [url,seturl] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const hashedVerificationID = encrypt(certificateData['REFERENCE_NO'])
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const verification_url = `${BASE_URL}/verification?verficationID=${encodeURIComponent(hashedVerificationID)}`;
        seturl(verification_url)
    },[])


    useEffect(() => {
        const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const hashedVerificationID = encrypt(certificateData['REFERENCE_NO'])
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            const verification_url = `${BASE_URL}/verification?verficationID=${encodeURIComponent(hashedVerificationID)}`;
            dispatch(setQrCertificate(verification_url))
        }
    }, [url])
    return (
        <>
            <Card>
            <div id="myqrcode" style={{ display: 'flex', justifyContent: 'center' }}>
                <QRCode
                    value={url}
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