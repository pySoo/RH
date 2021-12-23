import React, { useState } from "react";
import styles from "./app.module.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Calendar from "./pages/calendar/calendar";
import Home from "./pages/home/home";
import Library from "./pages/library/library";
import Report from "./pages/report/report";
import Header from "./components/header/header";
import SearchResult from "./pages/search/search";
import BookDetail from "./pages/bookDetail/bookDetail";
import Login from "./pages/login/login";
import Join from "./pages/join/join";
import Profile from "./pages/profile/profile";
import ProfileEdit from "./pages/profile/profileEdit";
import SocialLogin from "./components/socialLogin/socialLogin";
import WriteReport from "./pages/writeReport/writeReport";

const App = ({ kakaoSearch, library }) => {
  //검색어, 검색 결과 책들
  const [word, setWord] = useState("");
  const [books, setBooks] = useState([]);
  const initBooks = () => {
    setBooks([]);
  };
  const onSearch = async (query, page) => {
    setWord(query);
    await kakaoSearch
      .search(query, page) //
      .then((books) => {
        setBooks(books.data.documents);
      });
  };
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Header
          className={styles.header}
          onSearch={onSearch}
          initBooks={initBooks}
        />
        <div className={styles.pages}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/library">
              <Library library={library} kakaoSearch={kakaoSearch} />
            </Route>
            <Route exact path="/report">
              <Report />
            </Route>
            <Route exact path="/report/write">
              <WriteReport />
            </Route>
            <Route exact path="/calendar">
              <Calendar library={library} />
            </Route>
            <Route exact path="/search">
              <SearchResult query={word} books={books} onSearch={onSearch} />
            </Route>
            <Route exact path="/detail">
              <BookDetail library={library} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route
              path="/login/callback/naver/"
              render={() => <SocialLogin type="naver" />}
            />
            <Route
              path="/login/callback/kakao/"
              render={() => <SocialLogin type="kakao" />}
            />
            <Route exact path="/join">
              <Join />
            </Route>
            <Route exact path="/profile" render={() => <Profile />} />
            <Route exact path="/profile/edit" render={() => <ProfileEdit />} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
