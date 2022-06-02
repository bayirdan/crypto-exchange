import { Link } from "react-router-dom";

import "./Item.scss";

const Item = ({ item }) => {
  return (
    <div className="item-box">
      <Link to={`/coins/${item.id}`}>
        <li
          className={`item ${item.changePercent24Hr < 0 ? "redBg" : "greenBg"}`}
        >
          <div className="coin">{item.symbol} / USD</div>
          <div className="info">
            <span>{Number(item.priceUsd).toFixed(2)}</span>
            <span>{Number(item.changePercent24Hr).toFixed(2)} %</span>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default Item;
