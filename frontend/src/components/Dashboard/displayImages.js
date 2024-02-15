import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../URL";

const DisplayImage = () => {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const token = Cookies.get("user"); // Assuming the token is stored in a cookie named "user"

                if (!token) {
                    navigate('/login');
                }
                const response = await fetch(`${BASE_URL}/user/api/images/fetch-images`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-3">
                    {/* Sidebar Content */}
                    {/* Add your sidebar content here */}
                </div>
                <div className="col-md-9">
                    {/* Main Content */}
                    <div className="container mt-3">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {images.map((image, index) => (
                                <div key={index} className="col">
                                    <div className="card h-100">
                                        <img src={`${BASE_URL}/${image.image_path}`} alt={`Image ${index}`} className="card-img-top img-fluid" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayImage;
