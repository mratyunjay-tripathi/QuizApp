import React, { Component } from 'react';
import './App.css';
import QuizLogo from './assets/logo.webp';
import Like from './assets/download.png';
import Done from './assets/correct.png';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      index: 0,
      submitted: false,
    };

    this.quiz = [{
      id: 1,
      ques: "A line which cuts a pair of parallel lines is called",
      options: ["Tangent", "Chord", "Transversal", "Intersector"],
      correctOption: 2
    },
    {
      id: 2,
      ques: "If a certain sum of money can become 5 times of its principal in 10 years, than the rate of interest is",
      options: ["20%", "30%", "40%", "50%"],
      correctOption: 2,
    },
    {
      id: 3,
      ques: "A shopkeeper purchases 15 mangoes for Rs. 10 and sells them at 10 mongoes for Rs. 15. Thus he earns a profit of",
      options: ["50%", "75%", "80%", "125%"],
      correctOption: 3,
    }];
  }

  checkValue = (option, qid) => {
    let index = this.state.answers.findIndex(ans => ans.id == qid);
    if (index !== -1) {
      return this.state.answers[index].option == option;
    } else {
      return false;
    }
  }

  handleChange = (option, value) => {
    const { answers, index } = this.state;
    let ans = {
      id: this.quiz[index].id,
      option,
      value,
    };
    let ansIndex = answers.findIndex(res => res.id == ans.id);
    if (ansIndex !== -1) {
      answers.splice(ansIndex, 1, ans);
    } else {
      answers.push(ans);
    }
    answers.sort((a, b) => a.id - b.id);
    this.setState(answers);
  }

  submitQuiz = () => {
    let qCorrect = 0;
    this.state.answers.map(ans => {
      let res = this.quiz.find(q => q.id == ans.id);
      if (res.correctOption == ans.option) {
        qCorrect++;
      }
    })
    let score = ((qCorrect / this.quiz.length) * 100).toFixed(2);
    this.setState({ correctAnswers: qCorrect, percentage: score, submitted: true });
  }

  navigate = (move) => {
    const { index } = this.state;
    switch (move) {
      case 0: index > 0 && this.setState({ index: index - 1 }); break;
      case 1: index < this.quiz.length - 1 && this.setState({ index: index + 1 }); break;
    }
  }


  render() {
    const { index } = this.state;
    return (
      <div className="App">
        {!this.state.submitted ?
          <>
            <div className='answerBox'>
              <div style={{ width: 50, height: 50, margin: '20px 0px' }}>
                <img src={Like} style={{ height: '100%', width: '100%' }} /></div>
              <h5>{"Review Answers Here"}</h5>
              {this.state.answers.map((ans, index) => {
                return (
                  <div style={{ padding: '20px 0px' }}>
                    <span style={{ fontWeight: 'bold' }}>
                      {`#${ans.id}: `}
                    </span>
                    <span >
                      {ans.value}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className='questionBox'>
              <div style={{ width: 80, height: 80, margin: '20px 0px' }}>
                <img src={QuizLogo} style={{ height: '100%', width: '100%' }} /></div>
              <div className='quizNav'>
                {this.state.index > 0 ? <div onClick={() => this.navigate(0)}><i className='fa fa-caret-square-o-left' style={{ fontSize: 30, color: '#f00', cursor: 'pointer' }} /></div> : <div></div>}
                <h5>{"Attempt Questions Here"}</h5>
                <div onClick={() => this.navigate(1)}><i className=' fa fa-caret-square-o-right' style={{ fontSize: 30, color: '#f00', cursor: 'pointer' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 40 }}>
                  <h4 style={{ padding: 10, textAlign: 'center' }}>{`Question#${index + 1} ${this.quiz[index].ques}`}</h4>
                  {this.quiz[index].options.map((value, subIndex) => (
                    <div style={{ padding: 10, cursor: 'pointer' }} onClick={() => this.handleChange(subIndex, value)}>
                      <input type="radio" name={`option${index}`} value={subIndex} checked={this.checkValue(subIndex, this.quiz[index].id)} />
                      <span>{value}</span>
                    </div>))}
                </div>
              </div>
              {this.state.answers.length == 3 && <button type="button" onClick={this.submitQuiz} style={{ position: 'absolute', backgroundColor: '#f00', color: '#fff', border: 0, width: 150, height: 30, bottom: 0, right: 10, cursor: 'pointer' }}>{"SUBMIT"}</button>}
            </div>
          </> :

          <div className='submit'>
            <div style={{ width: 80, height: 80, margin: '20px 0px' }}>
              <img src={Done} style={{ height: '100%', width: '100%' }} /></div>
            <h3 style={{ paddingTop: 20 }}>{"You have successfully submitted the Assessment"}</h3>
            <div style={{ padding: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                {`-Question Asked: `}
              </span>
              <span >
                {this.quiz.length}
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                {`-Question Correct: `}
              </span>
              <span >
                {this.state.correctAnswers}
              </span>
            </div><div style={{ padding: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                {`-Your Score: `}
              </span>
              <span >
                {this.state.percentage}
              </span>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
