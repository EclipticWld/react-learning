// Example - 1
React.render(
<h1>Hello, world!</h1>,
    document.getElementById('example')
);

// Example - 2
var GeneratedText = React.createClass({
    render: function() {
        return (
            <p className="secondary">
                Component-rendered text
            </p>
        );
    }
});

React.render(
    <GeneratedText />,
    document.getElementById('example-2')
)

// Example - 3
var ContentText = React.createClass({
    render: function() {
        return (
            <span>
                Composed components rendered
            </span>
        );
    }
});

var SecondaryContent = React.createClass({
    render: function() {
        return (
            <p className="secondary">
                <ContentText />
            </p>
        );
    }
})

React.render(
    <SecondaryContent />,
    document.getElementById('example-3')
);