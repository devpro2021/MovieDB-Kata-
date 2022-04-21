import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { Input } from 'antd';
import './Search.css';

export default class Search extends Component {
  onSearch = (event) => {
    const { onSearchChange } = this.props;
    const trimUserRequest = event.target.value.replace(/ +/g, ' ').trim();
    if (/^\S/g.test(trimUserRequest)) {
      onSearchChange(trimUserRequest);
    }
  };

  render() {
    return (
      <Input className="search" placeholder="Type to search..." type="text" onChange={debounce(this.onSearch, 1000)} />
    );
  }
}
