module.exports = async () => {
    console.log('TEARDOWN')
    await global.mongod.stop()
}