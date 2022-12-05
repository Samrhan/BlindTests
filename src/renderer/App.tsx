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
  const [username, setUsername] = useState<string | undefined>(undefined);
  useEffect(() => {
    emit<string>('check-register').then((isRegistered: string) => {
      setIsRegistered(!!isRegistered);
      setUsername(isRegistered);
    });
  }, [setIsRegistered]);
  const register = (value: string) => {
    emit('register', { username: value }).then(() => {
      setIsRegistered(true);
    });
  };
  return { isRegistered, register, username };
};

export default function App() {
  const { isRegistered, register, username } = useRegister();
  const handleRegister = (value: string) => {
    register(value);
  };

  return (
    <>
      {isRegistered === true && username ? (
        <MainPage username={username}  />
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
