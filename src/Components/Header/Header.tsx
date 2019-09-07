import React from 'react';
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import routes from "../../Config/Views";
import {IoIosMenu, IoIosClose} from "react-icons/io"
import "./Header.scss"
export interface IMenuLink {
    label: string, 
    link:  string;
}
@inject("mainStore")
@observer
class Header extends React.Component<any, any>
{
    private ref: any = React.createRef();
    
    private links: IMenuLink[] = [
        {link: 'HomePage',        label: 'Главная страница'}, 
        {link: 'HistoricPersons', label: 'Личности'},
        {link: 'HistoricEvents',  label: 'События'},
        {link: 'Statistic',       label: 'Статистикса'},
        {link: 'Forms' ,          label:'Форма'},
        {link: 'Games',           label:'Игра'}
    ];

    @observable
    private menuState: boolean = false;

    @action
    private toggleMenu(newState: boolean | null = null){
         this.menuState = newState === null ? !this.menuState: !!newState;
    }

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
            case "Games":router.goTo(routes.games);break;
            default: console.error("unknown route");break;        
        }
        this.menuState = false;
    }
   render()
   {    
     return(
        <div className="app-header">
                <div className={`mobile-menu hidden-sm-up ${this.menuState ? "is-opened": ""}`} >
                    
                    <ul className ="navbar-nav-mobile">  
                        { this.links.map((d: IMenuLink, i: number)=>
                            <li className="nav-active" key={i}>
                            <button className="btn btn-secondary" onClick={() => this.handleOnClick(d.link)} > {d.label} </button>                    
                            </li>
                            )                 
                        }
                    </ul>
                    <div className="mobile-menu-overlay" onClick={() => this.toggleMenu(false)}></div>
                    
                </div>

            <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                
                {/* Collapse button */}
                <button className="navbar-toggler first-button" type="button" 
                onClick={() => this.toggleMenu()}>
                {this.menuState ? <IoIosClose/>: <IoIosMenu/>}
                </button>

                    

                    {/* Collapsible content */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent20">    

                        <ul className ="navbar-nav">  
                        { this.links.map((d: IMenuLink, i: number)=>
                            <li className="nav-active" key={i}>
                            <button className="btn btn-secondary" onClick={() => this.handleOnClick(d.link)} > {d.label} </button>                    
                            </li>
                            )                 
                        }
                        </ul>
                    </div>    
            </nav>
        </div>
       );
   }
}
export default Header;