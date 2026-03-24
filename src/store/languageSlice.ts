import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLang: string;
}

const initialState: LanguageState = {
  currentLang: typeof window !== 'undefined' 
    ? localStorage.getItem('preferred-language') || 'en' 
    : 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLang = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
