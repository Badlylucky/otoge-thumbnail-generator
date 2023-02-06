import React, { useState } from 'react';
import Generate from './Generate';
import InputField from './InputField';
import { Col, Row } from 'antd';
import 'antd/dist/reset.css';
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
  const [color, setColor] = useState('rgba(142,27,229,1)');
  const [title, setTitle] = useState('　');
  const [composer, setComposer] = useState('　');
  const [cover, setCover] = useState(' ');
  const updateAllStates = (newState: Status) => {
    setLevel(newState.level);
    setLevelVisible(newState.levelVisible);
    setDifficulty(newState.difficulty);
    setColor(newState.color);
    setTitle(newState.title);
    setComposer(newState.composer);
    setCover(newState.cover);
  }
  return(
    <Row>
      <Col xs={24} sm={24} md={24} lg={12}>
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
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <Generate
          level={level}
          levelVisible={levelVisible}
          difficulty={difficulty}
          color={color}
          title={title}
          composer={composer}
          cover={cover}
        />
      </Col>
    </Row>
  );
}

export default App;
