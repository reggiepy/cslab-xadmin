import React from 'react'
import { Block } from 'xadmin'

export default class Main extends React.Component {

  render() {
    return (
      <>
        <Block name="body" />
        <div className="xadmin-main">
          {this.props.children}
        </div>
      </>
    )
  }

}
