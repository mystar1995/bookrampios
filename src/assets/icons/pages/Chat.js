import React from 'react';
import svg from '../svg.svg';
import arrow from '../img/submit-arrow.png';
import $ from 'jquery';
import Question from '../component/message_question';
import Answer from '../component/message_answer';
import {connect} from 'react-redux';
import {add_answer,add_change_profile,add_answer_profile} from '../action/question';
import SelectOption from '../component/selectoptions';
import DatePicker from 'react-mobile-datepicker';
import Moment from 'moment';
import {animateScroll} from 'react-scroll';
import MultipleOption from '../component/multipleoption';
import Carousel from '../component/Carousel';
import CarouselItem from '../component/CarouselItem';
import { SELECT_TODO } from '../action/action-type';


class Chat extends React.Component
{
  messageend = null;
  disabled = false;
  constructor(props)
  {
    super(props);
    this.state = {
      loaded:false,
      inputvalue:"",
      open:false,
      profilechanges:[],
      step:0
    }
  }

  componentDidMount()
  {
    this.scrollToBottom();
  }


  handleKey = (e) => {
    const {questions} = this.props;
    if(e.which == 13)
    {
      this.submitinput();  
    }
    let lastquestion = questions.questions[questions.questions.length - 1];
    if(lastquestion.message_type == 'tel')
    {
      var value = this.state.inputvalue;
      if(e.which >= 48 && e.which <=57 && value.length < 13)
      {
        if(value.length == 3)
        {
          value += "-";
          this.setState({
            inputvalue:value
          })
          this.disabled = true;
        }
        else if(value.length == 8)
        {
          value += "-";
          this.setState({
            inputvalue:value
          })
          this.disabled = true;
        }
        
      }
      else
      {
        this.disabled = true;
      }
    }
    
    
    //this.disabled = true;

  }

  handlechange = (e) => {
    if(this.disabled)
    {
      this.disabled = false;
    }
    else
    {
      this.setState({
        inputvalue:e.target.value
      })
    }
  }

  submitinput = () =>{
    const {dispatch,questions,step,token,profile} = this.props;
    let lastquestion = questions.questions[questions.questions.length - 1];
    if(this.state.inputvalue)
    {
      if(lastquestion.message_type == 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.inputvalue)))
      {
       return;
      }
      if(step != 3)
      {
        dispatch(add_answer(this.state.inputvalue,questions.questions[questions.questions.length - 1].input_type,this.props.token,questions.questions.length - 1));
      }
      else
      {
        let messagetype = questions.questions[questions.questions.length - 1].message_type;
        let input_type = 'input';

        if(messagetype == 'option' || messagetype == 'option1')
        {
          input_type = messagetype;
        }

        console.log(input_type);

        dispatch(add_answer_profile({answer:this.state.inputvalue,input_type:input_type,token:token,index:questions.questions.length - 1,selectedtype:profile.selectedtype,answer_option:profile.answer}));
      }

