import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Register from "./pages/register/Register";
import { Provider } from 'react-redux';
import store from "./redux/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
