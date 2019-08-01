import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { onLogoutUser } from '../actions'
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarBrand,
    Navbar,
    NavbarToggler, 
    Nav,
    NavItem,
    UncontrolledDropdown
    } from 'reactstrap';

class Header extends Component {

    state = {
        dropdownOpen: false
    };
    
    toggle = () => {
    this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
    }));
    }

    onButtonClick = () => {
        this.props.onLogoutUser()
    }

    render(){
        // Jika belum login
        if(!this.props.id){
            return (
                <Navbar color="light" light expand="md">
                    <div className="container">
                        <Link className="navbar-brand" to="/">ReactMongoose</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link className="nav-link" to="/">Tasks</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/register"><Button className="mx-3" color="primary">Register</Button></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login"><Button color="success">Login</Button></Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            )
        }

        return (
            <Navbar color="light" light expand="md">
            <div className="container">
                <NavbarBrand href="/">ReactMongoose</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/">Tasks</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hallo {this.props.name}
                            </DropdownToggle>
                            <DropdownMenu right>
                            <Link className="dropdown-item" to="/profile">
                                <DropdownItem>Profile</DropdownItem>
                            </Link>
                            <Link className="dropdown-item" to="/editprofile">
                                <DropdownItem>Edit Profile</DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <Link to='/login'>
                            <Button className="dropdown-item" onClick={this.onButtonClick} >
                                Log out
                            </Button>
                            </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.id,
        name: state.auth.name
    }
}

export default connect(mapStateToProps,{onLogoutUser})(Header)