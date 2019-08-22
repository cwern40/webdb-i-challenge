const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error retrieving accounts"
            })
        })
})

server.get('/:id', (req, res) => {
    const { id } = req.params

    db('accounts').where({ id })
        .then(account => {
            res.json(account[0])
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error retrieving account'
            })
        })
})

server.post('/', (req, res) => {
    const accountData = req.body

    db('accounts').insert(accountData)
        .then(account => {
            res.status(201).json(account[0])
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Unable to add account"
            })
        })
})

server.put('/:id', (req, res) => {
    const { id } = req.params
    const updateData = req.body
    
    db('accounts').where({ id }).update(updateData)
        .then(update => {
            res.json(update)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'unable to update account'
            })
        })
})

module.exports = server;