import React from 'react';
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import routes from "../Config/Views"
@inject("mainStore")
@observer
class Header extends React.Component<any, any>
{
    private ref: any = React.createRef();
    
    @action
     private handleOnClick(e: any) 
    {
        const {router} = this.props.mainStore
        switch (e){
            case "HomePage":router.goTo(routes.homepage);break;
            case "HistoricPersons":router.goTo(routes.historicpersons);break;
            case "HistoricEvents":router.goTo(routes.historicevents);break;
            case "Statistic":router.goTo(routes.statistic);break;
            case "Forms":router.goTo(routes.forms);break;
            default: console.error("unknown route");break;
        }
    }
   render()
   {    
     return(
 
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
             
            {/* Collapse button */}
            <button className="navbar-toggler first-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent20"
            aria-controls="navbarSupportedContent20" aria-expanded="false" aria-label="Toggle navigation">
            <div className="animated-icon1"></div>
            </button>

                {/* Collapsible content */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent20">    

                    <ul className ="navbar-nav">  
                            <li className="nav-active">
                            <button className="btn btn-secondary" onClick={() => this.handleOnClick('HomePage')}> Главная страница </button>                    
                            </li>

                            <li className="nav-active">      
                            <button className="btn btn-secondary" onClick={() => this.handleOnClick('HistoricPersons')}> Исторические личнисти </button>                              
                            </li>

                            <li className="nav-active">
                            <button className="btn btn-secondary" onClick={() => this.handleOnClick('HistoricEvents')}> Исторические события </button>
                            </li>
                            
                            <li className="nav-active">
                            <button className="btn btn-secondary" onClick={() => this.handleOnClick('Statistic')}> Статистика </button>
                            </li>

                            <li className="nav-active">
                            <button className="btn btn-secondary" onClick={() => this.handleOnClick('Forms')}> Бланк </button>
                            </li>
                    </ul>
                </div>    
        </nav>
       );
   }
}
export default Header;