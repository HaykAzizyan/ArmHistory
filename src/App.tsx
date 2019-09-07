import React from 'react'
import Header from "./Components/Header/Header"
import {MobxRouter} from "mobx-router"
import {inject, observer} from 'mobx-react';
import BackGroundContainer from "./Containers/backgroundContainer"
import "./App.scss"
@inject("mainStore")
@observer 
class App extends React.Component <any, any>
{
  render()
  
  {
    return(
      <div>        
        {/* <BackGroundContainer/> */}
        <Header/>
        <MobxRouter store={this.props.mainStore}/>
      </div> 
    );  
  }
  constructor(props:any)
  {
    super(props);
    console.log (props);
  }
}  
export default App;