insert into messages (user_id, date, message, picture)
values ($1, $2, $3, $4) returning *;