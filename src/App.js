import React, { useEffect, useRef, useState } from "react";
import download from "downloadjs";
import { toPng } from "html-to-image";
import Draggable from "react-draggable";
import logo from "./logo.svg";

const URL = "https://api.imgflip.com/get_memes";

const App = () => {
  const imgRef = useRef();
  const [meme, setMeme] = useState({
    shutup: "",
    takeMoney: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMeme({ ...meme, [name]: value });
  };
  const showImages = () => {
    const randomImage = Math.floor(Math.random() * allMemes.length);
    const { url } = allMemes[randomImage];
    setMeme((prev) => {
      return {
        ...prev,
        randomImg: url,
      };
    });
  };

  const downloadImage = () => {
    toPng(imgRef.current).then(function (img) {
      download(img, "my-meme.png");
    });
  };

  const fetchMemes = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    setAllMemes(data.data.memes);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div>
      <nav className="flex items-center bg-[#A426D0] max-w-xl m-auto text-white p-5">
        <img src={logo} alt="logo" className="h-10 mr-2" />
        <h2 className="text-xl font-bold mr-auto">Meme Generator</h2>
        <h4 className="text-xs font-medium">React Course - Project 3</h4>
      </nav>

      <div className="bg-white pb-14 max-w-xl mx-auto mt-28">
        <div className="flex items-center justify-between pt-4">
          <input
            name="takeMoney"
            value={meme.takeMoney}
            onChange={handleChange}
            type="text"
            className="w-[230px] h-9 p-2 rounded-md border border-[#D5D4D8]"
            placeholder="Shut up"
          />
          <input
            name="shutup"
            value={meme.shutup}
            onChange={handleChange}
            type="text"
            className="w-[230px] h-9 p-2 rounded-md border border-[#D5D4D8]"
            placeholder="and take my money"
          />
        </div>
        <button
          onClick={showImages}
          className="bg-[#A426D0] font-bold text-base text-white py-2 rounded-md w-full mt-2 mb-6"
        >
          Get a new meme image 🖼
        </button>
        <div className="relative flex items-center justify-center" ref={imgRef}>
          <Draggable bounds="parent">
            <span className="absolute cursor-pointer text-center -translate-x-1/2 mt-[15px] uppercase top-0 text-white font-bold text-4xl">
              {meme.shutup}
            </span>
          </Draggable>
          <img
            src={meme.randomImg}
            alt="random"
            className="w-full h-[268px] rounded-md object-cover"
          />
          <Draggable bounds="parent">
            <span className="absolute text-center cursor-pointer -translate-x-1/2 mt-[15px] uppercase bottom-0 text-white font-bold text-4xl">
              {meme.takeMoney}
            </span>
          </Draggable>
        </div>
        <button
          onClick={downloadImage}
          className="bg-[#A426D0] font-bold text-base text-white py-2 rounded-md w-full mt-6"
        >
          Download Image
        </button>
      </div>
    </div>
  );
}
export default App;