import { Sequelize } from 'sequelize'

const connection = new Sequelize({
    dialect: 'postgres',
    host: 'postgres',
    password: 'postgres',
    username: 'postgres',
    port: 5432
})

export default connection