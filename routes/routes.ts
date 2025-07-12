
// Authentication Routes
export const AUTH_ROUTES = {
  SIGN_IN: '/view/signin',
  SIGN_UP: '/view/signup',
  FORGOT_PASSWORD: '/view/forgot-password',
} as const;

// Main Application Routes
export const APP_ROUTES = {
  HOME: '/view/home',
  LANDING: '/',
  SIGNUP:'/view/signup'
} as const;

// Feature Routes
export const FEATURE_ROUTES = {
  IMAGE_GENERATION: '/view/imagegeneration',
  VIDEO_GENERATION: '/view/video-generation',
  SKETCH_TO_IMAGE: '/view/sketch-to-image',
  REAL_TIME_GENERATION: '/view/real-time-generation',
} as const;

export const IMAGEGENERATION   = {
  IMAGE_GENERATION: '/view/IMAGEGENERATIONNEW/newtexttoimage',
  STICKER_GENERATION: '/view/IMAGEGENERATIONNEW/AI_Sticker_generation',
} as const;
// Navigation Routes
export const NAV_ROUTES = {
  TEMPLATES: '/view/templates',
  ART_STATION: '/view/artstation',
  PRICING: '/view/pricing',
  BLOG: '/view/Blog',
  CONTACT: '/view/contactus',
  SUPPORT: '/view/support',
  ABOUT: '/about',
  BOOKMARK:'/view/Bookmark',
  LANDING:'/view/Main',

} as const;

// Legal Routes
export const LEGAL_ROUTES = {
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COOKIES: '/cookies',
  LEGAL_NOTICE: '/legal',
  DMCA: '/dmca',
} as const;

// Footer Navigation Links
export const FOOTER_NAV_LINKS = {
  HOME: {
    FEATURES: '/features',
    TEMPLATES: NAV_ROUTES.TEMPLATES,
    ART_STATION: NAV_ROUTES.ART_STATION,
    PRICING: NAV_ROUTES.PRICING,
  },
  FEATURES: {
    TEXT_TO_IMAGE: FEATURE_ROUTES.IMAGE_GENERATION,
    TEXT_TO_VIDEO: FEATURE_ROUTES.VIDEO_GENERATION,
    SKETCH_TO_IMAGE: FEATURE_ROUTES.SKETCH_TO_IMAGE,
    REAL_TIME_GENERATION: FEATURE_ROUTES.REAL_TIME_GENERATION,
  },
  COMPANY: {
    BLOG: NAV_ROUTES.BLOG,
    CONTACT: NAV_ROUTES.CONTACT,
    SUPPORT: NAV_ROUTES.SUPPORT,
    ABOUT: NAV_ROUTES.ABOUT,
  },
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  X: '#',
  INSTAGRAM: '#',
  YOUTUBE: '#',
  BLOG: '#',
} as const;

// Type for route parameters
export type RouteParams = {
  [key: string]: string | number;
};

// Helper function to generate dynamic routes
export const generateRoute = (route: string, params?: RouteParams): string => {
  if (!params) return route;
  
  let generatedRoute = route;
  Object.entries(params).forEach(([key, value]) => {
    generatedRoute = generatedRoute.replace(`:${key}`, String(value));
  });
  
  return generatedRoute;
};

// Export all routes as a single object for easy access
export const ROUTES = {
  ...AUTH_ROUTES,
  ...APP_ROUTES,
  ...FEATURE_ROUTES,
  ...NAV_ROUTES,
  ...LEGAL_ROUTES,
  ...IMAGEGENERATION,
} as const; 