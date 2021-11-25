import { createAction } from '@reduxjs/toolkit'

import * as c from 'tg_constants/TableConsts'

export const initTable = createAction(c.INIT_TABLE, (table) => {
    return {
        payload: {
            table
        }
    }
})