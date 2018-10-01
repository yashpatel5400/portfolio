import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    var memoryTable = [];
    var memory = Object.keys(this.props.memory.memory_);
    for (var i = 0; i < memory.length; i++) {
      var memoryAddr = memory[i];
      memoryTable.push(<tr style={{textAlign: 'center'}} className="source-code">
          <td>{memoryAddr}</td>
          <td>{this.props.memory.read(memoryAddr)}</td>
        </tr>);
    }

    return (
      <div>TEST</div>
    );
  }
}

export default App;
