import React, { ChangeEvent, useState } from 'react';
import Generate from './Generate';
import InputField from './InputField';
import './App.css';

interface Status {
  level: number;
  levelVisible: boolean;
  difficulty: string;
  color: string;
  title: string;
  composer: string;
  cover: string;
}
const App = () => {
  const [level, setLevel] = useState(14);
  const [levelVisible, setLevelVisible] = useState(false);
  const [difficulty, setDifficulty] = useState('　');
  const [color, setColor] = useState('#6e0db5')
  const [title, setTitle] = useState('　');
  const [composer, setComposer] = useState('　');
  const [cover, setCover] = useState(' ');
  const updateAllStates = (newState: Status) => {
    console.log('fire');
    console.log(newState);
    setLevel(newState.level);
    setLevelVisible(newState.levelVisible);
    setDifficulty(newState.difficulty);
    setColor(newState.color);
    setTitle(newState.title);
    setComposer(newState.composer);
    setCover(newState.cover);
  }
  return(
    <div>
      <InputField
        level={level}
        levelVisible={levelVisible}
        difficulty={difficulty}
        color={color}
        title={title}
        composer={composer}
        cover={cover}
        onAllStatusUpdate={updateAllStates}
      />
      <Generate
        level={level}
        levelVisible={levelVisible}
        difficulty={difficulty}
        color={color}
        title={title}
        composer={composer}
        cover={cover}
      />
    </div>
  );
}

export default App;
