import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      search: '',
      showCompleted: false
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(result => {
      this.setState({data: result})
    })
  }

  itemClicked = (item) => {
    item.completed = !item.completed;
    const data = [...this.state.data];
    for(let i=0; i<data.length; i++) {
      if(item.id === data[i].id) {
        data[i] = item;
      }
    }
    this.setState({data})
  }

  onChange = (e) => {
    this.setState({ search: e.target.value});
  }
  showCompleted = (e) => {
    this.setState({ showCompleted: e.target.checked});
  }

  render() {
    const {data, search, showCompleted } = this.state;
    const loading = !data.length ? <div>Loading</div> : null;
    // Searched Data
    let filteredData = data.filter(item => {
      return item.title.indexOf(search) > -1
    })
    //Show Completed
    filteredData = filteredData.filter(item => {
      if (showCompleted) {
        return item.completed === showCompleted;
      } else {
        return true;
      }
    })
    return (
      <div className="main">
        {loading}
        <input onChange={this.onChange} className="search" placeholder="Search for TODO"/>
        {/* TODO fix checkbox alignment */}
        <div className="chckBox">Show Completed<input onChange={this.showCompleted} type="checkbox"></input></div>
        <ul>
          {filteredData.map(item => {
            const done = item.completed ? 'done' : '';
            return <li onClick={()=> this.itemClicked(item)} className={done} key = {item.id}>{item.title}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
