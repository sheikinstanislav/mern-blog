import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/features/post/postSlice";
import axios from "../utils/axios";

export const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("id", params.id);
      updatedPost.append("image", newImage);
      dispatch(updatePost(updatedPost));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setTitle("");
    setText("");
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      <form
        className="w-1/3 mx-auto py-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
          Upload image:
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              setNewImage(e.target.files[0]);
              setOldImage("");
            }}
          />
        </label>

        <div className="flex object-cover py-2">
          {oldImage && (
            <img
              src={`http://localhost:3002/${oldImage}`}
              alt={oldImage.name}
            />
          )}
          {newImage && (
            <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
          )}
        </div>

        <label className="text-xs text-white opacity-70">
          Post title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          />
        </label>

        <label className="text-xs text-white opacity-70">
          Post text:
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text"
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
          />
        </label>

        <div className="flex gap-8 items-center justify-center mt-4">
          <button
            className="flex items-center justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
            onClick={submitHandler}
          >
            Save
          </button>
          <button
            onClick={clearFormHandler}
            className="flex items-center justify-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
