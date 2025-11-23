
import React, { useState, useCallback, useEffect } from 'react';
import { Wand2, Sparkles, Copy, Check, Terminal, RefreshCw, AlertCircle, Zap, Stars, Rocket, Palette, Crown, Gem } from 'lucide-react';
import { optimizePrompt } from './services/geminiService';
import { Button } from './components/Button';
import { SparklesEffect } from './components/SparklesEffect';

export default function App() {
  const [input, setInput] = useState('');
  const [optimizedOutput, setOptimizedOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);

  const handleEnhance = useCallback(async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setOptimizedOutput('');
    setCopied(false);
    setIsEnhanced(false);

    try {
      const result = await optimizePrompt(input);
      setOptimizedOutput(result);
      setIsEnhanced(true);
      
      // Trigger celebration animation
      setTimeout(() => setIsEnhanced(false), 3000);
    } catch (err) {
      setError('Failed to optimize prompt. Please check your API key or try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const handleCopy = useCallback(() => {
    if (!optimizedOutput) return;
    navigator.clipboard.writeText(optimizedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [optimizedOutput]);

  const handleClear = useCallback(() => {
    setInput('');
    setOptimizedOutput('');
    setError(null);
    setCopied(false);
    setIsEnhanced(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 selection:bg-primary-500/30 selection:text-primary-200">
      {/* Sparkles effect */}
      <SparklesEffect active={isEnhanced} />
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20 transition-all duration-300 ${isEnhanced ? 'animate-pulse scale-110' : ''}`}>
              {isLoading ? (
                <RefreshCw className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 text-white" />
              )}
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              VibeCoder
            </h1>
            <div className="hidden sm:flex items-center gap-1 ml-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-yellow-400 font-medium">Elite</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hidden sm:inline-block">AI Prompt Alchemist</span>
            <a 
              href="https://ai.google.dev/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono opacity-70">v2.0</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-grow w-full">
        
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stars className="w-6 h-6 text-yellow-500 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-bold">
              Turn ideas into <span className="text-primary-500">viral-worthy</span> apps
            </h2>
            <Stars className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Input your app concept. We'll transmute it into a mind-blowing prompt that creates 
            <span className="text-primary-400 font-medium"> extraordinary</span>, share-worthy applications.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              Lightning Fast
            </span>
            <span className="flex items-center gap-1">
              <Palette className="w-4 h-4 text-purple-500" />
              Stunning Designs
            </span>
            <span className="flex items-center gap-1">
              <Rocket className="w-4 h-4 text-blue-500" />
              Modern Tech
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Input Column */}
          <div className="flex flex-col gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="promptInput" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-500" />
                  Raw Input
                </label>
                {input && (
                  <button 
                    onClick={handleClear}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <textarea
                id="promptInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., I want a todo app that feels like a cyberpunk hacker terminal with neon effects..."
                className="w-full h-64 sm:h-96 bg-gray-950 border border-gray-800 rounded-lg p-4 text-sm sm:text-base text-gray-200 placeholder-gray-600 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none resize-none font-mono transition-all focus:shadow-lg focus:shadow-primary-500/20"
                spellCheck={false}
              />
            </div>

            <Button 
              onClick={handleEnhance} 
              disabled={isLoading || !input.trim()}
              className="w-full py-4 text-base font-semibold animate-float"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  Alchemizing...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Create Magic
                </>
              )}
            </Button>
            
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Output Column */}
          <div className="flex flex-col gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 shadow-xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-primary-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI-Optimized Output
                </span>
                <button
                  onClick={handleCopy}
                  disabled={!optimizedOutput}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    copied 
                      ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-750 hover:text-white border border-gray-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              {/* Changed: Used flex-1 to ensure it takes all available vertical space */}
              <div className="relative flex-1 min-h-[16rem] sm:min-h-0">
                {optimizedOutput ? (
                  <div className="absolute inset-0 overflow-y-auto custom-scrollbar pr-2">
                    <div className="bg-gray-950 rounded-lg border border-gray-800 p-4 min-h-full text-left">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">
                        {optimizedOutput}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 border-2 border-dashed border-gray-800 rounded-lg bg-gray-950/30">
                    {isLoading ? (
                       <div className="flex flex-col items-center gap-4">
                         <div className="relative">
                           <div className="w-3 h-3 bg-primary-500 rounded-full animate-ping absolute" />
                           <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping absolute" style={{animationDelay: '0.2s'}} />
                           <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute" style={{animationDelay: '0.4s'}} />
                         </div>
                         <div className="text-center">
                           <span className="text-sm animate-pulse text-primary-400">Transmuting your idea...</span>
                           <p className="text-xs text-gray-500 mt-1">Creating digital magic ✨</p>
                         </div>
                       </div>
                    ) : (
                      <>
                        <Gem className="w-10 h-10 mb-3 opacity-20 text-purple-500" />
                        <p className="text-sm text-center px-4">
                          Your legendary, viral-worthy prompt will appear here.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Features / Tips Grid */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { 
              title: "🎨 Visual Alchemy", 
              desc: "Transforms basic ideas into stunning, trend-setting designs that feel premium and shareable." 
            },
            { 
              title: "⚡ Interactive Magic", 
              desc: "Adds delightful micro-interactions, smooth animations, and engaging user experiences." 
            },
            { 
              title: "🚀 Elite Engineering", 
              desc: "Generates production-ready code with modern best practices and performance optimization." }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 hover:border-primary-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10">
              <h3 className="text-gray-200 font-semibold mb-1 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-950 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm font-medium">
          <div className="flex items-center justify-center gap-2">
            <span>Crafted with</span>
            <span className="text-red-500">❤️</span>
            <span>by</span>
            <span className="text-primary-500 font-semibold">Mohsen Amini</span>
            <span>•</span>
            <span className="text-yellow-500">⚡</span>
            <span>Premium Experience</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
