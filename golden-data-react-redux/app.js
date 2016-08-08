const app = React.createClass({
    render:function () {
        return <div>
            {this.props.children}
        </div>
    }
});

const Editor = React.createClass({
    render:function () {
        return <div>
            <ReactRouter.Link to="/preview">preview</ReactRouter.Link>
            Editor
        </div>
    }
});

const preview = React.createClass({
    render:function () {
        return <div>
            <ReactRouter.Link to="/">Editor</ReactRouter.Link>
            preview
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