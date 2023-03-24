import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthContext } from './contexts/AuthContext';
import { validateFields, validateRegisterPasswords } from './utils/validateFields';
import { NavBar } from './components/NavBar';
import { Main } from './components/Home/Main';
import { Create } from './components/Home/Create';
import { Profile } from './components/Home/Profile';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { Logout } from './components/Auth/Logout';
import { Catalog } from './components/BidItems/Catalog';
import { Edit } from './components/BidItems/Edit';
import { DeleteItem } from './components/BidItems/DeleteItem';
import { Details } from './components/BidItems/Details';
import { bidItemRequest } from './services/bidItemService';
import { authServiseFactory } from './services/authService';

function App() {
  const navigation = useNavigate();
  const [error, setError] = useState(null);
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
  }, [items, bidItemServise]);

  const onCreateHandler = async (values) => {
    try {
      validateFields(values);
      values.price = Number(values.price);
      values.author = user._id;
      
      const data = await bidItemServise.createItem(values);
      user.posters.push(data._id);
      await authServise.update(user._id, user);

      setItems(state => [...state, data]);
      navigation('/catalog');
    } catch (err) {
      errorHandler(err);
    }
  }

  const onEditHandler = async (values) => {
    try {
      validateFields(values);

      values.price = Number(values.price);
      const data = await bidItemServise.editItem(values._id, values);

      setItems(state => state.map(x => x._id === data._id ? data : x));
      navigation('/catalog');
    } catch (err) {
      errorHandler(err);
    }
  }

  const onDeleteHandler = async (id) => {
    try {
      await bidItemServise.deleteItem(id);

      setItems(state => state.filter(x => x._id !== id));
    } catch (err) {
      errorHandler(err);
    }
  }

  const onRegisterSubmit = async (value) => {
    try {
      validateFields(value);
      validateRegisterPasswords(value);

      const data = await authServise.register(value);
      setUser(data.auth);

      navigation('/catalog');
    } catch (err) {
      errorHandler(err);
    }
  }

  const onLoginSubmit = async (value) => {
    try {
      validateFields(value);

      const data = await authServise.login(value);
      setUser(data.auth);

      navigation('/catalog');
    } catch (err) {
      errorHandler(err);
    }
  }

  const onLogout = async () => {
    await authServise.logout();

    setUser({});
  }

  const errorHandler = async (err) => {
    setError(err.message);

    setTimeout(() => {
      setError(null);
    }, 2000)
  }

  const context = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: user._id,
    token: user.accessToken,
    userEmail: user.email,
    userPosts: user.posters,
    userName: user.name,
    isAuth: !!user.accessToken,
  }

  return (
    <AuthContext.Provider value={context}>
      <>
        <NavBar />

        <main>

          {error ?
            <>
              <div className="errorContainer">
                <p>{error}</p>
              </div>
            </> :
            <></>
          }

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
            <Route path='/delete/:itemId' element={<DeleteItem onDelete={onDeleteHandler} />} />
          </Routes>
        </main>
      </>
    </AuthContext.Provider>
  );
}

export default App;
