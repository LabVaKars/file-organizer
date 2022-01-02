import { knSqlite } from "../db/dbUtils";

export async function setupDB() {

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
                t.text('type');
                t.text('params');
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


    await knSqlite.schema.hasTable('rules').then( (exists) => {
        if (!exists) {
            return knSqlite.schema.createTable('rules', function(t) {
                t.increments('id').primary();
                t.integer('sourceId');
                t.integer('destincationId');
                t.integer('actionId');
                t.integer('conditionId');
                t.foreign('sourceId').references('folder.id').withKeyName('fk_rules_sourceId_folders_Id');
                t.foreign('destincationId').references('folder.id').withKeyName('fk_rules_destinationId_folders_id');
                t.foreign('actionId').references('actions.id').withKeyName('fk_rules_actionId_actions_id');
                t.foreign('conditionId').references('conditions.id').withKeyName('fk_rules_conditionId_conditions_id');
                t.boolean('includeSubfolders');
            });
        }
        return
    });
}

export async function dropDB(){
    await knSqlite.schema.dropTableIfExists('rules')
    await knSqlite.schema.dropTableIfExists('conditionParts')
    await knSqlite.schema.dropTableIfExists('folders')
    await knSqlite.schema.dropTableIfExists('filters')
    await knSqlite.schema.dropTableIfExists('conditions')
    await knSqlite.schema.dropTableIfExists('actions')
}
