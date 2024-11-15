import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('email').unique();
        table.string('username').unique();
        table.string('password');
        table.date('dob').nullable();
        table.enu('gender', ['male', 'female']).nullable();
        table.string('avatar').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

