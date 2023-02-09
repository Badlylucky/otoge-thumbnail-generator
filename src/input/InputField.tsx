import React, { ChangeEvent, useState } from 'react';
import {Switch, Input, InputNumber, Space, Row, Col, Upload, UploadProps, UploadFile} from 'antd';
import {CheckOutlined} from '@ant-design/icons';
import {UploadRequestOption as RcCustomRequestOptions} from 'rc-upload/lib/interface';
import {Colorpicker, AnyColorFormat} from 'antd-colorpicker';
import 'antd/dist/reset.css';
import assert from 'assert';

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
    r: 142,
    g: 27,
    b: 229,
    a: 1,
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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
  const customRequest = (option: RcCustomRequestOptions) => {
    try {
      assert(option.onProgress);
      option.onProgress({percent: 0});
      if (option?.file instanceof File) {
        const newTarget = option.file;
        if (!newTarget.type.includes('image/')) {
          nowStatus.cover = '';
          props.onAllStatusUpdate(nowStatus);
          return;
        }
        const newTargetURL = window.URL.createObjectURL(newTarget);
        nowStatus.cover = newTargetURL;
        props.onAllStatusUpdate(nowStatus);
        setTimeout(() => {
          assert(option.onProgress);
          assert(option.onSuccess);
          option.onProgress({percent: 100});
          option.onSuccess("ok");
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };
  const changeCoverChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <Row gutter={[0, 2]}>
      <Col span={12}>
        <Input style={{width: 'calc(100% - 24px)'}} 
          placeholder="MASTER"
          addonBefore="Difficulty"
          onChange={changeDifficulty}>
        </Input>
      </Col>
      <Col span={12}>
        <InputNumber style={{width: 'calc(75% - 24px)'}} 
          defaultValue={nowStatus.level} placeholder="14" min={0} max={99}
          addonBefore="Level"
          addonAfter={<Switch checkedChildren={<CheckOutlined/>} onChange={changeLevelVisible}/>} 
          onChange={changeLevel}>
        </InputNumber>
      </Col>
      <Col span={24}>
        <Colorpicker defaultValue={nowStatus.color}
          popout
          value={nowcolor}
          onChange={changeColor}
          presetColors={['#00ab84', '#ff7e00', '#f12929', '#8e1be5', '#16ff47', '#ffba00', '#fa0667', '#a810ff']}>
        </Colorpicker>
      </Col>
      <Col span={24}>
        <Input style={{width: 'calc(100% - 24px)'}}
          placeholder="其のエメラルドを見よ"
          addonBefore="Title"
          onChange={changeTitle}>
        </Input>
      </Col>
      <Col span={24}>
        <Input style={{width: 'calc(100% - 24px)'}}
          placeholder="庭師"
          addonBefore="Composer"
          onChange={changeComposer}>
        </Input>
      </Col>
      <Col span={24}>
        {/* <label>Cover Image: </label>
        <input type="file" name="cover" accept="image/png, image/jpeg, image/gif"
          onChange={changeCoverChange}>
        </input> */}
        <Upload
          accept='image/*'
          listType='picture-card'
          fileList={fileList}
          onChange={changeCoverChange}
          customRequest={customRequest}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </Col>
    </Row>
  );
}

export default InputField;