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
import { bidItemRequest } from './services/bidItemService';
import { authServiseFactory } from './services/authService';

function App() {
  const navigation = useNavigate();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});
  const bidItemServise = bidItemRequest(user?.accessToken);
  const authServise = authServiseFactory(user?.accessToken);

  useEffect(() => {
    async function requestHandler() {
      const data = await bidItemServise.getAll();

      setItems(data);
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

  const onCreateHandler = async (values) => {
    values.price = Number(values.price);

    try {
      const data = await bidItemServise.createItem(values);

      setItems(state => [...state, data.biItem]);
      navigation('/catalog');
    } catch (err) {
      console.log(err);
    }
  }

  const onEditHandler = async (values) => {
    values.price = Number(values.price);

    try {
      const data = await bidItemServise.editItem(values._id, values);

      setItems(state => [...state, data.biItem]);
      navigation('/catalog');
    } catch (err) {
      console.log(err);
    }
  }

  const onRegisterSubmit = async (value) => {
    if (value.password !== value.rePass) {
      console.log('Passwords missmatch');
    }

    try {
      const data = await authServise.register(value);
      setUser(data.auth);

      navigation('/catalog');
    } catch (err) {
      console.log(err);
    }
  }

  const onLoginSubmit = async (value) => {
    try {
      const data = await authServise.login(value);
      setUser(data.auth);

      navigation('/catalog');
    } catch (err) {
      console.log(err);
    }
  }

  const onLogout = async () => {
    await authServise.logout();

    setUser({});
  }

  const context = {
    onLoginSubmit,
    onRegisterSubmit,
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
            <Route path='/create' element={<Create onCreate={onCreateHandler} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/edit/:itemId' element={<Edit onEdit={onEditHandler} />} />
            <Route path='/delete/:itemId' element={() => console.log('deleted')} />
          </Routes>
        </main>
      </>
    </AuthContext.Provider>
  );
}

export default App;
