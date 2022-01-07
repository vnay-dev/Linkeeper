import "./App.css";
import NavBar from "./components/Navbar";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

import UrlCard from "./components/Urlcard";
import Alert from "@mui/material/Alert";

function App() {
  const urlArray = useSelector((state) => state.UrlReducer);
  const errorState = useSelector((state) => state.ErrorReducer);
  const searchResults = useSelector((state) => state.SearchFilterReducer);

  const showSearchResults = () => {
    return searchResults.filteredList.length
      ? searchResults.filteredList.map((item) => {
          return (
            <UrlCard
              key={item.id}
              url={item.url}
              badges={item.badges}
              urlId={item.itemId}
              title={item.title}
            />
          );
        })
      : null;
  };

  const showCurrentUrls = () => {
    return urlArray.urls.length
      ? urlArray.urls.map((item) => {
          return (
            <UrlCard
              key={item.itemId}
              url={item.url}
              badges={item.badges}
              urlId={item.itemId}
              title={item.title}
            />
          );
        })
      : null;
  };

  return (
    <div>
      {errorState.visibility && (
        <Alert severity={errorState.error.type}>
          {errorState.error.message}
        </Alert>
      )}
      <NavBar />
      <div className="container">
        <Modal />
        {searchResults.searchFlag ? showSearchResults() : showCurrentUrls()}
      </div>
    </div>
  );
}

export default App;
