const React = require('react');

class FrontendSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }

  render() {
    const onNoteFilterChange = (event) => {
      this.setState({
        inputValue: event.target.value
      });
      this.props.isSearching(
        event.target.value === '' ? false : true
      );
    };

    // Return a filter list of notes base on inputValue
    const displayResult = () => {
      const filterNotes = this.props.notes.filter(note => {
        return note.title.toLowerCase().includes(this.state.inputValue.toLowerCase())
            || note.content.toLowerCase().includes(this.state.inputValue.toLowerCase());
      });
      return this.state.inputValue === '' ? '' : filterNotes.map(this.props.createNoteListItem);
    }

    return(
      <div>
          <label htmlFor="search">Search for note</label>
          <input className="form-control" 
              placeholder="Search by title or content..."
              value={this.state.inputValue}
              onChange={onNoteFilterChange}
          />
          {displayResult()}
      </div>
    );
  }


}

module.exports = FrontendSearch;