import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from "jquery"

class BtnCrearLista extends React.Component {
  render() {
    const textoLista = 'Nueva Lista';
    return (
      <button className="btnNuevaLista" onClick={this.props.onClick}>
        {textoLista}
      </button>
    );
  }
}

class BtnCrearTarea extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
    const textoLista = 'Nueva Tarea';
    return (
      <button className="btnNuevaTarea" onClick={this.props.onClick}>
        {textoLista}

      </button>
    );
  }
}

class BtnBorrarTarea extends React.Component {
  constructor(props) {
    super(props);
    this.referencia = React.createRef();
    this.state = {boton: this};

    // Este enlace es necesario para hacer que `this` funcione en el callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  // Obtener padre (tarea) y borrarlo
  // borrarTarea



  render() {
    const textoLista = 'Borrar Tarea';
    return (
      <button className="btnBorrarTarea" ref={this.referencia} onClick={this.props.onClick}>
        {textoLista}
      </button>
    );
  }
}

class Tarea extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      idTarea: 0
    }

    this.borraTarea = this.borraTarea.bind(this);
  }
  borraTarea(idTarea){
    var articulo = $('#'+idTarea);
    var articulo = articulo.parent();
    articulo.remove();
  
  }
  render() {
    const textTarea = 'Tarea';
    return (
      <article className="tarea">
        {textTarea}
        <textarea placeholder="Contenido de la tarea" cols="6" rows="2"></textarea>
        <BtnBorrarTarea key={this.state.idTarea.toString()} onClick={this.borraTarea("BtnBorrarTarea"+this.state.idTarea.toString())} />
 
      </article>
    );
  }
}

class Lista extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      tareas: [],
      nTareas: 0
    }
    this.creaTarea = this.creaTarea.bind(this);
  }

  creaTarea(){
    this.setState({
      tareas: [...this.state.tareas, <Tarea key={this.state.nTareas.toString()} ref={element => {this.tarea = element}} />]
    });
    const elem = this.state.tareas;

    /*this.state.tareas[this.state.nTareas].setState({
      idTarea : this.state.nTareas.toString()
    });*/
    this.setState({
      nTareas : this.state.nTareas+1
    });

  }

  renderTarea(i) {
    return (
    <Tarea />
    );
  }

  appendChild(){
    const textTarea = 'Tarea';
    $("#divList").append(<Tarea key={this.state.nTareas.toString()} />);

  }

  creaTarea2(type){
    //let mainContainer = React.createElement("div", { className: "contexCon" }, child);
    const textTarea = 'Tarea';
    /*const element1 = <article className="tarea">{textTarea}
         <textarea placeholder="Contenido de la tarea" cols="6" rows="2"></textarea>
         </article>;*/
    this.renderTarea(1);
    const node = ReactDOM.findDOMNode(this);

    var element = document.getElementById('divList');
    //var element5 = document.getElementById('tarea22').nodeValue;
    const vari = '1';
    //var elemento3 = this.refs.vari.nodeValue;
    //var elemento2 = document.createElement("article");
    //var t = document.createTextNode("añsldjñalskdñaklsd");
    //element.appendChild(element5);
    

    //element.appendChild(elemento2);
    //element.push(element1);
    //ReactDOM.render(element, document.getElementById('root'));


    //en el render--->  {this.renderTarea(0)}
    //this.setState({companyName: "your value", designation: "your value"});

    // dentro del obj   ref={element => {this.tarea = element}} 
    }

  render() {
    const textLista = 'Lista';

    return (
      <section>
      <section>
        <div className="tituloLista">{textLista}</div>
        <div className="sectionList" id="divList">
              {this.state.tareas}
        </div>
      </section>
      <section>
        <BtnCrearTarea ref={element => {this.tarea = element}} onClick={this.creaTarea}/>
      </section>
      </section>
    );
  }
}

class Tablero extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      listas: [],
      nListas: 0
    }
    this.creaLista = this.creaLista.bind(this);
  }

  creaLista(){
    this.setState({
      listas: [...this.state.listas, <Lista key={this.state.nListas.toString()} ref={element => {this.lista = element}} />]
    });
    const elem = this.state.listas;

    /*this.state.tareas[this.state.nTareas].setState({
      idTarea : this.state.nTareas.toString()
    });*/
    this.setState({
      nListas : this.state.nListas+1
    });

  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <section className="tableroSection">
            {this.state.listas}
          </section>
          <section className="tableroSection">
            <BtnCrearLista onClick={this.creaLista}/>
          </section>
          
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Tablero />,
  document.getElementById('root')
);
