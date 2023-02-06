import React, { ChangeEvent, useState } from 'react';
import {Switch, Input, InputNumber, Space} from 'antd';
import {CheckOutlined} from '@ant-design/icons';
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
  const changeLevelVisible = (checked: boolean) => {
    nowStatus.levelVisible = checked;
    props.onAllStatusUpdate(nowStatus);
  };
  const changeColor = (color: AnyColorFormat) => {
    nowStatus.color = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    console.log(color);
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
      <Space>
        <Input placeholder="MASTER"
          addonBefore="Difficulty"
          onChange={changeDifficulty}>
        </Input>
        <InputNumber defaultValue={nowStatus.level} placeholder="14" min={0} max={99}
          addonBefore="Level"
          addonAfter={<Switch checkedChildren={<CheckOutlined/>} onChange={changeLevelVisible}/>} 
          onChange={changeLevel}>
        </InputNumber>
      </Space>
      <label>Color: </label>
      <Colorpicker defaultValue={nowStatus.color}
        value={nowcolor}
        onChange={changeColor}>
      </Colorpicker>
      <Input placeholder="其のエメラルドを見よ"
        addonBefore="Title"
        onChange={changeTitle}>
      </Input>
      <Input placeholder="庭師"
        addonBefore="Composer"
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