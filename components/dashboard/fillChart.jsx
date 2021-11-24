
import React from 'react';

import {
  AreaSeries,
  Crosshair,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineMarkSeries
} from 'react-vis';

const DATA = [
  [{x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 13}, {x: 4, y: 7}, {x: 5, y: null}],
  [{x: 1, y: 30}, {x: 2, y: 0}, {x: 5, y: null}, {x: 4, y: 15}, {x: 5, y: null}]
];

export default class FillChart extends React.Component {
  state = {
    crosshairValues: []
  };

  onMouseLeave = () => this.setState({crosshairValues: []});
  onNearestX = (value, {index}) =>
    this.setState({
      crosshairValues: DATA.map(d => d[index].y !== null && d[index])
    });

  render() {
    return (
        <div style={{marginLeft: -5}}>
          <XYPlot  width={430} height={250} onMouseLeave={this.onMouseLeave}>
            <XAxis />
            {/*<YAxis />*/}
            <HorizontalGridLines />
            <VerticalGridLines />
            <AreaSeries
              getNull={d => d.y !== null}
              onNearestX={this.onNearestX}
              data={DATA[0]}
            />
            <LineMarkSeries getNull={d => d.y !== null} data={DATA[1]} />
            <Crosshair values={this.state.crosshairValues} />
          </XYPlot>
        </div>
    );
  }
}