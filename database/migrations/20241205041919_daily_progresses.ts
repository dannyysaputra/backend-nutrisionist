import type { Knex } from "knex";
import { onUpdateTrigger } from "../../knexfile";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('daily_progresses', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.dateTime('date');
        table.float('consumed_protein');
        table.float('consumed_calory');
        table.timestamps(true, true);
    })

    await knex.raw(onUpdateTrigger('daily_progresses'))
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('daily_progresses')
}

