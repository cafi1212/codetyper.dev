import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Keyboard, 
  Award, 
  History, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  TrendingUp, 
  ChevronRight,
  Monitor,
  Zap
} from 'lucide-react';
import { SNIPPETS, Snippet } from './snippets';
import { HistoryItem } from './types';

// Web Audio API click synthesis
const playKeySound = (soundType: 'clicky' | 'thocky' | 'mechanical' | 'none') => {
  if (soundType === 'none') return;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    
    if (soundType === 'clicky') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      const pitchShift = Math.random() * 200 - 100;
      osc.frequency.setValueAtTime(1100 + pitchShift, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (soundType === 'thocky') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      const pitchShift = Math.random() * 30 - 15;
      osc.frequency.setValueAtTime(170 + pitchShift, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.07);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (soundType === 'mechanical') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      const pitchShift = Math.random() * 100 - 50;
      osc.frequency.setValueAtTime(550 + pitchShift, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.05);
      
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch (err) {
    // Fail silently to prevent console spam
  }
};

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [selectedLength, setSelectedLength] = useState<'short' | 'mid' | 'long'>('mid');
  
  // Available list matching the criteria
  const filteredSnippets = useMemo(() => {
    return SNIPPETS.filter(
      s => s.language.toLowerCase() === selectedLanguage.toLowerCase() && s.length === selectedLength
    );
  }, [selectedLanguage, selectedLength]);

  // Current snippet index in filtered list
  const [snippetIndex, setSnippetIndex] = useState<number>(0);
  
  // Active snippet we are typing
  const currentSnippet: Snippet = useMemo(() => {
    if (filteredSnippets.length === 0) {
      // Fallback in case of no match
      return {
        id: 'fallback',
        language: selectedLanguage,
        length: selectedLength,
        name: 'helloWorld',
        code: `console.log("Hello, World!");`
      };
    }
    // Safeguard index bounds
    const idx = snippetIndex % filteredSnippets.length;
    return filteredSnippets[idx];
  }, [filteredSnippets, snippetIndex, selectedLanguage, selectedLength]);

  // TYPING ENGINE STATE
  const [userInput, setUserInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  // Performance indicators
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  
  // Real-time graph points: array of numbers representing WPM at each second
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  
  // Audio configuration
  const [soundType, setSoundType] = useState<'clicky' | 'thocky' | 'mechanical' | 'none'>('thocky');
  
  // Storage of local records
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Inputs refs
  const hiddenInputRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('codetyper_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed reading history:', e);
      }
    }
  }, []);

  // Sync state parameters to reset typing box on parameter change
  useEffect(() => {
    resetTyping();
  }, [selectedLanguage, selectedLength, snippetIndex]);

  // Handle timer tick for speedtyper calculations
  useEffect(() => {
    let interval: any = null;
    if (startTime !== null && !isCompleted) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setTimeSec(elapsed);
        
        // Push a history node for the speed curve (every 1 second)
        const currentWpm = calculateWpm(userInput.length, elapsed);
        setWpmHistory(prev => {
          const secCell = Math.floor(elapsed);
          const next = [...prev];
          if (next[secCell] === undefined) {
            next[secCell] = currentWpm;
          } else {
            next[secCell] = Math.max(next[secCell], currentWpm);
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [startTime, isCompleted, userInput]);

  // Focus utility
  const forceFocus = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
      setIsFocused(true);
    }
  };

  // Keyboard action handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isCompleted) {
      e.preventDefault();
      return;
    }

    const { key } = e;
    
    // Ignore meta keys
    if (e.metaKey || e.altKey || e.ctrlKey) {
      return;
    }

    // Capture standard letters, enter, space, block tab
    if (key === 'Tab') {
      e.preventDefault(); // Do not focus away!
      handleCharInput('\t');
      return;
    }

    if (key === 'Enter') {
      e.preventDefault();
      handleCharInput('\n');
      return;
    }
  };

  // Handle textual change in textarea (the core typing capturer)
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isCompleted) return;
    
    const value = e.target.value;
    const previousLength = userInput.length;
    const newLength = value.length;
    
    if (newLength < previousLength) {
      // BACKSPACE event
      handleBackspace();
      return;
    }

    // A character or characters was added. Find the new character typed.
    const typedChar = value[value.length - 1];
    handleCharInput(typedChar);
  };

  const handleCharInput = (char: string) => {
    if (isCompleted) return;

    // Start timer on first keystroke
    let activeStartTime = startTime;
    if (startTime === null) {
      activeStartTime = Date.now();
      setStartTime(activeStartTime);
    }

    const expectedIndex = userInput.length;
    const expectedChar = currentSnippet.code[expectedIndex];

    // Play synthesized mechanical key click
    playKeySound(soundType);

    setTotalKeystrokes(prev => prev + 1);

    // Track accuracy mismatches
    if (char !== expectedChar) {
      setErrorsCount(prev => prev + 1);
    }

    // Append standard character input
    let updatedInput = userInput + char;

    // AUTO-INDENT SKIP logic for developers:
    // If we just completed typing a line-break '\n', check if the snippet code
    // immediately continues with leading indentation (spaces). If so, we safely
    // skip and auto-inject them so they are automatically positioned line-wise!
    if (char === '\n' && expectedChar === '\n') {
      let nextIdx = updatedInput.length;
      let indentSnippet = '';
      while (
        nextIdx < currentSnippet.code.length && 
        (currentSnippet.code[nextIdx] === ' ' || currentSnippet.code[nextIdx] === '\t')
      ) {
        indentSnippet += currentSnippet.code[nextIdx];
        nextIdx++;
      }
      if (indentSnippet.length > 0) {
        updatedInput += indentSnippet;
      }
    }

    setUserInput(updatedInput);

    // Verify Completion
    if (updatedInput.length >= currentSnippet.code.length) {
      completeTest(updatedInput, activeStartTime);
    }
  };

  // Handle Backspace backtracking correctly
  const handleBackspace = () => {
    if (userInput.length === 0) return;

    let deleteCount = 1;
    // Backtracking over auto-indentations:
    // If the trailing segment is spaces up to the preceding newline, 
    // delete all of those preceding spaces AND the newline in a single hit!
    if (userInput.endsWith(' ')) {
      const lastNewlineIdx = userInput.lastIndexOf('\n');
      if (lastNewlineIdx !== -1) {
        const trailingSlice = userInput.slice(lastNewlineIdx + 1);
        if (/^[ ]*$/.test(trailingSlice)) {
          deleteCount = trailingSlice.length + 1;
        }
      }
    }

    setUserInput(prev => prev.slice(0, -deleteCount));
    setTotalKeystrokes(prev => prev + 1);
  };

  // Complete the evaluation and store records
  const completeTest = (finalInput: string, customStart: number | null) => {
    setIsCompleted(true);
    const finishTime = Date.now();
    const elapsed = customStart ? (finishTime - customStart) / 1000 : timeSec;
    const finalSec = elapsed > 0 ? elapsed : 0.1;

    // Calculate accuracy %
    const finalAccuracy = calculateAccuracy(finalInput, currentSnippet.code);
    const finalWpm = calculateWpm(finalInput.length, finalSec);

    // Capture speed history stats if empty
    let finalWpmHistory = [...wpmHistory];
    if (finalWpmHistory.length === 0) {
      finalWpmHistory = [finalWpm];
    }

    // Append to local database record
    const historyItem: HistoryItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      snippetId: currentSnippet.id,
      snippetName: currentSnippet.name,
      language: currentSnippet.language,
      length: currentSnippet.length,
      wpm: finalWpm,
      accuracy: finalAccuracy,
      timeSec: parseFloat(finalSec.toFixed(1)),
      timestamp: Date.now()
    };

    const newHistory = [historyItem, ...history].slice(0, 100); // Max 100 records
    setHistory(newHistory);
    localStorage.setItem('codetyper_history', JSON.stringify(newHistory));
  };

  // Clean values resetter
  const resetTyping = () => {
    setUserInput('');
    setStartTime(null);
    setTimeSec(0);
    setErrorsCount(0);
    setTotalKeystrokes(0);
    setIsCompleted(false);
    setWpmHistory([]);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = '';
    }
  };

  const getAnotherSnippet = () => {
    if (filteredSnippets.length <= 1) {
      // Just reset the current one
      resetTyping();
    } else {
      // Cycle with random or sequential offset
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * filteredSnippets.length);
      } while (nextIdx === snippetIndex && filteredSnippets.length > 1);
      
      setSnippetIndex(nextIdx);
    }
  };

  const clearHistoryLog = () => {
    if (window.confirm('Are you sure you want to clear your local typing practice stats?')) {
      setHistory([]);
      localStorage.removeItem('codetyper_history');
    }
  };

  // Metric calculation equations
  const calculateWpm = (typedCount: number, elapsedSec: number) => {
    if (elapsedSec <= 0) return 0;
    // Standard metric: 5 characters typed equals 1 word
    const words = typedCount / 5;
    const mins = elapsedSec / 60;
    return Math.round(words / mins);
  };

  const calculateAccuracy = (typed: string, source: string) => {
    if (typed.length === 0) return 100;
    let correct = 0;
    const minLength = Math.min(typed.length, source.length);
    for (let i = 0; i < minLength; i++) {
      if (typed[i] === source[i]) {
        correct++;
      }
    }
    return Math.round((correct / typed.length) * 100);
  };

  // Computed metrics for real-time reporting
  const currentWpm = startTime ? calculateWpm(userInput.length, timeSec) : 0;
  const currentAccuracy = calculateAccuracy(userInput, currentSnippet.code);

  // Divide code by lines for responsive styling without breaks & accurate lines counting
  const renderLines = useMemo(() => {
    const rawLines = currentSnippet.code.split('\n');
    let absoluteIndexOffset = 0;

    return rawLines.map((lineContent, lineIdx) => {
      const isLastLine = lineIdx === rawLines.length - 1;
      const charactersList: { char: string; absIdx: number; isNewlineMark: boolean }[] = [];
      
      // Map normal characters
      for (let i = 0; i < lineContent.length; i++) {
        charactersList.push({
          char: lineContent[i],
          absIdx: absoluteIndexOffset + i,
          isNewlineMark: false
        });
      }

      // Add trailing newline indicator representation
      if (!isLastLine) {
        charactersList.push({
          char: '\n',
          absIdx: absoluteIndexOffset + lineContent.length,
          isNewlineMark: true
        });
      }

      // Increment running offset (+1 for newline character accounted in splitting)
      absoluteIndexOffset += lineContent.length + (isLastLine ? 0 : 1);

      return {
        lineIdx: lineIdx + 1,
        chars: charactersList
      };
    });
  }, [currentSnippet.code]);

  // Generate an automatic SVG speed-timeline dynamic path for graph render
  const generateChartPath = () => {
    const dataPoints = wpmHistory.filter(v => v !== undefined);
    if (dataPoints.length <= 1) return { line: '', area: '' };

    const width = 500;
    const height = 120;
    const padding = 10;
    
    const maxVal = Math.max(...dataPoints, 60); // min height scales to 60 wpm
    const minVal = 0;
    const range = maxVal - minVal;

    const points = dataPoints.map((val, idx) => {
      const x = padding + (idx / (dataPoints.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
      return { x, y };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${height - padding} L ${points[0].x.toFixed(1)} ${height - padding} Z`;
    
    return { line: linePath, area: areaPath, points };
  };

  const chartVisuals = generateChartPath();

  return (
    <div id="codetyper-root" className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* HEADER NAVBAR */}
      <header id="app-header" className="border-b border-zinc-900 bg-[#0a0a0d]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/10 border border-blue-500/20 p-2 rounded-lg text-blue-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                codetyper<span className="text-blue-500 font-medium text-sm">.dev</span>
              </h1>
              <p className="text-xs text-zinc-500">Programmer's Speedtyping Dojo</p>
            </div>
          </div>

          {/* AUDIO SELECT SWITCHER */}
          <div className="flex items-center gap-2 bg-[#121216] border border-zinc-800/80 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-zinc-500 flex items-center gap-1">
              {soundType === 'none' ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              SFX:
            </span>
            <div className="flex gap-1">
              {(['thocky', 'clicky', 'mechanical', 'none'] as const).map(t => (
                <button
                  key={t}
                  id={`sfx-btn-${t}`}
                  onClick={() => {
                    setSoundType(t);
                    playKeySound(t);
                  }}
                  className={`px-2 py-0.5 rounded capitalize transition-all ${
                    soundType === t 
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {t === 'none' ? 'off' : t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* CORE WRAPPER */}
      <main id="main-container" className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        
        {/* SELECT FILTERS HEADER & RESET (Row EXACTLY matching screenshot layout) */}
        <div id="controls-panel" className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 max-w-4xl mx-auto w-full">
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3 bg-[#0d0d11] p-1.5 rounded-xl border border-zinc-800/60 shadow-xl">
            {/* Languages filter */}
            {['JavaScript', 'TypeScript', 'HTML', 'Java', 'Rust', 'Kotlin', 'Zig'].map(lang => {
              const isActive = selectedLanguage.toLowerCase() === lang.toLowerCase();
              return (
                <button
                  key={lang}
                  id={`lang-btn-${lang}`}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`text-sm py-1.5 px-4 rounded-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {lang}
                </button>
              );
            })}

            {/* Vertical separator */}
            <div className="h-6 w-[1px] bg-zinc-800 mx-2 hidden sm:block"></div>

            {/* Length options */}
            {(['short', 'mid', 'long'] as const).map(len => {
              const isActive = selectedLength === len;
              return (
                <button
                  key={len}
                  id={`len-btn-${len}`}
                  onClick={() => setSelectedLength(len)}
                  className={`text-sm py-1.5 px-4 rounded-lg font-medium transition-all capitalize ${
                    isActive 
                      ? 'bg-[#10b981] text-white shadow-lg shadow-emerald-500/15'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {len}
                </button>
              );
            })}
          </div>

          {/* Quick Stats/Actions */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 border border-zinc-800/50 bg-zinc-900/20 px-3 py-1.5 rounded-lg select-none">
              Snippet: <span className="text-zinc-300 font-mono">{currentSnippet.name}.{selectedLanguage === 'HTML' ? 'html' : selectedLanguage === 'Rust' ? 'rs' : selectedLanguage === 'Java' ? 'java' : selectedLanguage === 'Kotlin' ? 'kt' : selectedLanguage === 'Zig' ? 'zig' : 'ts'}</span>
            </span>

            {/* Cycler/Restart Button */}
            <button
              id="refresh-snippet-btn"
              onClick={getAnotherSnippet}
              title="Change Snippet / Restart"
              className="p-2 bg-[#121216] border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40 text-zinc-400 hover:text-white rounded-lg transition-all shadow-md flex items-center justify-center cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* METRICS ROW (Exactly centered labels, bold and bright numbers) */}
        {!isCompleted && (
          <div id="stats-summary-row" className="flex items-center justify-center gap-8 md:gap-12 mb-8 text-sm tracking-wide font-mono text-zinc-500">
            <div>
              wpm: <span className="text-xl font-bold text-white tracking-normal ml-1">{currentWpm}</span>
            </div>
            <div>
              accuracy: <span className="text-xl font-bold text-white tracking-normal ml-1">{currentAccuracy}%</span>
            </div>
            <div>
              time: <span className="text-xl font-bold text-white tracking-normal ml-1">{timeSec.toFixed(1)}s</span>
            </div>
            <div>
              errors: <span className="text-xl font-bold text-red-500 tracking-normal ml-1">{errorsCount}</span>
            </div>
          </div>
        )}

        {/* PRACTICE GAME CONTAINER */}
        {!isCompleted ? (
          <div className="max-w-4xl mx-auto w-full relative">
            
            {/* HIDDEN CONTROL TEXTAREA */}
            <textarea
              ref={hiddenInputRef}
              id="keyboard-listener"
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
              className="absolute pointer-events-none opacity-0 w-0 h-0"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              value={userInput}
            />

            {/* TYPING EDITOR SHELL (macOS Window style) */}
            <div 
              ref={terminalRef}
              id="editor-window"
              onClick={forceFocus}
              className={`border rounded-2xl bg-[#0f0f12] overflow-hidden transition-all duration-300 relative cursor-text group ${
                isFocused 
                  ? 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.06)]' 
                  : 'border-zinc-800/70 shadow-2xl'
              }`}
            >
              {/* MacOS Style Title Bar */}
              <div id="window-title-bar" className="flex items-center justify-between px-5 py-3 border-b border-zinc-900 bg-[#0c0c0e]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  {selectedLanguage.toLowerCase()} - {selectedLength}
                </div>
                <div className="w-12 h-1"></div> {/* Balance spacer */}
              </div>

              {/* EDITOR WORKSPACE BODY */}
              <div 
                id="editor-viewport" 
                className="p-6 md:p-8 font-mono text-[15px] md:text-[16px] leading-[1.8] select-none overflow-x-auto min-h-[160px]"
              >
                {/* Lines mapping */}
                {renderLines.map(({ lineIdx, chars }) => (
                  <div key={lineIdx} id={`editor-line-${lineIdx}`} className="flex items-start">
                    {/* Line number column */}
                    <div className="w-8 text-right pr-4 text-zinc-700 select-none text-xs leading-[2.3]">
                      {lineIdx}
                    </div>

                    {/* Characters row */}
                    <div className="flex-1 flex flex-wrap items-center">
                      {chars.map(({ char, absIdx, isNewlineMark }) => {
                        const isTyped = absIdx < userInput.length;
                        const isCurrent = absIdx === userInput.length;
                        
                        let charStyle = 'text-zinc-600 transition-colors duration-100'; // Untyped default
                        let bgStyle = '';

                        if (isTyped) {
                          const typedChar = userInput[absIdx];
                          if (typedChar === char) {
                            charStyle = 'text-white font-medium'; // Correctly typed
                          } else {
                            charStyle = 'text-red-400 font-semibold'; // Mistyped key
                            bgStyle = 'bg-red-950/70 border border-red-500/20 rounded-sm px-[1px]';
                          }
                        }

                        // Apply blinking caret style if active
                        if (isCurrent && isFocused) {
                          charStyle = 'text-blue-200 font-bold';
                          bgStyle = 'bg-blue-600/90 border border-blue-400 rounded shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse scale-105 px-[2px] z-10';
                        }

                        // Special rendering for white space markers
                        if (isNewlineMark) {
                          return (
                            <span 
                              key={absIdx}
                              id={`char-${absIdx}`}
                              className={`font-mono text-xs whitespace-pre select-none tracking-tighter ${charStyle} ${bgStyle} opacity-60 ml-1`}
                              title="Enter key"
                            >
                              ↵
                            </span>
                          );
                        }

                        // Render character accurately
                        return (
                          <span
                            key={absIdx}
                            id={`char-${absIdx}`}
                            className={`whitespace-pre ${charStyle} ${bgStyle}`}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* UN-FOCUS SHIELD OVERLAY */}
              {!isFocused && (
                <div 
                  id="unfocus-alert" 
                  className="absolute inset-0 bg-[#08080a]/90 backdrop-blur-xs flex flex-col items-center justify-center transition-all duration-300 gap-3 text-center p-4 z-20"
                >
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all shadow-xl">
                    <Keyboard className="w-8 h-8 animate-bounce" />
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium text-base">Click or press any key to focus</p>
                    <p className="text-zinc-500 text-xs mt-1 font-mono">Ready to measure your programming muscle memory</p>
                  </div>
                </div>
              )}
            </div>

            {/* QUICK RETRY RECOMMENDATION */}
            <p id="retry-instructions" className="text-center text-zinc-600 text-[11px] mt-4 font-mono select-none">
              Press <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">Esc</kbd> or <span className="text-zinc-400 text-xs font-semibold cursor-pointer select-none" onClick={resetTyping}>click here</span> to quickly clear and retry this snippet.
            </p>
          </div>
        ) : (
          
          /* RESULTS AUDIT DASHBOARD (Rendered once snippet is finished) */
          <div id="results-dashboard" className="max-w-3.5xl mx-auto w-full bg-[#0d0d12] border border-zinc-800/80 rounded-2xl shadow-3xl p-6 md:p-8 animate-fade-in">
            
            {/* Header Result */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800/60 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Snippet Perfected!</h2>
                  <p className="text-xs text-zinc-500 font-mono">Snippet: {currentSnippet.name} ({currentSnippet.language})</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id="result-try-again"
                  onClick={resetTyping}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 text-sm text-zinc-200 rounded-lg font-medium transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  id="result-next-snippet"
                  onClick={getAnotherSnippet}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-sm text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20"
                >
                  Next Snippet
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metrics block grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#121217] border border-zinc-800/80 rounded-xl p-5 text-center shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Speed</p>
                <p className="text-4xl font-extrabold text-white mt-2 font-mono tracking-tight">
                  {currentWpm} <span className="text-xs text-zinc-500 font-medium">WPM</span>
                </p>
                <p className="text-[10px] text-zinc-500 mt-1.5 font-mono">1 word = 5 keys typed</p>
              </div>

              <div className="bg-[#121217] border border-zinc-800/80 rounded-xl p-5 text-center shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Accuracy</p>
                <p className="text-4xl font-extrabold text-white mt-2 font-mono tracking-tight">
                  {currentAccuracy}%
                </p>
                <p className="text-[10px] text-zinc-500 mt-1.5 font-mono">
                  {userInput.length - errorsCount} of {userInput.length} keys correct
                </p>
              </div>

              <div className="bg-[#121217] border border-zinc-800/80 rounded-xl p-5 text-center shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Time Taken</p>
                <p className="text-4xl font-extrabold text-white mt-2 font-mono tracking-tight">
                  {timeSec.toFixed(1)}s
                </p>
                <p className="text-[10px] text-zinc-500 mt-1.5 font-mono">Total keystrokes: {totalKeystrokes}</p>
              </div>

              <div className="bg-[#121217] border border-zinc-800/80 rounded-xl p-5 text-center shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Errors Made</p>
                <p className={`text-4xl font-extrabold mt-2 font-mono tracking-tight ${errorsCount > 0 ? 'text-red-500' : 'text-zinc-500'}`}>
                  {errorsCount}
                </p>
                <p className="text-[10px] text-zinc-500 mt-1.5 font-mono">
                  {errorsCount === 0 ? 'Flawless syntax!' : 'Needs corrections'}
                </p>
              </div>
            </div>

            {/* DYNAMIC REALTIME REAL-SIZE SVG LINE CHART */}
            <div id="performance-chart-wrapper" className="bg-[#101015] border border-zinc-800/80 rounded-xl p-6 mb-8 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-zinc-400 font-mono font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  Speed Curve Over Time (Seconds)
                </p>
                <span className="text-[10px] text-zinc-500 font-mono">Y: WPM, X: Seconds elapsed</span>
              </div>

              <div className="relative w-full overflow-hidden">
                {wpmHistory.length > 1 ? (
                  <div className="flex flex-col items-stretch">
                    <svg viewBox="0 0 500 130" className="w-full h-[155px] overflow-visible">
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid helper lines */}
                      <line x1="10" y1="10" x2="490" y2="10" stroke="#1c1917" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="10" y1="60" x2="490" y2="60" stroke="#1c1917" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="10" y1="110" x2="490" y2="110" stroke="#1c1917" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Area graph */}
                      <path d={chartVisuals.area} fill="url(#chartGlow)" />
                      
                      {/* Trend line */}
                      <path d={chartVisuals.line} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      
                      {/* Interactive Point Rings */}
                      {chartVisuals.points.map((pt, i) => (
                        <g key={i}>
                          <circle cx={pt.x} cy={pt.y} r="4" className="fill-blue-400 stroke-[#0d0d12] stroke-2" />
                        </g>
                      ))}
                    </svg>
                    
                    {/* Horizontal label axes */}
                    <div className="flex justify-between items-center text-[10px] text-zinc-600 font-mono mt-1 px-2 select-none">
                      <span>0.0s</span>
                      <span>{ (timeSec / 2).toFixed(1) }s</span>
                      <span>{ timeSec.toFixed(1) }s</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-[120px] flex items-center justify-center text-zinc-500 border border-dashed border-zinc-800 rounded-lg text-xs font-mono">
                    Not enough data points captured. Try typing more steadily!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PERSONAL PRACTICE RECENT ACTIVITY (STATISTICS HISTORY) */}
        <section id="practice-logs" className="max-w-4xl mx-auto w-full mt-12 bg-[#09090c] border border-zinc-900 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 border-b border-zinc-900 pb-4">
            <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-500" />
              Practice Sessions Registry
            </h3>

            {history.length > 0 && (
              <button
                id="clear-logs-btn"
                onClick={clearHistoryLog}
                className="text-[11px] text-red-500/80 hover:text-red-400 font-medium hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Logs
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-400 font-mono border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500">
                    <th className="pb-3 font-semibold uppercase tracking-wider pl-2">Language</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider">Snippet Name</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider">Size</th>
                    <th className="pb-3 font-semibold text-right uppercase tracking-wider pr-4">WPM</th>
                    <th className="pb-3 font-semibold text-right uppercase tracking-wider pr-4">Accuracy</th>
                    <th className="pb-3 font-semibold text-right uppercase tracking-wider pr-2">Date Recorded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-2.5 font-semibold text-zinc-200 pl-2">
                        {item.language}
                      </td>
                      <td className="py-2.5 text-zinc-300">
                        {item.snippetName}
                      </td>
                      <td className="py-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] capitalize ${
                          item.length === 'short' 
                            ? 'bg-zinc-800 text-zinc-400' 
                            : item.length === 'mid' 
                            ? 'bg-[#10b981]/10 text-[#10b981]' 
                            : 'bg-indigo-500/10 text-indigo-400'
                        }`}>
                          {item.length}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-white pr-4">
                        {item.wpm} <span className="text-[10px] text-zinc-600 font-normal">WPM</span>
                      </td>
                      <td className="py-2.5 text-right font-medium text-emerald-400 pr-4">
                        {item.accuracy}%
                      </td>
                      <td className="py-2.5 text-right text-zinc-650 pr-2">
                        {new Date(item.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-600 text-xs font-mono border border-dashed border-zinc-900 rounded-xl bg-zinc-950/20">
              No typing records catalogued yet. Choose a preset and start training!
            </div>
          )}
        </section>
      </main>

      {/* QUICK KEYS LISTENER FOR ESC KEY RETRY */}
      <KeyEscapeHandler onEscape={resetTyping} />

      {/* COMPLIANT PROFESSIONAL FOOTER */}
      <footer id="app-footer" className="border-t border-zinc-920 bg-[#060608] py-8 px-6 text-center select-none mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 font-mono gap-4">
          <p>© 2026 codetyper.dev. Master your typing speed under full programmer syntax.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5" /> Web Client V1.0.0</span>
            <span className="text-blue-500">Live Practice Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Side Component to handle keydown Esc safely at scope level
function KeyEscapeHandler({ onEscape }: { onEscape: () => void }) {
  useEffect(() => {
    const handleGlobalEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };
    window.addEventListener('keydown', handleGlobalEsc);
    return () => window.removeEventListener('keydown', handleGlobalEsc);
  }, [onEscape]);

  return null;
}
