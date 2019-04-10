const components = [
    {
        type: "Text",
        id: 1,
        header: "headerTest1",
        content: "This is quality content"
    },
    {
        type: "Text",
        id: 2,
        header: "headerTest2",
        content: "This is quality content"
    }
]

const getAll = () => {
    return components
}

const getOne = (id) => {
    return components.find((component) => component.id === id)
}

const create = (header, content) => {
    components.push({
        id: components.length + 1,
        header,
        content
    })
}

export default { getAll, getOne, create }