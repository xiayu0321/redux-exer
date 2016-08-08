const app = React.createClass({
    getInitialState:function () {
      return {
          elements:[]
      }
    },
    removeElement:function (index) {
        console.log('remove',index);
        const elements = this.state.elements;
        elements.splice(index,1);
        this.setState({elements});
    },
    addElement:function (element) {
        console.log('add element',element);
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    render:function () {
        return <div>
            {this.props.children && React.cloneElement(this.props.children,{
                elements:this.state.elements,
                onRemove:this.removeElement,
                onAdd:this.addElement
            })}
        </div>
    }
});

const Editor = React.createClass({
    render:function () {
        return <div>
            <ReactRouter.Link to="/preview">preview</ReactRouter.Link>
            <LeftPanel elements={this.props.elements} onRemove={this.props.onRemove} />
            <RightPanel onAdd={this.props.onAdd}/>
        </div>
    }
});

const LeftPanel = React.createClass({
    remove:function (index) {
      this.props.onRemove(index)
    },
   render:function () {
       const elements =this.props.elements.map((ele,index) => {
           return <div key={index}>
               <input type={ele} />
               <button onClick={this.remove.bind(this,index)}>X</button>
           </div>
       });
       return <div>
           {elements}
       </div>
   }
});

const RightPanel = React.createClass({
    add:function () {
        const element =$("input[name=element]:checked").val()
        this.props.onAdd(element);
    },
    render:function () {
        return <div>
            <div>
                <input type="radio" name="element" value="text"/>Text
                <input type="radio" name="element" value="date"/>Date
            </div>
            <button onClick={this.add}>+</button>
            </div>
    }
});

const preview = React.createClass({
    render:function () {
        const elements =this.props.elements.map((ele,index) => {
           return <div key={index}>
               <input type={ele}/>
           </div>;
        });
        return <div>
            <ReactRouter.Link to="/">Editor</ReactRouter.Link>
            {elements}
        </div>
    }
});

ReactDOM.render(
    <ReactRouter.Router>
        <ReactRouter.Route path="/" component={app}>
            <ReactRouter.IndexRoute component={Editor}/>
            <ReactRouter.Route path="preview" component={preview}></ReactRouter.Route>
        </ReactRouter.Route>
    </ReactRouter.Router>
,document.getElementById('content'));