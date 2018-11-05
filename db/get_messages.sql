select distinct on (m.id) * from messages m 
join pixals p on p.number_date = m.number_date
where m.user_id = $1 order by m.id desc, m.number_date desc;