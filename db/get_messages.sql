select * from messages m 
join pixals p on p.number_date = m.number_date
where m.user_id = 1 order by m.number_date desc, m.id desc;