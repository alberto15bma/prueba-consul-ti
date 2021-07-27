import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import TreeView from 'devextreme-react/tree-view';
import Button from 'devextreme-react/button';
import Popup from 'devextreme-react/popup';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import DateBox from 'devextreme-react/date-box';
import SelectBox from 'devextreme-react/select-box';
import { Toast } from 'devextreme-react/toast';
import DataGrid, { Column, SearchPanel, ColumnFixing, Pager, FilterRow } from 'devextreme-react/data-grid';
import {NavLink} from 'react-router-dom';
import app from '../config';
import apis from '../apis';
import constantes from '../constantes';
import store from 'store'
import { Center } from 'devextreme-react/map'
import Header from './header';;
 class GestionComentario extends Component {
    constructor(props) {
        super(props);
        this.state= {
            usuario_id: 0,    
            rol: "",       
            usuario_login:"",
            comentario:"",
            comentarios:[],
            visible_notificacion: false,
            mensaje_notificacion:"",
            tipo_notificacion:"",
        }    
    }  
    componentDidMount() {
        debugger
        let data = store.get("data");
        if(data !== undefined){
            this.setState({usuario_id: data.id, rol:data.rol, usuario_login: `${data.nombre} (${data.rol})`});
            this.cargarComentarios(data.id, data.rol);
        }      
        
    }
    cargarComentarios = async (usuario_id, rol) => {
        let res = [];
        debugger
        if(rol==="Administrador")
             res = await app.consulta(apis.lista_comentarios, null, app.metodo.GET);
        else
            res = await app.consulta(apis.lista_comentarios_usuario+"/"+usuario_id, null, app.metodo.GET);

        this.setState({comentarios: res})
    }

    validarData = () => {
        const {comentario} = this.state;
        if(comentario.length === 0){
            this.mostrarNotificacion(constantes.error, constantes.error_campos);
            return false;
        }
        return true;;
    }
    mostrarNotificacion = (tipo, mensaje) => {
        this.setState({
            visible_notificacion:true,
            mensaje_notificacion:mensaje,
            tipo_notificacion: tipo
        })
    }
    limpiarData = () => {
        this.setState({
            comentario:""
        })
    }
    enviarComentario = async (e) => {
        if(this.validarData()) {
            const {comentario, usuario_id} = this.state;
            let parametros = { 
                comentario, 
                usuario: {id:usuario_id}
            }         
            let res = await app.consulta(apis.crear_comentario, parametros);
            this.limpiarData();
            this.cargarComentarios(this.state.usuario_id, this.state.rol);       
             
    }
}


 cambiarComentario = (e) => this.setState({comentario: e.value})
  render() {
    return (
        <Fragment>
        <header>
            <div>
                
           </div>
        </header>
        <div className="contenido">
            <div className="contenido_comentarios">
                <div className="comentarios">
                    {
                     this.state.comentarios.length >0 &&   this.state.comentarios.map(e=> 
                        <li>
                           {e.comentario} 
                        </li>)
                    }
                </div>
                <div className="escribir">
                    <div className="input">
                    <TextArea className="dx-field-value" height={"100%"} width="100%" placeholder="Escribe un comentario" valueChangeEvent="keyup" value={this.state.comentario} onValueChanged={this.cambiarComentario.bind()}  />
                    </div>
                    <Button text="Enviar" type="normal" onClick={() => this.enviarComentario()}/>        
                </div>
            </div>         
        </div>
    </Fragment>
    );
  }
}

export default GestionComentario;