var FriendsContainer = React.createClass({
    getInitialState: function () {
        return {
            personName: 'Autor',
            friends: ['Alex', 'John', 'Mike']
        }
    },
    addFriend: function(friend){
        var nextFriend = this.state.friends.concat([friend]);
        this.setState({ friends: nextFriend});
    },
    render: function () {
        return (
            <div>
                <h2>Name: {this.state.personName}</h2>
                <AddFriend addNew={this.addFriend} />
                <h3>Friends</h3>
                <ShowList names={this.state.friends}/>
            </div>
        )
    }
});

var AddFriend = React.createClass({
    getInitialState: function(){
        return {
            newFriend: ''
        }
    },
    onChange: function(e){
        this.setState({
            newFriend: e.target.value
        })
    },
    handleAddNew: function(e){
        e.preventDefault();
        this.props.addNew(this.state.newFriend);
        this.setState({
            newFriend: ''
        })
    },
    render: function() {
        return (
            <form onSubmit={this.handleAddNew}>
                <input type="text" onChange={this.onChange} value={this.state.newFriend} />
                <button>Add New friend</button>
            </form>
        )
    }
});

var ShowList = React.createClass({
    render: function(){
        var listItem = this.props.names.map(function(friend,index){
            return <li key={index}>{friend}</li>
        });
        return <ul>{listItem}</ul>;
    }
});

React.render(<FriendsContainer />, document.getElementById('content'));