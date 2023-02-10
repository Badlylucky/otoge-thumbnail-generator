import React from 'react';
import './card.css';

interface Status {
  level: number;
  levelVisible: boolean;
  difficulty: string;
  color: string;
  title: string;
  composer: string;
  cover: string;
}
const Generate = (props: Status) => {
  return (
    <div className="parent">
      <div className="card-frame" style={{backgroundColor: props.color}}>
        <div className="card-upper-sect">
          <img src={props.cover} alt=""/>
        </div>
        <div className="card-middle-sect">
          <div className="level-container" style={{display: props.levelVisible ? 'block' : 'none'}}>
            <div className="header">
              <span>LEVEL</span>
            </div>
            <div className="level-number">
              <span>{props.level}</span>
            </div>
          </div>
          <span className="diff-container">
            <span>{props.difficulty}</span>
          </span>
        </div>
        <div className="card-bottom-sect">
          <div className="song-details">
            <div className="title">{props.title}</div>
            <div className="info">{props.composer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generate;