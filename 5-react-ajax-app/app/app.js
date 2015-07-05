var MetaList = React.createClass({
    types: {
        like: 'like',
        unlike: 'like',
        block: 'block',
        unblock: 'block',
        follow: 'ignore',
        ignore: 'ignore'
    },
    getInitialState: function() {
        //set initial empty dataset
        return {like: false, block: false, ignore: false};
    },
    handleAction: function(e) {
        var state = this.state;
        var type = this.types[e.target.innerHTML];
        state[type] = !state[type];
        e.preventDefault();
        this.setState(state);
        this.props.onActionStateChange(state);
    },
    render: function() {
        var like = this.state.like ? 'unlike' : 'like';
        var block = this.state.block ? 'unblock' : 'block';
        var ignore = this.state.ignore ? 'follow' : 'ignore';

        return (
            <ul className="list-meta">
                <li><a href="#" className="button" onClick={this.handleAction}>{like}</a></li>
                <li><a href="#" className="button" onClick={this.handleAction}>{block}</a></li>
                <li><a href="#" className="button" onClick={this.handleAction}>{ignore}</a></li>
            </ul>
        );
    }
});

var Person = React.createClass({
    getInitialState: function() {
        //set initial empty dataset
        return { actions: {like: false, block: false, ignore: false}};
    },
    handleActionState: function(newState) {
        var state = this.state;
        state.actions = newState;
        this.setState(state);
    },
    buildClassNames: function() {
        var actions = this.state.actions;
        var classes = [];

        for(var action in actions) {
            if(actions[action]) {
                classes.push('person-' + action);
            }
        }

        return classes.join(' ');
    },
    render: function() {
        var classes = this.buildClassNames();

        return (
            <li className={classes}>
                <img src={this.props.person.avatar} alt={this.props.person.name} className="image-avatar"/>
                <h4 className="secondary-dark">
                    {this.props.person.name}
                </h4>
                <p>
                    {this.props.person.description}
                </p>
                <MetaList onActionStateChange={this.handleActionState} />
                <div className="clearfix"></div>
            </li>
        );
    }
});

var PeopleList = React.createClass({
    render: function() {
        var personNodes = this.props.data.map(function(person) {
            return (
                <Person person={person} key={person.id} />
            );
        });

        return (
            <ul className="block-list comment-block">
                {personNodes}
            </ul>
        );
    }
});

var People = React.createClass({
    loadPeople: function() {
        $.ajax({
            url: 'http://localhost:3000/data',
            dataType: 'json',
            success: function (data) {
                data.sort(function(a, b) {
                    if(a.name < b.name) {
                        return -1;
                    } else if(a.name > b.name) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                //changing state
                this.setState({data: data})
            }.bind(this),
            error: function () {
                console.log('to get data from db run \'json-server generate.js\'');
            }
        });
    },
    getInitialState: function() {
        //set initial empty dataset
        return {data: []};
    },
    componentDidMount: function() {
        this.loadPeople();
        setInterval(this.loadPeople, 2000);
    },
    render: function() {
        return (
            <PeopleList data={this.state.data} />
        );
    }
});


React.render(
    <People />,
    document.getElementById('content')
);