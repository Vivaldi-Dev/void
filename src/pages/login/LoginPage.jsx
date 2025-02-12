import React, { useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, error, data, handleLogin } = useLogin();
    
    useEffect(() => {
        if (data) {
            navigate('/dashboard');
        }
    }, [data, navigate]); // Navegar assim que 'data' for atualizado

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading}
                        >
                            {loading ? (
                                <svg
                                    role="status"
                                    className="w-5 h-5 text-blue-800 animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5C100 78.4 78.4 100 50 100C21.6 100 0 78.4 0 50.5C0 22.6 21.6 1 50 1C78.4 1 100 22.6 100 50.5ZM91 50.5C91 72.6 72.6 91 50 91C27.4 91 9 72.6 9 50.5C9 28.4 27.4 9 50 9C72.6 9 91 28.4 91 50.5Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {data && (
                        <div className="text-green-500 text-sm">
                            Login successful! Welcome, {data.user.fullname}.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
