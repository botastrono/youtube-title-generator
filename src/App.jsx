import { useState } from 'react'
import './App.css'

// Title generation patterns
const titlePatterns = [
  (topic) => `How to ${topic} in 2024 (Step-by-Step Guide)`,
  (topic) => `${topic} - Everything You Need to Know`,
  (topic) => `I Tried ${topic} for 30 Days... Here's What Happened`,
  (topic) => `The TRUTH About ${topic} Nobody Tells You`,
  (topic) => `${topic} Tutorial for Beginners (Complete Guide)`,
  (topic) => `Why ${topic} Will Change Your Life`,
  (topic) => `${topic} EXPLAINED in 10 Minutes`,
  (topic) => `Stop Making These ${topic} Mistakes!`,
  (topic) => `${topic}: Tips & Tricks You NEED to Know`,
  (topic) => `The Ultimate ${topic} Guide (Watch This First!)`,
  (topic) => `${topic} vs Everything Else - Which is BEST?`,
  (topic) => `I Spent $1000 on ${topic} So You Don't Have To`,
  (topic) => `${topic} Masterclass - From Zero to Pro`,
  (topic) => `What They Don't Tell You About ${topic}`,
  (topic) => `${topic} in 2024: Is It Worth It?`,
]

// Capitalize first letter of each word
const capitalize = (str) => {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

function App() {
  const [topic, setTopic] = useState('')
  const [titles, setTitles] = useState([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(null)

  const generateTitles = () => {
    if (!topic.trim()) return
    
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const capitalizedTopic = capitalize(topic.trim())
      
      // Shuffle and pick 5 random patterns
      const shuffled = [...titlePatterns].sort(() => Math.random() - 0.5)
      const selectedPatterns = shuffled.slice(0, 5)
      
      const newTitles = selectedPatterns.map(pattern => pattern(capitalizedTopic))
      setTitles(newTitles)
      setLoading(false)
    }, 800)
  }

  const copyToClipboard = (title, index) => {
    navigator.clipboard.writeText(title)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateTitles()
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <div className="logo">
            <span className="logo-icon">▶️</span>
            <h1>YouTube Title Generator</h1>
          </div>
          <p className="subtitle">Generate catchy, click-worthy titles for your videos</p>
        </header>

        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your video topic (e.g., 'learning python', 'home workout')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={generateTitles} 
              disabled={loading || !topic.trim()}
              className="generate-btn"
            >
              {loading ? (
                <span className="spinner">⟳</span>
              ) : (
                '✨ Generate Titles'
              )}
            </button>
          </div>
        </div>

        {titles.length > 0 && (
          <div className="results">
            <h2>Generated Titles</h2>
            <div className="titles-list">
              {titles.map((title, index) => (
                <div key={index} className="title-card">
                  <span className="title-text">{title}</span>
                  <button 
                    className={`copy-btn ${copied === index ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(title, index)}
                  >
                    {copied === index ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
              ))}
            </div>
            <button 
              className="regenerate-btn"
              onClick={generateTitles}
              disabled={loading}
            >
              🔄 Generate More
            </button>
          </div>
        )}

        <footer>
          <p>Made with ❤️ for content creators</p>
        </footer>
      </div>
    </div>
  )
}

export default App
