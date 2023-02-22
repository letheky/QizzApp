import { useState,useEffect } from 'react';
import './qizzStyle.scss'
import axios from 'axios';


interface Question{
    difficulty: string;
    question: string;
    incorrect_answers:string[];
    correct_answer:string;
    selectedOption: string | null;
    selectedLabelId: string | null;
}

const Qizz = () => {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);

    const API_URL = 'https://opentdb.com/api.php?amount=5&category=23&type=multiple'
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(API_URL);
                const quests = res.data.results
                setQuestions(quests) 
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    
    function refreshPage(){
        window.location.reload();
    } 

    function setColorDiff(difficulty:string){
        let color: string = ''
        let backgroundColor:string  = ''
        switch(difficulty){
            case 'easy':
                color = '#16a34a';
                backgroundColor = '#4ade80';
                break;
            case 'medium':
                color = '#ca8a04';
                backgroundColor = '#fcd34d';
                break;
            case 'hard':
                color = '#dc2626';
                backgroundColor = '#f87171';
                break;
        }
        return {
            color,backgroundColor
        }
    }

    function setResultColor(con1:boolean,con2:boolean,con3:boolean){
        if(con1){
            if(con2)return 'right-answer'
            else if(con3)return 'wrong-answer'
        }
        else return ''
    }

    const handleOptionChange = (
        questionIndex: number,
        optionIndex: number
      ) => {
        const newQuestions = [...questions];
        const options = [...newQuestions[questionIndex].incorrect_answers,newQuestions[questionIndex].correct_answer]
        newQuestions[questionIndex].selectedOption = options[optionIndex];
        newQuestions[questionIndex].selectedLabelId = `${questionIndex}`+`${optionIndex}`;
        setQuestions(newQuestions);
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowResult(true)
        questions.forEach(item=>{
            if(item.selectedOption === item.correct_answer)setResult(prev=>prev+1)
        })
    };
    // console.log(questions)
    return (
        <div className='qizz'>
            <form onSubmit={handleSubmit}>
                {questions.map((quest, questIndex) => (
                    <div className='qizz-row' key={questIndex}>
                        <h2 style={setColorDiff(quest.difficulty)}>{quest.difficulty}</h2>
                        <h2>{quest.question}</h2>
                        <div className="radio-toolbar">
                            {[...quest.incorrect_answers,quest.correct_answer].map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <input
                                        id={`${questIndex}`+`${optionIndex}`}
                                        type="radio"
                                        name={`question-${questIndex}`}
                                        value={option}
                                        checked={option === quest.selectedOption}
                                        onChange={() => handleOptionChange(questIndex, optionIndex)}
                                    />
                                    <label 
                                        className={setResultColor(showResult,option === quest.correct_answer,option === quest.selectedOption)}
                                        htmlFor={`${questIndex}`+`${optionIndex}`}
                                    > 
                                        {option} 
                                    </label>
                                </div>
                            ))}
                        </div>
                        <hr />
                    </div>
                ))}
                {!showResult && <button type="submit">Submit</button>}
                {showResult && <div className="play-again"><h3>Your result is {result}/5 </h3><button onClick={refreshPage}>Play again</button></div> }
            </form>
        </div>
    )
}

export default Qizz
 