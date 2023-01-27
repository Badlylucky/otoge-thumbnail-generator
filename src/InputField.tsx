import React, { ChangeEvent, useState } from 'react';
import {Checkbox, Input, InputNumber} from 'antd';
import {Colorpicker, AnyColorFormat} from 'antd-colorpicker';
import 'antd/dist/reset.css';

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
  const [nowcolor, setNowcolor] = useState<AnyColorFormat>({
    r: 110,
    g: 13,
    b: 181,
    a: 1,
  });
  const changeDifficulty = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.difficulty = e.currentTarget.value;
    props.onAllStatusUpdate(nowStatus);
  };
  const changeLevel = (value: number | null) => {
    nowStatus.level = value ?? 0;
    props.onAllStatusUpdate(nowStatus);
  };
  const changeLevelVisible = () => {
    nowStatus.levelVisible = (!nowStatus.levelVisible);
    setChecked(nowStatus.levelVisible);
    props.onAllStatusUpdate(nowStatus);
  };
  const changeColor = (color: AnyColorFormat) => {
    nowStatus.color = color.hex;
    setNowcolor(color);
    props.onAllStatusUpdate(nowStatus);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.title = e.currentTarget.value;
    props.onAllStatusUpdate(nowStatus);
  };
  const changeComposer = (e: ChangeEvent<HTMLInputElement>) => {
    nowStatus.composer = e.currentTarget.value;
    props.onAllStatusUpdate(nowStatus);
  };
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
      <Input placeholder="MASTER"
        onChange={changeDifficulty}>
      </Input>
      <br/>
      <label>Level: </label>
      <InputNumber defaultValue={nowStatus.level} min={0} max={99}
        addonBefore="Level" 
        onChange={changeLevel}>
      </InputNumber>
      <label>visible: </label>
      <input type="checkbox" checked={checked}
        onChange={changeLevelVisible}>
      </input>
      <br/>
      <label>Color: </label>
      <Colorpicker defaultValue={nowStatus.color}
        value={nowcolor}
        onChange={changeColor}>
      </Colorpicker>
      <br/>
      <label>Title: </label>
      <Input placeholder="其のエメラルドを見よ"
        onChange={changeTitle}>
      </Input>
      <br/>
      <label>Composer: </label>
      <Input placeholder="庭師"
        onChange={changeComposer}>
      </Input>
      <br/>
      <label>Cover Image: </label>
      <input type="file" name="cover" accept="image/png, image/jpeg, image/gif"
        onChange={changeCoverChange}>
      </input>
    </div>
  );
}

export default InputField;