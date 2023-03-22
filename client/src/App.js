import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthContext } from './contexts/AuthContext';
import { NavBar } from './components/NavBar';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Create } from './components/Home/Create';
import { Edit } from './components/BidItems/Edit';
import { Main } from './components/Home/Main';
import { Catalog } from './components/BidItems/Catalog';
import { Details } from './components/BidItems/Details';
import { Profile } from './components/Home/Profile';
import { request } from './utils/bidItemUtils';
import { Logout } from './components/Auth/Logout';

function App() {
  const navigation = useNavigate();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function requestHandler() {
      const data = await request('get', '/bidItems');

      setItems(data.bidItem);
    }

    requestHandler();
  }, []);

  const onSubmitHandler = async (e, method, url, values, redirect) => {
    e.preventDefault();
    values.price = Number(values.price);

    try {
      const data = await request(method, url, values);

      setItems(state => [...state, data.biItem]);
      navigation(redirect);
    } catch (err) {
      console.log(err);
    }
  }

  const onAuthSubmit = async (e, method, url, values) => {
    e.preventDefault()
    try {
      const data = await request(method, url, values);
      setUser(data);

      navigation('/catalog');
    } catch (err) {
      console.log(err);
    }
  }

  const onLogout = () => {
    setUser({});
  }

  const context = {
    onAuthSubmit,
    onLogout,
    userId: user._id,
    token: user.accessToken,
    userEmail: user.email,
    isAuth: !!user.accessToken,
  }

  return (
    <AuthContext.Provider value={context}>
      <>
        <NavBar />

        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/catalog' element={<Catalog bidItems={items} />} />
            <Route path='/details/:itemId' element={<Details />} />
            <Route path='/create' element={<Create onSubmit={onSubmitHandler} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/edit/:itemId' element={<Edit onSubmit={onSubmitHandler} />} />
            <Route path='/delete/:itemId' element={() => console.log('deleted')} />
          </Routes>
        </main>
      </>
    </AuthContext.Provider>
  );
}

export default App;
