select distinct m.id, m.date, m.message, p.mood, m.picture from messages m 
join pixals p on p.date = m.date
where p.user_id = $1 and m.user_id =$1 order by m.id desc;