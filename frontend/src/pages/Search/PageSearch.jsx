import "./PageSearch.scss";
import { useSelector } from "react-redux";
// Components
import Header from "../../components/Header/Header";
import Item from "../../components/Item/Item";
import Search from "../../components/Search/Search";
import Loading from "../../components/Loading/Loading";

const PageSearch = () => {
  const { coins, isLoading } = useSelector((store) => store.coin);

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <div className="search-box">
        <div className="search-bar">
          <h1>Search</h1>
          <div className="markets">
            <div className="tools">
              <Search />
            </div>
            {coins?.length < 1 ? (
              <h3>There are no coins !</h3>
            ) : (
              <ul className="coin-list">
                {coins &&
                  coins.map((item, index) => {
                    return <Item key={index} item={item} />;
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSearch;
