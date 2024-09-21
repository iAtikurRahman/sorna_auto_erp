import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErpSignUp from './ErpSignUp';

const ErpLogIn = () => {
  const [login, setLogIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogIn() {
    try {
      let result = await fetch("/api/auth", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      result = await result.json();
      if (result.success) {
        localStorage.setItem('token', result.token);
        router.push('/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/asset/background.png')", // Adjust with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {login ? (
        <div
          className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg w-96"
          style={{ backdropFilter: 'blur(10px)', color: 'white' }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400">Forgot password?</a>
            </div>
          </div>
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700"
            onClick={handleLogIn}
          >
            Login
          </button>
          {/* New code for Sign Up link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-400">
              Do not have an account?{' '}
            </span>
            <button
              onClick={() => setLogIn(!login)}
              className="text-sm text-indigo-500 hover:text-indigo-400"
            >
              Sign up
            </button>
          </div>
        </div>
      ) : (
        <ErpSignUp />
      )}
    </div>
  );
};

export default ErpLogIn;
