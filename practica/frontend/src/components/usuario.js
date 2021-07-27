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

const roles = ["Administrador", "Usuario"]

 class Usuario extends Component {
    

    constructor(props) {
        super(props);
        this.state= {
            usuarios:[],
            activar_edicion:true,
            nombre: "",
            usuario:"",
            rol:"",
            fechaCreacion:"",
            titulo_modal: "Crear usuario",
            visible_modal:false,
            usuario_id:0,
            visible_notificacion: false,
            mensaje_notificacion:"",
            tipo_notificacion:"",
        }
    }
    
    componentDidMount() {
        this.cargarUsuarios();
    }
    limpiarData = () => {
        this.setState({
            tarea_id:0,
            activar_edicion:true,
            nombre: "",
            usuario:"",
            rol:"",
            fechaCreacion:new Date(),
            titulo_modal: "Crear usuario",
            usuario_id:0,
            visible_modal: false
        })
    }
    abrirModal = (e) => {
        if(e === "crear") {
            this.limpiarData();
            this.setState({titulo_modal: "Crear usuario", visible_modal:true, texto_boton:"Guardar", tipo_dialogo:1})
        }else {
            this.setState({titulo_modal: "Modificar usuario", visible_modal:true, texto_boton:"Modificar", tipo_dialogo:2})
        }
    }
    cargarUsuarios = async () => {
        let res = await app.consulta(apis.lista_usuarios, null, app.metodo.GET);
        console.log(res);
        if(res !== null)
            this.setState({usuarios: res})
    }
    seleccionFila = (e) => {
        let data = e.selectedRowsData[0]
        this.setState({                   
            activar_edicion: false,
            nombre: data.nombre,
            usuario:data.usuario,
            rol: data.rol,
            fechaCreacion:data.fechaCreacion,
            usuario_id:data.id
        });
    }

    validarData = () => {
        const {titulo, fecha_fin} = this.state;
        if(titulo.length === 0 || fecha_fin.length === 0){
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
    validarData = () => {
        const {nombre, usuario, rol, fechaCreacion} = this.state;
        if(nombre.length === 0 || usuario.length === 0 || rol.length === 0 || fechaCreacion.length === 0){
            this.mostrarNotificacion(constantes.error, constantes.error_campos);
            return false;
        }
        return true;;
    }
    guardarUsuario = async (e) => {
        if(this.validarData()) {
            const {nombre, usuario, rol, fechaCreacion, tipo_dialogo} = this.state;
            let parametros = { 
                nombre, 
                usuario, 
                rol,  
                fechaCreacion       
            }
            if(tipo_dialogo === 1){         
                let res = await app.consulta(apis.crear_usuario, parametros);
                this.limpiarData();
                this.cargarUsuarios();
                if(res != null){        
                this.mostrarNotificacion(constantes.success, constantes.guardado_correctamente);
                }else {
                    this.mostrarNotificacion(constantes.error, constantes.error_guardar);
                }
            }else {
                parametros.id = this.state.usuario_id;
                let res = await app.consulta(apis.modificar_usuario, parametros);
                this.limpiarData();
                this.cargarUsuarios();
                if(res != null){
                this.mostrarNotificacion(constantes.success, constantes.modificado_correctamente);
                }else {
                    this.mostrarNotificacion(constantes.error, constantes.error_modificar);
                }
            } 
        }
 }



    cambiarNombre = (e) => this.setState({nombre: e.value})
    cambiarUsuario = (e) => this.setState({usuario: e.value})
    seleccionRol = (e) => this.setState({rol: e.value})


    render() {     
          return (
            <Fragment>
                <header>
                <div>
                    <Button text="Nuevo" type="default" onClick={() => this.abrirModal("crear")}/>
                    <span className="espacio_horizontal"></span>
                    <Button text="Modificar" disabled={this.state.activar_edicion} type="normal" onClick={() => this.abrirModal("editar")}/>            
                   </div>
                </header>
                <div className="contenido">
                <DataGrid
                            id="gridContainer"
                            dataSource={this.state.usuarios}
                            keyExpr="id"
                            showRowLines={true}
                            selection={{ mode: 'single' }}   
                            height={"500"}
                            //focusedRowKey={this.state.focusFila}
                            onSelectionChanged={this.seleccionFila}
                            //focusedRowEnabled={true}
                            allowColumnReordering={true}
                            allowColumnResizing={true}
                            columnAutoWidth={true}
                            showBorders={true}
                        >
                            <FilterRow visible={true} />
                            <SearchPanel visible={true} width={212} placeholder="Buscar..." />
                            <ColumnFixing enabled={true} />
                            <Column dataField="nombre" caption="Nombre" />
                            <Column dataField="usuario" caption="Usuario"  />
                            <Column dataField="rol" caption="Rol"/>
                            <Column dataField="fechaCreacion" caption="Fecha creación" format="dd/MM/yyyy" dataType="date"/>
                            <Pager
                                visible={true}
                                //allowedPageSizes={allowedPageSizes}
                                displayMode={'full'}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true} />
                 </DataGrid>
                 <Popup
                    width={360}
                    height={440}
                    showTitle={true}
                    title={this.state.titulo_modal}
                    dragEnabled={false}
                    closeOnOutsideClick={false}
                    showCloseButton={false}
                    visible={this.state.visible_modal}
                    >
                    <div className="form">
                        <div className="dx-fieldset">
                            <div className="dx-field">
                                <div className="dx-field-label">Nombre:</div>
                                <TextBox className="dx-field-value" width= "100%"  valueChangeEvent="keyup" value={this.state.nombre} onValueChanged={this.cambiarNombre.bind()} />
                            </div>
                            <div className="dx-field">          
                            <div className="dx-field-label">Usuario:</div>                  
                                 <TextBox className="dx-field-value" height={50} width="100%" valueChangeEvent="keyup" value={this.state.usuario} onValueChanged={this.cambiarUsuario.bind()}  />
                            </div>
                            <div className="dx-field">
                                <div className="dx-field-label">Fecha creación:</div>
                                <div className="dx-field-value">
                                    <DateBox width="100%" disabled={true} defaultValue={this.state.fechaCreacion} valueChangeEvent="keyup" value={this.state.fechaCreacion} type="date" displayFormat="dd/MM/yyyy" />
                                </div>
                            </div>
                            <div className="dx-field">
                                <div className="dx-field-label">Estado:</div>
                                <div className="dx-field-value">
                                        <SelectBox dataSource={roles} onValueChanged={this.seleccionRol} value={this.state.rol} placeholder="Seleccione" />
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div className="div_botones_modal">
                        <Button text={this.state.texto_boton} width={110}  type="default" onClick={() => this.guardarUsuario()}/>
                        <div className="espacio_horizontal"></div>
                        <Button text="Cancelar"  width={110}   type="normal" onClick={() => this.setState({visible_modal:false})}/>
                    </div>

                </Popup>
                <Toast
                    visible={this.state.visible_notificacion}
                    width={500}
                    message={this.state.mensaje_notificacion}
                    type={this.state.tipo_notificacion}      
                    onHiding={() => this.setState({visible_notificacion: false})}           
                    displayTime={1500}
                />
                </div>
            </Fragment>
          );
      }
}
export default Usuario; 