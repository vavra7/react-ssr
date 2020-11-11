import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: props.initialData
    };
  }

  componentDidMount() {
    console.log('componentDidMount', this.props);
  }

  onClick() {
    console.log('asdfasfdfa');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Hi there from React!</p>
          {/* {this.state.news.map((item, index) => (
            <pre key={index}>{JSON.stringify(item, null, 4)}</pre>
          ))} */}
        </header>
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}

export default App;
