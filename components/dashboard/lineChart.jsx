
import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Crosshair
} from 'react-vis';

const DATA = [
  [{x: 1, y: 10}, {x: 2, y: 7}, {x: 3, y: 15}],
  [{x: 1, y: 20}, {x: 2, y: 5}, {x: 3, y: 15}]
];

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: []
    };
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  _onNearestX = (value, {index}) => {
    this.setState({crosshairValues: DATA.map(d => d[index])});
  };

  render() {
    return (
        <div style={{marginLeft: -5}}>
              <XYPlot onMouseLeave={this._onMouseLeave} width={710} height={333}>
                {/*<VerticalGridLines />*/}
                {/*<HorizontalGridLines />*/}
                <XAxis />
                {/*<YAxis />*/}
                <LineSeries onNearestX={this._onNearestX} data={DATA[0]} />
                <LineSeries data={DATA[1]} />
                <Crosshair
                  values={this.state.crosshairValues}
                  className={'test-class-name'}
                />
              </XYPlot>
        </div>
    );
  }
}