import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="font-bold text-xl">Job Tracker</h1>
      <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </nav>
  );
}
