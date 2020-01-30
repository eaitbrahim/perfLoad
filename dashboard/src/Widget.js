import React, { Component } from 'react';
import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';

class Widget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {freeMem, totalMem, usedMem, memUsage, osType, upTime, cpuModel, numCores, cpuSpeed, cpuLoad, macA} = this.state.data;
    const cpu = { cpuLoad};
    const mem = { freeMem, totalMem, usedMem, memUsage};
    const info = {macA, osType, upTime, cpuModel, numCores, cpuSpeed }

    return (
      <div>
        <Cpu cpuData = {cpu}/>
        <Mem memData = {mem}/>
        <Info info infoData = {info}/>
      </div>
    );
  }
}

export default Widget;
