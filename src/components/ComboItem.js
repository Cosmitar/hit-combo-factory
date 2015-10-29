'use strict'
import React, {Component} from 'react';

class ComboItem extends Component {
    render() {
        return (
            <table className="table">
                <tr className="ComboItem-item-row">
                    <td className="ComboItem-first-cell">
                        {this.props.combo.tracks[0].name}
                    </td>
                    <td>
                        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                    </td>
                    <td>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </td>
                </tr>
                <tr className="ComboItem-item-row">
                    <td className="ComboItem-first-cell">
                        {this.props.combo.tracks[1].name}
                    </td>
                    <td>
                        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                    </td>
                    <td>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </td>
                </tr>
            </table>
        );
    }
}

export default ComboItem;