import store from './store.js'

// var theApp;

function useStore() 
{
    return store
}

function initStore({count,name}) 
{
    store.count = count
    store.name = name

    return store;
}

export {useStore,initStore}