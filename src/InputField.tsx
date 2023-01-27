import React, { ChangeEvent, useEffect, useState } from 'react';
interface Status {
  level: number;
  levelVisible: boolean;
  difficulty: string;
  color: string;
  title: string;
  composer: string;
  cover: string;
  onAllStatusUpdate: (newState: Status) => void;
}
const InputField = (props: Status) => {
  const nowStatus:Status = { ...props };
  const [checked, setChecked] = useState(false);
  const changeDifficulty = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.difficulty = e.currentTarget.value;
    props.onAllStatusUpdate(nowStatus);
  }
  const changeLevel = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.level = parseInt(e.currentTarget.value);
    props.onAllStatusUpdate(nowStatus);
  }
  const changeLevelVisible = () => {
    nowStatus.levelVisible = (!nowStatus.levelVisible);
    setChecked(nowStatus.levelVisible);
    props.onAllStatusUpdate(nowStatus);
  }
  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.color = e.currentTarget.value;
    props.onAllStatusUpdate(nowStatus);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.title = e.currentTarget.value;
    props.onAllStatusUpdate(nowStatus);
  }
  const changeComposer = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.composer = e.currentTarget.value;
    props.onAllStatusUpdate(nowStatus);
  }
  const changeCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newTarget = e.target.files[0];
      if (!newTarget.type.includes('image/')) {
        nowStatus.cover = '';
        props.onAllStatusUpdate(nowStatus);
        return;
      }
      const newTargetURL = window.URL.createObjectURL(newTarget);
      nowStatus.cover = newTargetURL;
      props.onAllStatusUpdate(nowStatus);
      return;
    }
  };
  return (
    <div>
      <label>Difficulty: </label>
      <input type="text" placeholder="MASTER"
        onChange={changeDifficulty}>
      </input>
      <br/>
      <label>Level: </label>
      <input type="number" defaultValue={nowStatus.level}
        onChange={changeLevel}>
      </input>
      <label>visible: </label>
      <input type="checkbox" checked={checked}
        onChange={changeLevelVisible}>
      </input>
      <br/>
      <label>Color: </label>
      <input type="color" defaultValue={nowStatus.color}
        onChange={changeColor}>
      </input>
      <br/>
      <label>Title: </label>
      <input type="text" placeholder="其のエメラルドを見よ"
        onChange={changeTitle}>
      </input>
      <br/>
      <label>Composer: </label>
      <input type="text" placeholder="庭師"
        onChange={changeComposer}>
      </input>
      <br/>
      <label>Cover Image: </label>
      <input type="file" name="cover" accept="image/png, image/jpeg, image/gif"
        onChange={changeCoverChange}>
      </input>
    </div>
  );
}

export default InputField;