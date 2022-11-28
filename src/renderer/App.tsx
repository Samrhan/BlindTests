import './App.css';
import { useEffect, useState } from 'react';
import Register from './register/Register';
import emit from './utils/event-emiter';
import LoadingAnimation from './utils/components/LoadingAnimation';
import MainPage from './main/MainPage';

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
        <MainPage />
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
