import database from '../../database.js';
import argon from "argon2";
import jwt from "jsonwebtoken";
class Model {

    constructor() {
        this.db = database;
    }

    async DB() {
        return this.db.promise();
    }

    async find(table, details) {
        const db = await this.DB();
        const intialSql = `SELECT * FROM ${table}`;
        const where = [];
        for (const key in details) {
           if(details[key] != null) {
               where.push({
                   field: key,
                   value: details[key],
                   operator: "="
               })
           }
        }
        return db.query(
            where.reduce(
                (sql, {field, operator}, index) => `${sql} ${index === 0 ? 'WHERE' : 'AND'} ${field} ${operator} ?`,
                intialSql
            ),
            where.map(({value}) => value)
        )

    }
    
    async findAll(table) {
        const db = await this.DB();
        return db.query(`SELECT * FROM ${table}`); 
    }

    async findById(table, id) {
        const db = await this.DB();
        const sql = `SELECT * FROM ${table} WHERE id = ${id}`;
        return db.query(sql)
    }

    async findByEmail(table, email) {
        const db = await this.DB();
        const sql = `SELECT * FROM ${table} WHERE email = '${email}'`;
        return db.query(sql)
    }

    async findByToken(table, token) {
        const db = await this.DB();
        const sql = `SELECT * FROM ${table} WHERE token = '${token}'`;
        return db.query(sql)
    }

    async create(table, details) {
        const db = await this.DB();
        const sql = `INSERT INTO ${table} SET ?`;
        return db.query(sql, details)
    }

    async update(table, details) {
        const db = await this.DB();
        const sql = `UPDATE ${table} SET ? WHERE id = ${details.id}`;
        return db.query(sql, details)
    }

    async delete(table, id) {
        const db = await this.DB();
        const sql = `DELETE FROM ${table} WHERE id = ${id}`;
        return db.query(sql)
    }


    async oneToMany(table, table2, id) {
        const db = await this.DB();
        const sql = `SELECT * FROM ${table} WHERE ${table2}_id = ${id}`;
        return db.query(sql)
    }

    async manyToMany(table, table2, table3, id) {
        const db = await this.DB();
        const sql = `SELECT * FROM ${table} WHERE ${table2}_id = ${id} AND ${table3}_id = ${id}`;
        return db.query(sql)
    }

    hashingOptions = {
        hashLength: 32,
        timeCost: 3,
        memoryCost: 1024,
        parallelism: 1,
        type: argon.argon2id
    }

    async hashPassword(password) {
        return argon.hash(password, this.hashingOptions);
    }

    async verifyPassword(password, hash) {
        return argon.verify(hash, password);
    }

    generateToken(payload) {
        return jwt.sign({id: payload}, process.env.JWT_SECRET, {
            expiresIn: 86400
        })
    }

}

export default Model;