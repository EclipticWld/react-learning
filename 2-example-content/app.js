// content-1
var SecondaryButton = React.createClass({
    render: function() {
        return (
            <span className="button secondary">
                {this.props.children}
            </span>
        )
    }
});

var ContentBlock = React.createClass({
    render: function() {
        return (
            <SecondaryButton>
                My button
            </SecondaryButton>
        );
    }
});

React.render(
    <ContentBlock />,
    document.getElementById('content-1')
)

// content-2
var BetterButton = React.createClass({
    render: function() {
        var classString = 'button ';
        classString += this.props.buttonType;

        return (
            <span className={classString}>
                {this.props.children}
            </span>
        );
    }
});

React.render(
    <BetterButton buttonType="secondary">
        My Better Button
    </BetterButton>,
    document.getElementById('content-2')
);