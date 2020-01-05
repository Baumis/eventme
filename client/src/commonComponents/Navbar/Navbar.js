import React, { Component } from 'react'
import './Navbar.css'
import User from '../User/User'
import SiteLogo from '../SiteLogo/SiteLogo'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageOnTop: true
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.checkScrollPosition)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkScrollPosition)
    }

    checkScrollPosition = () => {
        if (window.pageYOffset > 0) {
            this.setState({ pageOnTop: false })
        } else {
            this.setState({ pageOnTop: true })
        }
    }

    render() {
        const bg = this.state.pageOnTop || window.innerWidth < 450 ? 'transparent' : 'white'
        return (
            <div className="Navbar" style={{ background: bg }}>
                <div className="NavBarItem">
                    <SiteLogo />
                </div>
                <div className="NavBarItem"><User afterSign={this.props.afterSign} /></div>
            </div>
        )
    }
}

export default Navbar