import React from "react";
import reactDOM from 'react-dom/client'


export default function Header() {
    return (
        <>
        <header>
          <div className="logo">
            <div className="logo-img">
              <img src="./images/Troll-Face.png" />
            </div>
            <h1>Meme Generator</h1>
          </div>
        </header>
      </>
    )
}