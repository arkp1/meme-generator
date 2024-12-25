import React from "react";
import { useState, useEffect } from "react";
import memesData from "../memesData";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imgUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [image, setImage] = React.useState([]);

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => setImage(data.data.memes));
  }, []);

  function getRandomMeme() {
    const randomNumber = Math.floor(Math.random() * image.length);
    const newMemeUrl = image[randomNumber].url;
    console.log(newMemeUrl);
    setMeme((prevMeme) => ({
      ...prevMeme,
      imgUrl: newMemeUrl,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prev) => ({
      ...meme,
      [name]: value,
    }));
  }

  const toggleSave = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // create an image element
    const image = new Image();
    image.crossOrigin = "anonymous"; // to avoid cross-origin issues
    image.src = meme.imgUrl;

    image.onload = () => {
      // set canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // draw image to canvas
      context.drawImage(image, 0, 0);

      // add top text
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(meme.topText, canvas.width / 2, 40);

      // add bottom text
      context.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      // download the canvas as an image
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpg");
      link.download = "meme.jpg";
      link.click();
    };
  };

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            placeholder="One does not simply"
            type="text"
            className="form-input"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            placeholder="Walk into Mordor"
            type="text"
            className="form-input"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
      </div>
      <button onClick={getRandomMeme} className="button">
        Get a new meme image 🖼
      </button>
      <div className="meme">
        <span className="top">{meme.topText}</span>
        <img src={meme.imgUrl} />
        <span className="bottom">{meme.bottomText}</span>
      </div>
      <button className="save-img-btn" onClick={toggleSave}>
        Save
      </button>
    </main>
  );
}
