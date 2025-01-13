import Card from "@/Components/Card";
import { useState,useEffect } from "react";
const fetchedData=async ()=>{
  const res=await fetch("/api/get-user");
  return await res.json();
}
export default function UploadForm() {
  const cardData = {
    image: "https://via.placeholder.com/300x180",
    title: "The Art of React",
    rating: "4.5",
    author: "Jane Doe",
  };

  const [userData,setUserData]=useState([])
  const [formData1, setFormData1] = useState({
    name: "",
    age: "",
    title: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [uploadedFilePath, setUploadedFilePath] = useState("");
 useEffect(() => {
  fetchedData().then(res=>{setUserData(res?.data)})
}, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData1({ ...formData1, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData1.image) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", formData1.image);
    formData.append("name", formData1.name),
    formData.append("age", formData1.age);
    formData.append("title", formData1.title);
    try {
      const MONGODB_URI = process.env.NEXT_PUBLIC_Domain_URI;

      if (!MONGODB_URI) {
        alert("envirenment variable is required");
      }
      // console.log("mongodb uri ",MONGODB_URI)
      const response = await fetch(`${MONGODB_URI}/images/upload`, {
        method: "POST",
        body: formData,
      });
      fetchedData().then(res=>{setUserData(res?.data)})
      setMessage(response.message);
      setUploadedFilePath(response.filePath);
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Image Upload Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData1.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData1.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData1.title}
              onChange={handleInputChange}
              placeholder="Enter a title"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}

        {uploadedFilePath && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 font-medium">Uploaded Image:</p>
            <img
              src={`http://localhost:5000${uploadedFilePath}`}
              alt="Uploaded"
              className="mt-2 mx-auto max-w-full rounded-md shadow"
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3 mx-3 my-16">
        {userData?.map((item,i)=><Card
        key={i}
          image={item.path}
          title={item.title}
          rating={item.age}
          author={item.name}
        />)}
      </div>
    </>
  );
}
