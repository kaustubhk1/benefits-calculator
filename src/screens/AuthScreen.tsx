import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { supabase } from '../utils/supabase';

export function AuthScreen() {
  const { setCurrentScreen } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        setCurrentScreen('welcome');
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        setCurrentScreen('welcome');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-accessible-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-accessible-900 mb-8 text-center">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-xl">
            <p className="text-red-800 text-xl font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xl font-bold text-accessible-900 mb-3">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-xl focus:border-accessible-primary focus:ring-4 focus:ring-indigo-200 outline-none transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-xl font-bold text-accessible-900 mb-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-xl focus:border-accessible-primary focus:ring-4 focus:ring-indigo-200 outline-none transition-colors"
              required
            />
          </div>

          <Button type="submit" className="w-full py-6 text-2xl mt-4" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Secure Sign In' : 'Secure Sign Up')}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-xl md:text-2xl font-bold text-accessible-primary hover:text-accessible-hover hover:underline p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-gray-100 text-center">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="text-xl md:text-2xl font-semibold text-gray-500 hover:text-gray-800 p-4 rounded-xl hover:bg-gray-50 transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
