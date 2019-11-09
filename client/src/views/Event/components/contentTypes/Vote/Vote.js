import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Vote.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'
import VoteOptions from './VoteOptions/VoteOptions'
import VoteResults from './VoteResults/VoteResults'

class Vote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: null
        }
    }

    changeSubject = (event) => {
        this.props.changeData({ ... this.props.component.data, subject: event.target.value})
    }

    changeOption = (optionIndex, event) => {
        this.props.component.data.options[optionIndex].content = event.target.value
        this.props.changeData({ ... this.props.component.data })
    }

    newOptions = () => {
        const optionObject = {
            _id: this.generateUUIDv4(),
            content: 'new option'
        }
        this.props.component.data.options.push(optionObject)
        this.props.changeData({ ... this.props.component.data })
    }

    removeOption = (optionIndex) => {
        this.props.component.data.options.splice(optionIndex, 1)
        this.props.changeData({ ... this.props.component.data })
    }

    submit = () => {
        if (this.state.checked === null) {
            return
        }

        if (!this.props.UserStore.currentUser) {
            alert('Sign In to vote!')
            return
        }

        if (this.hasVoted()) {
            return
        }

        const vote = {
            userId: this.props.UserStore.currentUser._id,
            optionId: this.props.component.data.options[this.state.checked]._id
        }

        this.props.component.interactiveData.push(vote)
    }

    setChecked = (index) => {
        this.setState({ checked: index })
    }

    hasVoted = () => {
        const userId = this.props.UserStore.currentUser._id
        return this.props.component.interactiveData.some(vote => vote.userId === userId)
    }

    generateUUIDv4 = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    render() {
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        const hasVoted = this.hasVoted()
        console.log(this.props.component)
        return (
            <div className="vote-component">
                <div className={"vote-component-subject " + borderStyle}>
                    <EditableWrapper
                        html={this.props.component.data.subject}
                        editable={!this.props.edit}
                        onChange={this.changeSubject}
                    />
                </div>
                {hasVoted && !this.props.edit ?
                    <VoteResults
                        options={this.props.component.data.options}
                        votes={this.props.component.interactiveData}
                    />
                    :
                    <VoteOptions
                        edit={this.props.edit}
                        options={this.props.component.data.options}
                        setChecked={this.setChecked}
                        checked={this.state.checked}
                        newOptions={this.newOptions}
                        submit={this.submit}
                        changeOption={this.changeOption}
                        removeOption={this.removeOption}
                    />
                }
            </div>
        )
    }
}

export default inject('UserStore')(observer(Vote))