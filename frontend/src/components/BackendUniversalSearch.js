const React = require('react');

class BackendUniversalSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputValue: ''
    };
  }

  render() {
    const onFilterChange = (event) => {
      this.setState({
        inputValue: event.target.value
      });
      if (event.target.value !== '') {
        this.props.isSearching(true);
        this.props.search(event.target.value);
      }
      else {
        this.props.isSearching(false);
      }
      
    };

    const displayResult = () => {
      const notebooks = this.props.searchedNotebooks.map(this.props.createNotebookListItem);
      const notes = this.props.searchedNotes.map(this.props.createNoteListItem);
      const itemList = notebooks.concat(notes);
      
      return this.state.inputValue === '' ? '' : itemList;
    }

    return (
      <div>
        <label htmlFor="search">Search for notebooks and notes</label>
        <input className="form-control" 
              placeholder="Search by title or content..."
              value={this.state.inputValue}
              onChange={onFilterChange}
        />
        {displayResult()}
      </div>
    );
  };

}

module.exports = BackendUniversalSearch;