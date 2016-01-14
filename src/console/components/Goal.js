import React from 'react';
import Relay from 'react-relay';

class Goal extends React.Component {
  render() {
    var goal = this.props.goal;
    return (
      <table className="ui celled padded table">
        <thead>
          <tr><th className="single line">{`Goals: ${goal.type}`}</th></tr>
          <tr>
            <th className="single line">Exercise</th>
            <th className="single line">Goal</th>
          </tr>
        </thead>
        <tbody>
        {goal.stats.edges.map((e) => {
          return (
            <tr key={e.id}>
              <td>
                <h2 className="center aligned">{e.node.name}</h2>
              </td>
              <td>
                {this.props.goalUpdate ?
                  <input className="center aligned" id={e.node.id} placeholder={e.node.value} onChange={this.props.handleGoalUpdateChange} />
                :
                  <h2 className="center aligned">{e.node.value}</h2>
                }
              </td>
            </tr>);
        })}
        </tbody>
    </table>);
  }
}

export default Relay.createContainer(Goal, {
  fragments: {
    goal: () => Relay.QL`
      fragment on StatBlock {
        type,
        stats(first: 5) {
          edges {
            node {
              id,
              name,
              value
            }
          }
        }
      }
    `
  }
});
