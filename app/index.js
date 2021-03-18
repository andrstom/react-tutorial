import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
/* importovano dynamicky !!!
import Popular from "./components/popular";
import Battle from "./components/battle";
import Results from "./components/results";
*/
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/nav";
import Loading from "./components/loading";

const Popular = React.lazy(() => import("./components/popular"));
const Battle = React.lazy(() => import("./components/battle"));
const Results = React.lazy(() => import("./components/results"));

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Popular} />
                  <Route exact path="/battle" component={Battle} />
                  <Route path="/battle/results" component={Results} />
                  {/*<Route component={FourZeroFour} />      pri import componenty */}
                  {<Route render={() => <h1>error 404 (page not found)</h1>} />}
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));