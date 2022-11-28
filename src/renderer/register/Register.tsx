import { ChangeEvent, useState } from 'react';

interface RegisterProps {
  register: (name: string) => void;
}

export default function Register({ register }: RegisterProps) {
  const [name, setName] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = () => {
    register(name);
  };

  return (
    <>
      <div className='grid h-screen place-items-center'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
              Chaine Twitch
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username' type='text' placeholder='Chaine twitch' onChange={onChange} />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button' onClick={onSubmit}>
              Valider
            </button>
          </div>
        </form>
      </div>
    </>);
}
