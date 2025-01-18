import { useState } from 'react';
import { Heart, Sparkles, Shield, Activity, Moon, Sun } from 'lucide-react';
 
import { useNavigate } from 'react-router-dom';
function App() {
    const Navigate= useNavigate()
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  }); 

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('name', formData.name);
        localStorage.setItem('email', formData.email);
      Navigate('/form')
    
     setShowChat(true);
  };
 

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-rose-500 animate-pulse" />
            <span className="text-xl font-bold">HealthCare</span>
          </div>
            
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 relative">
        {!showChat ? (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-8">
              <div className="inline-block animate-fade-in">
                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-sm font-medium">
                  AI-Powered Healthcare
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Your Personal Health Assistant
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in">
                Get instant medical guidance and support through our AI-powered healthcare chat
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
                <div className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Shield className="h-8 w-8 text-rose-500 mb-2" />
                  <h3 className="font-semibold">Secure & Private</h3>
                </div>
                <div className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Activity className="h-8 w-8 text-rose-500 mb-2" />
                  <h3 className="font-semibold">24/7 Support</h3>
                </div>
                <div className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Sparkles className="h-8 w-8 text-rose-500 mb-2" />
                  <h3 className="font-semibold">Smart AI</h3>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="max-w-md mx-auto p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent transition-shadow duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent transition-shadow duration-200"
                  />
                </div>
               <div className='flex flex-row'> <button
                  type="submit"
                  className="w-full px-4 m-2 py-2 text-white bg-rose-500 hover:bg-rose-600 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                   >
                  Vision Test
                </button>
                <button
                    type="submit"
                    onClick={() => {
                      Navigate('/form')
                    }}
                  className="w-full px-4 m-2 py-2 text-white bg-rose-500 hover:bg-rose-600 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                   >
                   AI Consultation
                </button>
                  
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Chat Consultation</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome {formData.name}! How can I help you today?
                </p>
              </div>
              <div className="h-[400px] border border-gray-200 dark:border-gray-700 rounded-lg mb-4 p-4 overflow-y-auto">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2 max-w-[80%]">
                  Hello! I'm your AI health assistant. How can I assist you today?
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent transition-shadow duration-200"
                />
                <button
                  className="px-6 py-2 text-white bg-rose-500 hover:bg-rose-600 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;