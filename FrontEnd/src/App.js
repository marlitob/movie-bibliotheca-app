import Movies from "./Pages/Movies";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Movies />
    </ThemeProvider>
  );
}

export default App;
