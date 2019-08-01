import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'

class Home extends Component {

    state = {
        task: [],
        taskCompleted: false
    }

    componentDidMount(){
        this.getTask()
    }

    getTask = () => {
        axios.get(
            '/tasks/'+ this.props.id
        ).then(res => {
            this.setState({task: res.data})
        })
    }

    addTask = () => {
        const description = this.task.value
    
        // Cari user berdasarkan id
        axios.post(
            '/tasks/' + this.props.id,
            {
                description
            }
        ).then(() => {
            this.getTask()
        })
    }

    onTaskComplete = (task) => {
        console.log(task);
        
        axios.patch('/tasks/'+ this.props.id + '/' + task._id
        ).then(()=> {
            this.getTask()
        })
    }

    renderlist = () => {
        return this.state.task.map(item => { // _id, descriptipon, completed
            if(item.completed !== this.state.taskCompleted){
            return (
                <li className='list-group-item d-flex justify-content-between bg-success'>
                    <span>{item.description}</span>
                    <span>
                        <button className='btn btn-dark' onClick={()=>{this.onTaskComplete(item)}}>
                            SELESAI
                        </button>
                    </span>
                </li>
            )
            } else {
            return (
                <li className='list-group-item d-flex justify-content-between' >
                    <span>{item.description}</span>
                    <span>
                        <button className='btn btn-outline-primary' onClick={()=>{this.onTaskComplete(item)}}>
                            DONE
                        </button>
                    </span>
                </li>
            )
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
                <ul className="list-group list-group-flush mb-5"></ul>
                {this.renderlist()}
                <form className="form-group mt-5">
                    <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.task = input}/>
                </form>
                <button type="submit" className="btn btn-block btn-primary mt-3" onClick={() => this.addTask(this.props.id)}>Up !</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(Home)