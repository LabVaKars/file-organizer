import knex from 'knex'

export async function setupDB(dbPath:string) {

    const knSqlite = knex({
        client: 'sqlite3',
        connection: {
            filename: dbPath
        },
        useNullAsDefault: true
    });

    await knSqlite.schema.hasTable('folders').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('folders', function(t) {
                t.increments('id').primary();
                t.text('name');
                t.text('description');
                t.text('path');
            });
        }
        return
    });

    await knSqlite.schema.hasTable('filters').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('filters', function(t) {
                t.increments('id').primary();
                t.text('name');
                t.text('description');
                t.text('field');
                t.text('comparator');
                t.text('value');
            });
        }
        return
    });

    await knSqlite.schema.hasTable('actions').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('actions', function(t) {
                t.increments('id').primary();
                t.text('name');
                t.text('description');
                t.integer('sourceId');
                t.integer('destinationId');
                t.text('type');
                t.text('pattern');
                t.integer('includeSubfolders');
                t.foreign('sourceId').references('folders.id').withKeyName('fk_actions_sourceId_folders_id');
                t.foreign('destinationId').references('folders.id').withKeyName('fk_actions_destinationId_folders_id');
            });
        }
        return
    });

    await knSqlite.schema.hasTable('conditions').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('conditions', function(t) {
                t.increments('id').primary();
                t.text('name');
                t.text('description');
                t.text('assosiation');
            });
        }
        return
    });


    await knSqlite.schema.hasTable('conditionParts').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('conditionParts', function(t) {
                t.increments('id').primary();
                t.integer('filterId');
                t.integer('conditionId');
                t.integer('subConditionId');
                t.foreign('filterId').references('id').inTable('filters').withKeyName('fk_conditionParts_filterId_filters_id');
                t.foreign('conditionId').references('id').inTable('conditions').withKeyName('fk_conditionParts_conditionId_conditions_id');
                t.foreign('subConditionId').references('id').inTable('conditions').withKeyName('fk_conditionParts_subConditionId_conditions_id');
            });
        }
        return
    });

    await knSqlite.schema.hasTable('timetables').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('timetables', function(t) {
                t.increments('id').primary();
                t.text('name');
                t.text('description');
                t.text('startDate');
                t.text('startTime');
                t.integer('frequency');
                t.text('frequencyMeasure');
            });
        }
        return
    });

    await knSqlite.schema.hasTable('rules').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('rules', function(t) {
                t.increments('id').primary();
                t.text('name');
                t.text('description');
                t.integer('actionId');
                t.integer('conditionId');
                t.integer('timetableId');
                t.integer('active');
                t.foreign('actionId').references('actions.id').withKeyName('fk_rules_actionId_actions_id');
                t.foreign('conditionId').references('conditions.id').withKeyName('fk_rules_conditionId_conditions_id');
                t.foreign('timetableId').references('timetables.id').withKeyName('fk_rules_timetableId_timetables_id');
            });
        }
        return
    });

}

export async function dropDB(dbPath:string){
    const knSqlite = knex({
        client: 'sqlite3',
        connection: {
            filename: dbPath
        },
        useNullAsDefault: true
    });

    await knSqlite.schema.dropTableIfExists('rules')
    await knSqlite.schema.dropTableIfExists('conditionParts')
    await knSqlite.schema.dropTableIfExists('folders')
    await knSqlite.schema.dropTableIfExists('filters')
    await knSqlite.schema.dropTableIfExists('conditions')
    await knSqlite.schema.dropTableIfExists('actions')
}
