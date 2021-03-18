import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "./card";
import Loading from "./loading";
import Tooltip from "./tooltip";

/**
 * Languages menu
 */
function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            onClick={() => onUpdateLanguage(language)}
            style={language === selected ? { color: "rgb(187, 46, 31)" } : null}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Nastavi datove typy pro jednotlive props (string, number, bool, func, object, ...)
LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

/**
 * Repositories grid
 */
function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github name">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

class Popular extends Component {
  state = {
    selectedLanguage: "All", // vychozi jazyk
    repos: {}, // defaultni repo, pro cachovani je dobre ukladat do objectu
    error: null, // error
  };

  // Lifecycle metoda - spusti se pri prvnim nacteni scriptu
  // nastavi vychozi hodnotu filtru na selectedLanguage = All
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (selectedLanguage) => {
    // nastavit vychozi hodoty do state
    this.setState({
      selectedLanguage,
      error: null,
    });

    // CACHOVANI - ulozit ziskana data do mezipameti (state) pro rychlejsi nacitani
    if (!this.state.repos[selectedLanguage]) {
      // zavolat metodu, ktera vrati data a pripoji je do state (z api.js)
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data,
            },
          }));
        })
        // odchytit pripadne chyby, vypsat do console a do state (zobrazit uzivateli)
        .catch(() => {
          console.warn("Error fetching repos: ", error);

          this.setState({
            error: "There was an error fetching the repositories!",
          });
        });
    }
  };

  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  };

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}

export default Popular;