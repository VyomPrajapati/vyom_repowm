import { useState, useEffect } from 'react';

// Token management utility
const DEFAULT_TOKENS = 16000;

// Create a custom event for token updates
const TOKEN_UPDATE_EVENT = 'tokenUpdate';

const isBrowser = typeof window !== 'undefined';

// Get user email for user-specific token storage
const getUserEmail = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem('otpUser') || localStorage.getItem('userEmail');
};

// Create user-specific token key
const getTokenKey = (): string => {
  const userEmail = getUserEmail();
  return userEmail ? `userTokens_${userEmail}` : 'userTokens_anonymous';
};

export function getTokens(): number {
  if (!isBrowser) return DEFAULT_TOKENS;
  const tokenKey = getTokenKey();
  const tokens = localStorage.getItem(tokenKey);
  return tokens ? parseInt(tokens) : DEFAULT_TOKENS;
}

export const setTokens = (tokens: number): void => {
  if (!isBrowser) return;
  const tokenKey = getTokenKey();
  localStorage.setItem(tokenKey, tokens.toString());
  // Dispatch event when tokens are updated
  window.dispatchEvent(new CustomEvent(TOKEN_UPDATE_EVENT, { detail: tokens }));
};

export function deductTokens(amount: number): boolean {
  const currentTokens = getTokens();
  if (currentTokens >= amount) {
    setTokens(currentTokens - amount);
    return true;
  }
  return false;
}

export function addTokens(amount: number): void {
  const currentTokens = getTokens();
  setTokens(currentTokens + amount);
}

export const initializeTokens = (): void => {
  if (!isBrowser) return;
  const tokenKey = getTokenKey();
  
  // Only initialize if no tokens exist for this user
  if (!localStorage.getItem(tokenKey)) {
    setTokens(DEFAULT_TOKENS);
  }
};

// Create a custom hook for token updates
export const useTokenUpdate = () => {
  const [tokens, setTokens] = useState(getTokens());

  useEffect(() => {
    if (!isBrowser) return;
    
    // Initialize tokens on component mount only if they don't exist
    initializeTokens();
    
    const handleTokenUpdate = (event: CustomEvent) => {
      setTokens(event.detail);
    };

    window.addEventListener(TOKEN_UPDATE_EVENT, handleTokenUpdate as EventListener);
    return () => {
      window.removeEventListener(TOKEN_UPDATE_EVENT, handleTokenUpdate as EventListener);
    };
  }, []);

  return tokens;
};