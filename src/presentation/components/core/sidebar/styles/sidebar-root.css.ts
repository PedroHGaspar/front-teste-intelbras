import { style } from '@vanilla-extract/css';

import { theme } from '@components/styles/theme/theme.css';

export const sidebarRootStyle = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '13rem',
  transition: 'width 0.2s ease-in-out',
  zIndex: 1,

  ':hover': {
    width: '12vw',
  },
});

export const sideBarHeaderStyle = style({
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 'lighter',
  gap: '1.5rem',
  height: '10rem',
  alignItems: 'center',
  marginBottom: '1rem',

  selectors: {
    [`${sidebarRootStyle}:hover &`]: {
      alignItems: 'flex-start',
    },
  },
});

export const sideBarDefenseLogoStyle = style({
  width: 0,
  height: 0,
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',

  selectors: {
    [`${sidebarRootStyle}:hover &`]: {
      width: '50%',
      height: '50%',
      display: 'inline-flex',
      margin: '0 auto',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out',
    },
  },
});

export const sideBarDefenseLogoSmallStyle = style({
  width: '6rem',
  height: '3.5rem',
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'center',

  selectors: {
    [`${sidebarRootStyle}:hover &`]: {
      display: 'none',
    },
  },
});

export const sideBarTitleHeaderStyle = style({
  // display: 'none',
  width: '100%',
  textAlign: 'center',
  fontSize: '12px',

  selectors: {
    [`${sidebarRootStyle}:hover &`]: {
      display: 'block',
    },
  },

});

export const sideBarFooterStyle = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: '2.4rem',
});

export const sideBarIntelbrasLogoStyle = style({
  display: 'none',

  selectors: {
    [`${sidebarRootStyle}:hover &`]: {
      display: 'flex',
      width: '10rem',
      height: '1.8rem',
    },
  },
});
