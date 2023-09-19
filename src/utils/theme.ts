// On page load or when changing themes, best to add inline in `head` to avoid FOUC

import { extendTheme } from "@chakra-ui/react";

const ThemeKey = 'THEME_KEY';

export function setTheme(value?: string) {
    if (value === 'dark' || (!value && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        localStorage.setItem(ThemeKey,'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem(ThemeKey,'light')
    }
}

/* 切换主题 */
export const changeTheme=(value?: string)=> {
    if(value){
        localStorage.setItem(ThemeKey,value)
        setTheme(value)
    }else{
        const theme = localStorage.getItem(ThemeKey)||''
        setTheme(theme)
    }
}

/* 获取主题 */
export const getTheme =()=>{
    const theme = localStorage.getItem(ThemeKey)||''
    return theme
}

// 全局主题
export const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          color: 'myGray.900',
          fontSize: 'md',
          fontWeight: 400,
          height: '100%',
          overflow: 'hidden'
        },
        a: {
          color: 'myBlue.700'
        }
      }
    },
    colors: {
      myWhite: {
        100: '#FEFEFE',
        200: '#FDFDFE',
        300: '#FBFBFC',
        400: '#F8FAFB',
        500: '#F6F8F9',
        600: '#F4F6F8',
        700: '#C3C5C6',
        800: '#929495',
        900: '#626263',
        1000: '#313132'
      },
      myGray: {
        100: '#EFF0F1',
        200: '#DEE0E2',
        300: '#BDC1C5',
        400: '#9CA2A8',
        500: '#7B838B',
        600: '#5A646E',
        700: '#485058',
        800: '#363C42',
        900: '#24282C',
        1000: '#121416'
      },
      myBlue: {
        100: '#f0f7ff',
        200: '#EBF7FD',
        300: '#d6e8ff',
        400: '#adceff',
        500: '#85b1ff',
        600: '#4e83fd',
        700: '#3370ff',
        800: '#2152d9',
        900: '#1237b3',
        1000: '#07228c'
      },
      myRead: {
        600: '#ff4d4f'
      }
    },
    fonts: {
      body: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    },
    fontSizes: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '16px',
      '2xl': '18px',
      '3xl': '20px'
    },
    borders: {
      sm: '1px solid #EFF0F1',
      base: '1px solid #DEE0E2',
      md: '1px solid #DAE0E2',
      lg: '1px solid #D0E0E2'
    },
    shadows: {
      sm: '0 0 5px rgba(0,0,0,0.1)',
      md: '0 0 8px rgba(0,0,0,0.1)',
      base: '0 0 10px rgba(0,0,0,0.15)',
      lg: '0 0 10px rgba(0,0,0,0.2)'
    },
    breakpoints: {
      sm: '900px',
      md: '1200px',
      lg: '1500px',
      xl: '1800px',
      '2xl': '2100px'
    },
    lgColor: {
      activeBlueGradient: 'linear-gradient(to bottom right, #d6e8ff 0%, #f0f7ff 100%)',
      hoverBlueGradient: 'linear-gradient(to top left, #d6e8ff 0%, #f0f7ff 100%)',
      primary: 'linear-gradient(to bottom right, #2152d9 0%,#3370ff 40%, #4e83fd 100%)',
      primary2: 'linear-gradient(to bottom right, #2152d9 0%,#3370ff 30%,#4e83fd 80%, #85b1ff 100%)'
    },
    // components: {
    //   Button,
    //   Input,
    //   Textarea,
    //   Switch,
    //   Select,
    //   NumberInput
    // }
});