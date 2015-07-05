var data = [
    {
        name: "Antonin",
        description: "Web developer"
    },
    {
        name: "Juno",
        description: "Web designer"
    },
    {
        name: "Alix",
        description: "Web designer"
    }
];

var MetaList = React.createClass({
    render: function() {
        return (
            <ul className="list-meta">
                <li><a href="#">Like person</a></li>
            </ul>
        );
    }
});

var Person = React.createClass({
    render: function() {
        return (
            <li>
                {this.props.person.name} | {this.props.person.description}

                <MetaList />
            </li>
        )
    }
});

var PeopleList = React.createClass({
    render: function() {
        //no ng-repeat or foreach
        var personNodes = this.props.data.map(function(person) {
            return (
                <Person person={person} key={person.name} />
            );
        });

        return (
            <ul className="block-list comment-block">
                {personNodes}
            </ul>
        );
    }
});

React.render(
    <PeopleList data={data} />,
    document.getElementById('content')
);