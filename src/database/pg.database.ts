import { Pool } from "pg";

export const dbConnection = new Pool({

    connectionString: "postgres://notes_ddic_user:w1ZrHFmNI2wqMRA2iZF6zuz2PRvqnqgE@dpg-cdcai84gqg48t04bs90g-a.singapore-postgres.render.com/notes_ddic",

    ssl: {
        rejectUnauthorized: false
    }

})