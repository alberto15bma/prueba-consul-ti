import React, { Component, Fragment } from 'react';
import menu from './menu';
import Comentarios from './lista_comentario';
import GestionComentario from './comentario';
import Usuario from './usuario';
import { Redirect } from 'react-router-dom'
import Button from 'devextreme-react/button';
import Popup from 'devextreme-react/popup';
import TextBox from 'devextreme-react/text-box';
import DateBox from 'devextreme-react/date-box';
import SelectBox from 'devextreme-react/select-box';
import { Toast } from 'devextreme-react/toast';
import { NumberBox } from 'devextreme-react/number-box';
import TreeView from 'devextreme-react/tree-view';
import app from '../config';
import apis from '../apis';
import constantes from '../constantes';
import store from 'store'
import Header from './header';;


 class Inicio extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            vista: '1_2',
            usuario_id: 0,
        }
       
    }
    
    componentDidMount() {
        
    }

    vistaRender = (e) => {
        const {vista} = this.state;

        switch (vista) {
            case '1_1':
                return <GestionComentario />
                break;
            case '1_2':
                return <Comentarios />
                break;
            case '3':
                return <Usuario />
                break;
            
            default:
                break;
        }


        if(vista === '1_2'){
            return <Comentarios />
        }

        return ""
    }

    clickItem = (e) => {
        let {itemData} = e;
        this.setState({vista:itemData.id})
    }

    render() {
        const {vista} = this.state
        const Vista_general = () => {
            let sesion = store.get(`sesion`)
            if(sesion === undefined){
                return <Redirect to="/login" />
            }
            return <section className="main_principal">
                <aside className="aside_izquierdo">
                <TreeView
                    dataSource={menu}
                    selectionMode="single"
                    selectByClick={true}
                    onItemSelectionChanged={this.clickItem}
                />
                </aside>
                <aside className="aside_derecho">
                {
                     this.vistaRender()
                }
                </aside>
            </section>;
          }
          return (
            <Fragment>
                <Header />
                 {Vista_general()}
            </Fragment>
          );
      }
}
export default Inicio; 