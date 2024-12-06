import type { Knex } from "knex";
import { onUpdateTrigger } from '../../knexfile';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('physical_datas', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.float('weight');
        table.float('height');
        table.enu('daily_activity', [
            'sedentary', 'light', 'moderate', 'active', 'very_active'
        ]);
        table.float('target_calory');
        table.float('target_protein');
        table.timestamps(true, true);
    })

    await knex.raw(onUpdateTrigger('physical_datas'));
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('physical_datas');
}

