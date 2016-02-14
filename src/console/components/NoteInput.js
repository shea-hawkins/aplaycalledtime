import React, { Component } from 'react';
import Relay from 'react-relay';
import AddStatMutation from '../mutations/AddStatMutation';

class StatInput extends Component {
  newStat = {
                      name: this.props.noteBlock.statTypes[0].type,
                      type: "note"
                    };
  addStat = () => {
    console.log(this.newStat.value);
    Relay.Store.update(new AddStatMutation({
        statBlock: this.props.noteBlock,
        stat: this.newStat
      })
    );
  }
  _handleChange = (e) => {
    if (e.target.id === "value") {
      this.newStat.value = e.target.value;
    }
    if (e.target.id === "conf") {
      this.newStat.conf = e.target.value;
    }
    if (e.target.id === "name") {
      this.newStat.name = e.target.value;
    }
  }
  render() {
    return (
    <tfoot className="full-width">
      <tr>
        <th className="center aligned">
                  <input className = "ui input" id="value" onChange={this._handleChange}></input>
        </th>
      </tr>
      <tr>
        <th>
          <button className = "ui right floated button" onClick={this.addStat}>Submit</button>
        </th>
      </tr>
    </tfoot>);
  }
}

export default Relay.createContainer(NoteInput, {
  fragments: {
    noteBlock: () => Relay.QL`
      fragment on StatBlock {
        type,
        ${AddStatMutation.getFragment('noteBlock')},
        statTypes {
          type
        }
      }
    `
  }
});
