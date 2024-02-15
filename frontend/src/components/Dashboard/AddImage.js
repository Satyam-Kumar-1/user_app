import React, { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../URL";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('user');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setDisplayImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        
    };

    const handleSubmit = async () => {
        try {
            const token = Cookies.get('user');
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await fetch(`${BASE_URL}/user/api/images/add-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (!response.ok) {
                const responseData=await response.json();
                throw new Error(responseData.error);
            }
            toast.success("Image uploaded Successfully");
            navigate('/display-image')
            // Handle successful response
            //console.log('Image uploaded successfully');
        } catch (error) {
            toast.error(error.message);
            //console.error('Error uploading image:', error);
        }
    };

    return (
        <> <ToastContainer position="top-right" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                        <div className="container mt-5">

                            <div className="mb-3 d-flex flex-column align-items-center">
                                <h1>Add Image</h1>
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control"
                                    />
                                </div>
                                {selectedImage && (
                                    <div className="mt-3">
                                        <img
                                            src={displayImage}
                                            alt="Selected"
                                            style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "10px" }}
                                        />
                                    </div>
                                )}
                                {!selectedImage && (
                                    <div className="mt-3">
                                        <img
                                            src="/images/image-place-holder.png"
                                            alt="Default"
                                            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                                        />
                                    </div>
                                )}
                                <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default AddImage;
