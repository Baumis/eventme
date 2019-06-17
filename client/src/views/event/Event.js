import React, { Component } from 'react'
import './Event.css'
import Header from './components/Header/Header'
import ComponentAdder from './components/ComponentContainer/ComponentAdder'
import ComponentContainer from './components/ComponentContainer/ComponentContainer'
import OptionsPanel from './components/OptionsPanel/OptionsPanel'
import eventService from '../../services/events'
import SaveButton from './components/SaveButton/SaveButton'
import ComponentEditor from './components/ComponentEditor/ComponentEditor'
import OptionsButton from './components/OptionsButton/OptionsButton'
import User from './components/User/User'

class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            saved: true,
            optionsPanel: '0px',
            editor: {
                show: false,
                order: null
            },
            event: null
        }
    }

    async componentDidMount() {
        const event = await eventService.getOne('5d07dcafa37e6c0904b17423')
        await this.setState({
            loading: false,
            event
        })
        console.log(this.state)
    }

    addComponent = async (type, data) => {
        console.log('TODO: add component: ' + type)
        console.log(data)
    }

    addGuest = async (name) => {
        console.log('TODO: add guest: ' + name)
    }

    deleteComponent = async (order) => {
        console.log('TODO: delete component: ' + order)
    }

    slidePanel = () => {
        if (this.state.optionsPanel === '0px') {
            this.setState({ optionsPanel: '-300px' })
        } else {
            this.setState({ optionsPanel: '0px' })
        }
    }

    changeBackground = (event) => {
        const oldEvent = this.state.event
        oldEvent.settings.background = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeLabel = (event) => {
        const oldEvent = this.state.event
        oldEvent.label = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeSlug = (event) => {
        const oldEvent = this.state.event
        oldEvent.settings.slug = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    saveState = () => {
        this.setState({ saved: true })
        console.log('save state function')
        //save state to backend
    }

    changePhone = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.phone = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeContact = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.contact = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeDate = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.date = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeAddress = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.address = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    showEditor = (order) => {
        this.setState({
            editor: {
                show: true,
                order: order
            }
        })
    }

    closeEditor = () => {
        this.setState({
            editor: {
                show: false,
                order: this.state.editor.order
            }
        })
    }

    saveComponentData = (order, data, type) => {
        let oldEvent = this.state.event
        oldEvent.components[order - 1].data = data
        oldEvent.components[order - 1].type = type
        this.setState({ event: oldEvent })
        this.closeEditor()
    }

    render() {
        if (this.state.loading) {
            return null
        }

        return (
            <div className='Event'>
                <Header
                    label={this.state.event.label}
                    background={this.state.event.settings.background}
                    save={this.saveHeader}
                    phone={this.state.event.infoPanel.phone}
                    address={this.state.event.infoPanel.address}
                    date={this.state.event.infoPanel.date}
                    contact={this.state.event.infoPanel.contact}
                />
                <User />
                <ComponentContainer
                    components={this.state.event.components}
                    guests={this.state.event.guests}
                    deleteComponent={this.deleteComponent}
                    showEditor={this.showEditor}
                />
                <ComponentAdder add={this.addComponent} />
                <OptionsPanel
                    background={this.state.event.settings.background}
                    label={this.state.event.label}
                    infoPanel={this.state.event.infoPanel}
                    guests={this.state.event.guests}
                    left={this.state.optionsPanel}
                    slidePanel={this.slidePanel}
                    changeLabel={this.changeLabel}
                    changeBackground={this.changeBackground}
                    changePhone={this.changePhone}
                    changeContact={this.changeContact}
                    changeDate={this.changeDate}
                    changeAddress={this.changeAddress}
                />
                <OptionsButton
                    showPanel={this.slidePanel}
                />
                {this.state.editor.show
                    ? (<ComponentEditor
                        close={this.closeEditor}
                        component={this.state.event.components.find(component => component.order === this.state.editor.order)}
                        saveData={this.saveComponentData}
                    />)
                    : (null)
                }
                <SaveButton save={this.saveState} saved={this.state.saved}></SaveButton>
            </div>
        )
    }
}

export default Event