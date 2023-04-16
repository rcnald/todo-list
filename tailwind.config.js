/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'bg-body-color':'var(--bg-body-color)',
        'main-color':'var(--main-color)',
        'accent-color':'var(--accent-color)',
        'input-color':'var(--input-color)',
        'text-color':'var(--text-color)',
        'outline-color':'var(--outline-color)',
      },
      fontFamily:{
        'ff-main':'var(--ff-main)'
      },
      fontSize:{
        'xs':'0.75rem',
        'xl':'1.125rem',
      },
      spacing:{
        'xs':'var(--pd-xs)',
        'xxs':'var(--pd-xxs)',
        'pd-button':'var(--pd-button)',
      },
      borderRadius:{
        'xs':'0.3125rem',
      },
      maxWidth:{
        'md':'var(--mw-md)',
      },
    },
  },
  plugins: [],
}
