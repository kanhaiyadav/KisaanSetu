import { useState } from 'react';
import axios from 'axios';

const Classifier = () => {
    const [image, setImage] = useState<File | null>(null);
    const [result, setResult] = useState('');

    type FileChangeEvent = React.ChangeEvent<HTMLInputElement> & {
        target: HTMLInputElement & EventTarget;
    };

    const handleFileChange = (e: FileChangeEvent) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    interface FormDataResponse {
        result: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            setResult('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post<FormDataResponse>('http://localhost:3000/classify', formData, {
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
