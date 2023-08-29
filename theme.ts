import { createTheme } from '@mui/material/styles';

import { green, yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff1616dd",
      main: "#ffbd59",
      dark: "#ff161611"
    },
    secondary: {
        main: "#ff1616dd"
    }
  }
});

export default theme;