import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageUploadComponent({keycloak, authenticated,onImageUpload}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreview('');
        }
    };

    // Optionally, you can upload the image to the server here
    const uploadImage = async () => {

        if (!keycloak || !authenticated) {
            console.log('Not authenticated');
            return;
          }

        
        if (!selectedFile) {
            alert('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        
    try{
        const response = await axios.post('http://localhost:8080/image/fileSystem', formData,{
            headers: {
             'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
             },
        });

        const imageId = response.data; 
        console.log('Succesion:', imageId);

        //new
        onImageUpload(imageId);

    }
    catch(error){
        console.error('Upload failed tu:', error);

    }
};


return (
    <div>
        <input type="file" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" style={{ maxHeight: '200px' }} />}
        <button onClick={uploadImage}>Upload Image</button>
        
    </div>
);
}
export default ImageUploadComponent;