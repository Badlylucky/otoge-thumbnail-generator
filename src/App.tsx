import React, { ChangeEvent, useState } from 'react';
import Generate from './Generate';
import './App.css';

const fileImage = new Image();
const InputField = () => {
  const [level, setLevel] = useState(14);
  const [levelVisible, setLevelVisible] = useState(false);
  const [difficulty, setDifficulty] = useState('　');
  const [color, setColor] = useState('#6e0db5')
  const [title, setTitle] = useState('　');
  const [composer, setComposer] = useState('　');
  const [cover, setCover] = useState(' ');
  const handleCheck = () => {
    setLevelVisible(!levelVisible);
  }
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newTarget = e.target.files[0];
      if (!newTarget.type.includes('image/')) {
        setCover('');
        return;
      }
      const newTargetURL = window.URL.createObjectURL(newTarget);
      setCover(newTargetURL);
      return;
    }
  };
  return(
    <div>
      <label>Difficulty: </label>
      <input type="text" placeholder="MASTER"
        onChange={(e: React.FormEvent<HTMLInputElement>) => setDifficulty(e.currentTarget.value)}>
      </input>
      <br/>
      <label>Level: </label>
      <input type="number" defaultValue={level}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setLevel(parseInt(e.currentTarget.value))}>
      </input>
      <label>visible: </label>
      <input type="checkbox" checked={levelVisible}
        onChange={handleCheck}>
      </input>
      <br/>
      <label>Color: </label>
      <input type="color" defaultValue={color}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setColor(e.currentTarget.value)}>
      </input>
      <br/>
      <label>Title: </label>
      <input type="text" placeholder="其のエメラルドを見よ"
        onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}>
      </input>
      <br/>
      <label>Composer: </label>
      <input type="text" placeholder="庭師"
        onChange={(e: React.FormEvent<HTMLInputElement>) => setComposer(e.currentTarget.value)}>
      </input>
      <br/>
      <label>Cover Image: </label>
      <input type="file" name="cover" accept="image/png, image/jpeg, image/gif"
        onChange={handleCoverChange}>
      </input>
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

export default InputField;
