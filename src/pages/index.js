/* Pagina inicial */
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../hooks/AuthContext';

export default function Home() {
  const {loading, loginUser,auth} = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(!username || !password){
      toast.error("Todos los campos son obligatorios")
      return
    }
    if(username.length < 3 || password.length < 3){
      toast.error("El minimo permitido es de 3 caracteres")
      return
    }
    //login
    loginUser(username, password)
    
    
  };

  return (
    <>
      {!loading && !auth && (
        <div className='flex h-full w-full items-center justify-center'>
          <div className='p-10 rounded-2xl w-1/3  bg-slate-200 shadow-xl shadow-black'>
            <h1 className='text-center text-4xl font-mono font-semibold text-green-900 tracking-wider'>Iniciar Sesión</h1>
            <form className='mt-10' onSubmit={handleSubmit}>
              <div className='flex'>
                <input
                  type='text'
                  id='username'
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder='Nombre de Usuario'
                  className='flex-1 h-11 p-5 rounded-lg shadow-lg shadow-inner text-xl font-mono'
                />
              </div>
              <div className='flex mt-10'>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Contraseña'
                  className='flex-1 h-11 p-5 rounded-lg shadow-lg shadow-inner text-xl font-mono'
                />
              </div>
              <div className='mt-20 p-10'>
                <button type='submit' className='w-full bg-green-700 hover:bg-green-900 h-12 rounded-xl text-xl text-white font-mono font-bold shadow-lg shadow-black' onClick={handleSubmit}>Iniciar sesión</button>
              </div>
            </form>
          </div>
            
        </div>
      )}
    </>
  )
  
}

