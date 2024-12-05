import { TableBuilder, type Knex } from "knex";
import { onUpdateTrigger } from "../../knexfile";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('food_users', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('daily_progress_id').unsigned().notNullable();
        table.foreign('daily_progress_id').references('id').inTable('daily_progresses').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('name');
        table.dateTime('date');
        table.float('calory');
        table.float('protein');
        table.float('carbohydrate');
        table.float('fat');
        table.timestamps(true, true);
    })

    await knex.raw(onUpdateTrigger('food_users'));
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('food_users');
}

