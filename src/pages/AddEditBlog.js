import React, { useState, useEffect } from 'react'
import "./reponsive.css"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Tagsinput from '../components/Tagsinput';
const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];
const AddEditBlog = ({ user, setActive,  }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null)

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {

            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
   
  };

  const handleTags = (tags) => {
    
    setForm({ ...form, tags });
    console.log("1111111111",tags)
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });

  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    if (category && tags && title && file && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  }
  return (
    <div className="w-full    flex  sm:justify-center items-center">
      <div className="container w-4/6 ">
        <div className="col-12">
          <div className="text-center text-2xl font-bold">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="">
          <div className="">
            <form onSubmit={handleSubmit}  >
              <div className='mt-8 '>
                <input
                  type="text"
                  className="w-full rounded-lg p-1.5 border border-gray-300 "
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-8 '>
                <Tagsinput
                  className="rounded-lg"
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              <div className="flex justify-between mt-8">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}

                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
                <div></div>
              </div>
              <div className='mt-8 ' >
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="rounded-lg w-full p-1.5 border border-gray-300"
                >
                  <option >Please select category</option>

                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>

              </div>
              <div className='mt-8'>
                <textarea
                  className="w-full p-1.5 h-36 rounded-lg border border-gray-300"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="'mt-8">
                <input
                  type="file"
                  className=" border rounded-lg border-gray-300 w-full"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className=" text-center  mt-4">
                <button
                  className="bg-emerald-700 p-2 rounded-lg text-slate-100 w-28"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditBlog