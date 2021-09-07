import React, { Component } from "react";

export default class ff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: "Quần Jean",
          Price: "200$",
          brand: "Dior",
        },
        {
          name: "T-shirt",
          Price: "50$",
          brand: "Tee",
        },
      ],
    };
  }
  render() {
    let { items } = this.state;
    return (
      <div>
        <h1>Các item:</h1>
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="item__name">{item.name}</div>
            <div className="item__name">{item.Price}</div>
            <div className="item__name">{item.brand}</div>
          </div>
        ))}
      </div>
    );
  }
}
