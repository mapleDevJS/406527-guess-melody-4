import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionArtistScreen from "../question/artist/screen.jsx";
import QuestionGenreScreen from "../question/genre/screen.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  _renderQuestionArtistScreen(question) {
    return (
      <QuestionArtistScreen
        question={question}
        onAnswer={() => {
          this.setState((prevState) => ({
            step: prevState.step + 1,
          }));
        }}
      />
    );
  }

  _renderQuestionGenreScreen(question) {
    return (
      <QuestionGenreScreen
        question={question}
        onAnswer={() => {
          this.setState((prevState) => ({
            step: prevState.step + 1,
          }));
        }}
      />
    );
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];
    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={() => {
            this.setState({
              step: 0,
            });
          }}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return this._renderQuestionArtistScreen(question);
        case GameType.GENRE:
          return this._renderQuestionGenreScreen(question);
      }
    }

    return null;
  }

  render() {
    const [artistQuestion, genreQuestion] = this.props.questions;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <QuestionArtistScreen
              question={genreQuestion}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/genre">
            <QuestionGenreScreen
              question={artistQuestion}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};
export default App;
