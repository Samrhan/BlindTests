import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Register from './register/Register';
import emit from './utils/event-emiter';
import LoadingAnimation from './utils/components/LoadingAnimation';

const Hello = () => {
  return (
    <div className="absolute inset-0 bg-white text-center h-full flex flex-col justify justify-center">
      ERB + TAILWIND = ❤
    </div>
  );
};

const useRegister = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    emit<boolean>('check-register').then((isRegistered: boolean) => {
      setIsRegistered(isRegistered);
    });
  }, [setIsRegistered]);
  const register = (value: string) => {
    emit('register', { username: value }).then(() => {
      setIsRegistered(true);
    });
  };
  return { isRegistered, register };
};

export default function App() {
  const { isRegistered, register } = useRegister();
  const handleRegister = (value: string) => {
    register(value);
  };

  return (
    <>
      {isRegistered === true ? (
        <Router>
          <Routes>
            <Route path="/" element={<Hello />} />
          </Routes>
        </Router>
      ) : isRegistered === false ? (
        <>
          <Register register={handleRegister}></Register>
        </>
      ) : (
        <LoadingAnimation></LoadingAnimation>
      )}
      ;
    </>
  );
}
