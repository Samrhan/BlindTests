import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Register from './register/Register';

const Hello = () => {
  return (
    <div className='absolute inset-0 bg-white text-center h-full flex flex-col justify justify-center'>
      ERB + TAILWIND = ❤
    </div>
  );
};

const useRegister = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('check-register', []);
    window.electron.ipcRenderer.once('check-register-reply', (arg) => {
      setIsRegistered(arg as boolean);
    });
  }, [setIsRegistered]);
  const register = (value: string) => {
    window.electron.ipcRenderer.sendMessage('register', [value]);
    window.electron.ipcRenderer.once('register-reply', () => {
      setIsRegistered(true);
    });
  };
  return { isRegistered, register };
};

export default function App() {
  const { isRegistered, register } = useRegister();
  const handleRegister = (value: string) => {
    console.log(value);
    register(value);
  };
  return (
    <>
      {isRegistered ? (
        <Router>
          <Routes>
            <Route path='/' element={<Hello />} />
          </Routes>
        </Router>
      ) : (
        <>
          <Register register={handleRegister}></Register>
        </>
      )};
    </>);
}
