import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import dayjs from 'dayjs'
export const CascaderSlect = ({ options, onChange }) => {
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    setOptionsData([...options]);
  }, [options]);
  return (
    <Cascader
      options={optionsData}
      loadData={loadData}
      changeOnSelect
    />
  )
  function loadData(selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      setOptionsData([...options]);
      onChange && onChange();
    }, 1000);
  };
};

// const formatTimer = value => (value < 10 ? `0${value}` : value);

let timer;
export const Timer = () => {
  // const [minute, setMinute] = useState(0);
  // const [second, setSecond] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  // useEffect(() => {
  //   if (minute === 60) {
  //     clearTimeout(timer);
  //   } else if (second === 60) {
  //     setSecond(0);
  //     setMinute(minute => minute + 1);
  //   } else {
  //     timer = setTimeout(() => setSecond(second => second + 1), 1000);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [minute, second]);
  useEffect(() => {
    if (timestamp === 60 * 60 * 1000) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => setTimestamp(timestamp => timestamp + 1000), 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [timestamp]);
  return (
    // <div style={{ color: minute >= 1 ? 'red' : 'green' }}>
    //   <span>{formatTimer(minute)}</span> : <span>{formatTimer(second)}</span>
    // </div>
    <div style={{ color: timestamp >= 60 * 1000 ? 'red' : 'green' }}>
      <span>{dayjs(timestamp).format('mm:ss')}</span>
    </div>
  );
}

const Index = () => {
  const options = [
    {
      value: 'he_cheng',
      label: '合成域',
      isLeaf: false,
    },
    {
      value: '花呗域',
      label: 'hua_bei',
      isLeaf: false,
    },
  ];
  return (
    <>
      <Timer />
      <CascaderSlect options={options} />
    </>
  )
}
export default Index;
