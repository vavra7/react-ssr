import React, { Component, ReactElement } from 'react';
import Layout from '../components/Layout';

class Home extends Component {
  public componentDidMount(): void {
    console.log('componentDidMount');
  }

  public render(): ReactElement {
    return (
      <Layout>
        <h1>Home</h1>
      </Layout>
    );
  }
}

export default Home;