      this.setState({
        inputvalue:""
      })
    }
  }

  submitvalue = (value) => {
    const {dispatch,questions,step,token,profile} = this.props;
    if(step != 3)
    {
      dispatch(add_answer(value,questions.questions[questions.questions.length - 1].input_type,this.props.token,questions.questions.length - 1));
    }
    else
    {
      let messagetype = questions.questions[questions.questions.length - 1].message_type;
      let input_type = 'input';

      if(messagetype == 'option' || messagetype == 'option1')
      {
        input_type = messagetype;
      }
      console.log(messagetype);
      dispatch(add_answer_profile({answer:value,input_type:input_type,token:token,index:questions.questions.length - 1,answer_option:profile.answer,selectedtype:profile.selectedtype}));
    }
  }

  submittodo = (value) => {
    const {dispatch,token,questions} = this.props;
    console.log(value);
    dispatch({type:SELECT_TODO,select:value,token:token,index:questions.questions.length - 1});
  }

  select = (date) => {
    console.log(date);
    this.submitvalue(Moment(new Date(date)).format('YYYY年MM月DD日'))
  }
  
  changeprofile = (value) => {
    const {questions,dispatch} = this.props;
    dispatch(add_change_profile(value,questions.questions.length - 1));
  }

  renderanswer = (question,answer) => {
    console.log("answer",question);
    if(question.input_type == 'input')
    {
      return (
        <Answer answer={answer}></Answer>
      )
    }
    else if(question.input_type == 'option' || question.input_type == 'selection')
    {
      let optionlist = [];
      if(question.input_type == 'option')
      {
        optionlist = JSON.parse(question.option_list);
      }
      else
      {
        optionlist = question.step_option_list;
      }
      
      for(let item in optionlist)
      {
        if(optionlist[item].key == answer)
        {
          return (
            <Answer answer={optionlist[item].value}></Answer>
          )
          
        }
      }
    }
    else if(question.input_type == 'multiple')
    {
      let optionlist = JSON.parse(question.option_list);
      let component = [];
      for(let item in optionlist)
      {
        if(answer.indexOf(optionlist[item].key) > -1)
        {
          component.push(<Answer answer={optionlist[item].value}></Answer>)
        }
      }
      return component;
    }
  }

  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId:"chat-body",
      duration:500
    })

    animateScroll.scrollToBottom({
      containerId:'chat-container-window',
      duration:500
    })
  }

  componentDidUpdate()
  {
    this.scrollToBottom();
    if($('.chat-answer-input').length > 0)
    {
      $('.chat-answer-input').focus();
    }
  }
  

  componentWillReceiveProps(props)
  {
      console.log(props);
  }

  render()
  {
    const {questions,answers,welcome,article} = this.props;
    const lastquestion = questions.questions.length > 0?questions.questions[questions.questions.length - 1]:{};
    return (
      <div className="chat-window-wrapper" id="chat-window">
        <div className="chat-window-header">
          <div className="chat-name-wrapper">
            <span>Mirai</span>
          </div>
          <div className="chat-header-dot">
            <img src={svg}/>
          </div>
        </div>
        <div className="chat-window-body" id="chat-body">
            {
                welcome.welcomes.map((row,index)=>{
                    return (
                        <Question key={index} question={row}></Question>
                    )
                })
            }
            {
              questions.questions.map((row,index)=>{
                return (
                  <React.Fragment key={index}>
                    <Question question={row.text} ref={(el)=>this.messageend = el} marginbottom={(!answers[index] && lastquestion.message_type == 'date' && index == questions.questions.length - 1)?'244px':''}></Question>
                    {
                      answers[index] != undefined && (
                        this.renderanswer(row,answers[index])
                      )
                    }
                    {
                      row.input_type == 'article' && (
                        <Carousel>
                          {
                            article.map((articles,index)=>{
                              return (
                                <CarouselItem {...articles} key={index}></CarouselItem>
                              )
                            })
                          }
                        </Carousel>
                      )
                    }
                  </React.Fragment>
                )
              })
            }
            {
              questions.loading && (
                <Question loading={true} ref={(el)=>this.messageend = el}></Question>
              )
            }
		  </div>
        <div className="chat-window-footer">
          {
            ((questions.questions.length > 0 && lastquestion.message_type != 'date' && questions.questions[questions.questions.length - 1].input_type == 'input') || questions.loading) && (
              <React.Fragment>
                <input type="text" className="chat-answer-input" name="answer-input" placeholder="メッセージを入力...." onKeyPress={this.handleKey} value={this.state.inputvalue} onChange={this.handlechange} disabled={questions.loading} autoComplete="off"/>
                <div className="send-arrw-wrapper">
                  <img src={arrow} onClick={()=>this.submitinput()}/>
                </div>
              </React.Fragment>
            )
          }

          {
            (questions.questions.length > 0 && !answers[questions.questions.length - 1] && (questions.questions[questions.questions.length - 1].input_type == 'option') && !questions.loading) && (
              <SelectOption select={this.submitvalue} selectoption={JSON.parse(questions.questions[questions.questions.length - 1].option_list)} width={JSON.parse(lastquestion.option_list)[0].value.length > 4}></SelectOption>
            )
          }
          
          {
            (questions.questions.length > 0 && !answers[questions.questions.length - 1] && lastquestion.input_type == 'selection' && !questions.loading) && (
              <SelectOption select={this.submittodo} selectoption={lastquestion.step_option_list} width={lastquestion.step_option_list[0].value.length > 4}></SelectOption>
            )
          }
          {
            (lastquestion.message_type == 'date' && !answers[questions.questions.length - 1]) && (
              <DatePicker theme="ios" isOpen={true} max={new Date()} dateConfig={{year:{format:'YYYY',caption:'年',step:1},month:{format:'M',caption:'月',step:1},date:{format:'D',caption:'',step:1}}} onSelect={this.select} cancelText=""></DatePicker>
            )
          }
          {
            (questions.questions.length > 0 && !answers[questions.questions.length - 1] && lastquestion.input_type == 'multiple' && !questions.loading) && (
              <MultipleOption select={this.submitvalue} options={JSON.parse(questions.questions[questions.questions.length - 1].option_list)}></MultipleOption>
            )
          }
          {
            (questions.questions.length > 0 && !answers[questions.questions.length - 1] && lastquestion.input_type == 'multi-option' && !questions.loading) && (
              <SelectOption select={this.changeprofile} selectoption={questions.questions[questions.questions.length - 1].step_option_list} width={true}></SelectOption>
            )
          }
        </div>
      </div>
    )
  }
}

const mapstatetoprops = (state) => ({
    token:state.token,
    welcome:state.welcome,
    questions:state.questions,
    answers:state.answers,
    article:state.article,
    step:state.step,
    profile:state.profile
})

export default connect(mapstatetoprops)(Chat);
