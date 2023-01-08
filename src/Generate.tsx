import React, { useState } from 'react';
import PlayWright from 'playwright';

type Props = {
  level: number
  levelVisible: boolean
  difficulty: string
  color: string
  title: string
  composer: string
  cover: File | undefined
}
const generateHTML = (props: Props) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cabin">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Yantramanav">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Zen+Kaku+Gothic+Antique">
    <link rel="stylesheet" href="./chunithm.css">
  </head>
  <body>
    <div class="parent">
      <div class="card-frame">
        <div class="card-upper-sect">
          <img src="${props.cover}">
        </div>
        <div class="card-middle-sect">
          <div class="level-container" style="display: ${props.levelVisible ? 'block' : 'none'}">
            <div class="header">
              <span>LEVEL</span>
            </div>
            <div class="level-number">
              <span>${props.level}</span>
            </div>
          </div>
          <span class="diff-container">
            <span>${props.difficulty}</span>
          </span>
        </div>
        <div class="card-bottom-sect">
          <div class="song-details">
            <div class="title">${props.title}</div>
            <div class="info">${props.composer}</div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
    `
}
const Generate = (props: Props) => {
  const [genImage, setGenImage] = useState('');
  const generateImage = async (htmlsrc : string) => {
    const browser = await PlayWright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setContent(htmlsrc);
    const result = await page.locator('#card-frame').screenshot();
    return result.toString('base64');
  }
  const submitAction = () => {
    const src = 'data:image/png;base64,' + generateImage(generateHTML(props));
    setGenImage(src);
  }
  return (
    <>
      <button onClick={submitAction}>submit</button>
      <br/>
      <h3>result</h3>
      <img src={genImage}></img>
    </>
  );
}

export default Generate;