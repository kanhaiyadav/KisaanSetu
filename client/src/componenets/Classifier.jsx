import { useState } from 'react';
import axios from 'axios';

const Classifier = () => {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post('http://localhost:3000/classify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(res.data.result.split('$')[1]);
        } catch (err) {
            console.error(err);
            setResult('Error classifying image');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Classify</button>
            </form>
            <div>{result}</div>
        </div>
    );
};

export default Classifier;
