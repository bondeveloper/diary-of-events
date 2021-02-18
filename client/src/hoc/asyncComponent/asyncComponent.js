import React, { Component } from 'react';

const asyncComponent = importedCompoent => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importedCompoent().then( cpm => {
                this.setState({ component: cpm.default });
            })
        }

        render () {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null
        }
    }
}

export default asyncComponent;