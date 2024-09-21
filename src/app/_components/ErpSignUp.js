import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErpLogIn from './ErpLogIn'; // Import LogIn component

const ErpSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [showLogin, setShowLogin] = useState(false); // Track if the login page should be shown
    const router = useRouter();

    async function handleSignUp() {
        try {
            let result = await fetch("http://localhost:3000/api/restaurant", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name, address, mobile })
            });
            result = await result.json();
            if (result.success) {
                const { data } = result; // Destructure data from result
                if (data) {
                    delete data.password;
                    localStorage.setItem('restaurantUser', JSON.stringify(data));
                    router.push('/erp/dashboard');
                } else {
                    console.error('Data object is null or undefined');
                }
            } else {
                alert('Restaurant not created successfully');
            }
        } catch (error) {
            console.error('Error during sign up:', error);
        }
    }

    return (
        <>
            {/* Conditional Rendering */}
            {showLogin ? (
                <ErpLogIn /> // Show the login component if showLogin is true
            ) : (
                <div
                    className="h-screen flex justify-center items-center"
                    style={{
                        backgroundImage: "url('/asset/background.png')", // Adjust with your image path
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div
                        className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg w-96"
                        style={{ backdropFilter: 'blur(10px)', color: 'white' }}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={repassword}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                onChange={(e) => setRepassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Restaurant name"
                                value={name}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Full address"
                                value={address}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Mobile number"
                                value={mobile}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700"
                            onClick={handleSignUp}
                        >
                            Signup
                        </button>
                        {/* Log In link */}
                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-400">
                                Already have an account?{' '}
                            </span>
                            <button
                                onClick={() => setShowLogin(true)} // Change state to show login
                                className="text-sm text-indigo-500 hover:text-indigo-400"
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ErpSignUp;
