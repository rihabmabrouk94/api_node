DROP VIEW IF EXISTS views_employee_stats_by_day_by_line ;
DROP VIEW IF EXISTS views_employee_stats_by_day;
DROP VIEW IF EXISTS views_user_sessions_status_by_day;
DROP VIEW IF EXISTS views_cps_data_by_employee_by_day_by_line;
DROP VIEW IF EXISTS views_user_sessions_status_by_day_by_line;
DROP VIEW IF EXISTS views_employee_breaks_by_day;
DROP VIEW IF EXISTS views_employee_breaks_by_day_by_line;
DROP VIEW IF EXISTS views_cps_data_by_employee_by_day;
DROP VIEW IF EXISTS views_cps_data;
DROP VIEW IF EXISTS views_user_online_by_day_by_line;
DROP VIEW IF EXISTS views_user_online_by_day;
DROP VIEW IF EXISTS views_user_in_break_by_day;
DROP VIEW IF EXISTS views_user_in_break_by_day_by_line;






-- views_cps_data
CREATE VIEW views_cps_data AS

SELECT
cps.cart_pending_session_id,
cps.cart_pendingoperation_id,
cps.session_id,
us.employee_id,
TO_CHAR(us.time_in::DATE, 'yyyymmdd') as date_operation,
concat(to_char(us.time_in::date::timestamp with time zone, 'yyyymmdd'::text), to_char(us.time_in::time, 'HH24'::text)) date_hour_operation,
cps.quantity,
cps.start_time,
cps.end_time,
(date_part('epoch'::text, cps.end_time) - date_part('epoch'::text, cps.start_time))::real::integer as time_passed,
op.quantity as total_quantity_needed,
op.time * 60 as time_needed_by_item,
(op.time * 60) * cps.quantity as total_time_needed,
CASE WHEN cps.end_time < cps.start_time THEN 0 ELSE ((op.time * 60) * cps.quantity) / ((date_part('epoch'::text, cps.end_time) - date_part('epoch'::text, cps.start_time))::real::integer) * 100 END as efficiency,
bx.box_id as box_id,
bx.line_id as line_id

FROM cart_pending_sessions cps

LEFT JOIN cart_pending_operations as cpo on cpo.cart_pending_operation_id = cps.cart_pendingoperation_id and cpo.active = 'Y'

LEFT JOIN operations as op on op.operation_id = cpo.operation_id and op.active = 'Y'

LEFT JOIN usersessions as us on us.usersession_id = cps.session_id

LEFT JOIN boxes as bx on bx.box_id = us.box_id

WHERE cps.start_time IS NOT NULL and cps.end_time IS NOT NULL and cps.active = 'Y' and cps.quantity > 0

ORDER BY TO_CHAR(us.time_in::DATE, 'yyyymmdd') DESC
;







-- views_cps_data_by_employee_by_day
CREATE VIEW views_cps_data_by_employee_by_day AS

SELECT
vcpsd.employee_id, vcpsd.date_operation,
SUM(vcpsd.quantity) as total_quantity,
SUM(vcpsd.time_passed) as total_time_passed,
SUM(vcpsd.total_time_needed) as total_time_needed,
SUM(vcpsd.efficiency) / count(vcpsd.*) as total_efficiency
FROM views_cps_data as vcpsd
GROUP BY vcpsd.employee_id, vcpsd.date_operation;





-- views_cps_data_by_employee_by_day_by_line
CREATE VIEW views_cps_data_by_employee_by_day_by_line AS

SELECT
vcpsd.employee_id, vcpsd.date_operation,
SUM(vcpsd.quantity) as total_quantity,
SUM(vcpsd.time_passed) as total_time_passed,
SUM(vcpsd.total_time_needed) as total_time_needed,
SUM(vcpsd.efficiency) / count(vcpsd.*) as total_efficiency
FROM views_cps_data as vcpsd
GROUP BY vcpsd.employee_id, vcpsd.date_operation, vcpsd.line_id;








-- views_employee_breaks_by_day
CREATE VIEW views_employee_breaks_by_day AS

SELECT
TO_CHAR(b.start_time::DATE, 'yyyymmdd') as day_break,
us.employee_id,
SUM(date_part('epoch'::text, b.end_time) - date_part('epoch'::text, b.start_time)) as total_time_break,
MIN(b.start_time) as time_first_break,
MAX(b.end_time) as time_last_break,
count(b.*) as total_breaks

FROM breaks as b
LEFT JOIN usersessions as us on us.usersession_id = b.usersession_id
LEFT JOIN boxes as bx on bx.box_id = us.box_id

WHERE b.active = 'Y' and b.start_time IS NOT NULL and b.end_time IS NOT NULL and us.active = 'Y'
GROUP BY TO_CHAR(b.start_time::DATE, 'yyyymmdd'), us.employee_id;






-- views_employee_breaks_by_day_by_line
CREATE VIEW views_employee_breaks_by_day_by_line AS

SELECT
TO_CHAR(b.start_time::DATE, 'yyyymmdd') as day_break,
us.employee_id,
SUM(date_part('epoch'::text, b.end_time) - date_part('epoch'::text, b.start_time)) as total_time_break,
MIN(b.start_time) as time_first_break,
MAX(b.end_time) as time_last_break,
count(b.*) as total_breaks,
bx.line_id as line_id

FROM breaks as b
LEFT JOIN usersessions as us on us.usersession_id = b.usersession_id
LEFT JOIN boxes as bx on bx.box_id = us.box_id

WHERE b.active = 'Y' and b.start_time IS NOT NULL and b.end_time IS NOT NULL
GROUP BY TO_CHAR(b.start_time::DATE, 'yyyymmdd'), us.employee_id, bx.line_id;






-- views_user_in_break_by_day
CREATE VIEW views_user_in_break_by_day AS

SELECT
TO_CHAR(b.start_time::DATE, 'yyyymmdd') as day_break,
us.employee_id

FROM breaks as b

LEFT JOIN usersessions as us on us.usersession_id = b.usersession_id

LEFT JOIN boxes as bx on bx.box_id = us.box_id

WHERE b.active = 'Y' and b.start_time IS NOT NULL and b.end_time IS NULL and us.active = 'Y'
GROUP BY TO_CHAR(b.start_time::DATE, 'yyyymmdd'), us.employee_id;





-- views_user_in_break_by_day_by_line
CREATE VIEW views_user_in_break_by_day_by_line AS

SELECT
TO_CHAR(b.start_time::DATE, 'yyyymmdd') as day_break,
us.employee_id,
bx.line_id as line_id

FROM breaks as b

LEFT JOIN usersessions as us on us.usersession_id = b.usersession_id

LEFT JOIN boxes as bx on bx.box_id = us.box_id

WHERE b.active = 'Y' and b.start_time IS NOT NULL and b.end_time IS NULL and us.active = 'Y'
GROUP BY TO_CHAR(b.start_time::DATE, 'yyyymmdd'), us.employee_id, bx.line_id;






-- views_user_online_by_day
CREATE VIEW views_user_online_by_day AS

SELECT us.employee_id,
TO_CHAR(us.time_in::DATE, 'yyyymmdd') as day_session
FROM usersessions as us
WHERE us.employee_id IS NOT NULL and us.time_in IS NOT NULL
and us.active = 'Y' and ( (us.time_in <= us.time_out) OR (us.time_in IS NOT NULL AND us.time_out IS NULL) )
and us.time_out IS NULL

GROUP BY us.employee_id, TO_CHAR(us.time_in:: DATE, 'yyyymmdd')

ORDER BY TO_CHAR(us.time_in:: DATE, 'yyyymmdd') DESC;




-- views_user_online_by_day_by_line
CREATE VIEW views_user_online_by_day_by_line AS

SELECT us.employee_id,
TO_CHAR(us.time_in::DATE, 'yyyymmdd') as day_session,
bx.line_id as line_id

FROM usersessions as us

LEFT JOIN boxes as bx on bx.box_id = us.box_id

WHERE us.employee_id IS NOT NULL and us.time_in IS NOT NULL
and us.active = 'Y' and ( (us.time_in <= us.time_out) OR (us.time_in IS NOT NULL AND us.time_out IS NULL) )
and us.time_out IS NULL

GROUP BY us.employee_id, TO_CHAR(us.time_in:: DATE, 'yyyymmdd'), bx.line_id

ORDER BY TO_CHAR(us.time_in:: DATE, 'yyyymmdd') DESC;



-- # Views operator sessions status + time_passed
-- views_user_sessions_status_by_day
CREATE VIEW views_user_sessions_status_by_day AS


SELECT us.employee_id,
TO_CHAR(us.time_in::DATE, 'yyyymmdd') as day_session,
CASE WHEN count(vuibd.employee_id) <> 0 THEN 'in_break' WHEN vuod.employee_id IS NULL THEN 'offline' ELSE 'online' END as session_status,
MIN(us.time_in) as time_first_login,
CASE WHEN MAX(COALESCE(us.time_out, now()::DATE)) = now()::DATE THEN NULL ELSE MAX(us.time_out) END AS time_last_logout,
CASE WHEN MAX(COALESCE(us.time_out, now()::DATE)) = now()::DATE THEN NULL ELSE SUM(date_part('epoch'::text, us.time_out) - date_part('epoch'::text, us.time_in)) END as total_time_passed,
SUM(date_part('epoch'::text, (CASE WHEN us.time_out IS NULL THEN CURRENT_TIMESTAMP ELSE us.time_out END)) - date_part('epoch'::text, us.time_in))::integer as  total_time_passed_from_now,

array_agg(DISTINCT concat(bx.line_id, '__')::character varying) AS lines_ids,
array_agg(DISTINCT concat(bx.box_id, '__')::character varying) AS boxs_ids

FROM usersessions as us

LEFT JOIN boxes as bx on bx.box_id = us.box_id

INNER JOIN employees as emp on emp.emp_id = us.employee_id AND emp.active = 'Y' AND emp.job_id = 1

LEFT JOIN views_user_online_by_day as vuod on vuod.employee_id = us.employee_id and vuod.day_session = TO_CHAR(us.time_in::DATE, 'yyyymmdd')

LEFT JOIN views_user_in_break_by_day as vuibd on vuibd.employee_id = us.employee_id and vuibd.day_break = TO_CHAR(us.time_in::DATE, 'yyyymmdd')

WHERE us.employee_id IS NOT NULL and us.time_in IS NOT NULL and us.active = 'Y' and ( (us.time_in <= us.time_out) OR (us.time_in IS NOT NULL AND us.time_out IS NULL) )

GROUP BY us.employee_id, TO_CHAR(us.time_in:: DATE, 'yyyymmdd'), vuod.employee_id, vuibd.employee_id

ORDER BY TO_CHAR(us.time_in:: DATE, 'yyyymmdd') DESC;










-- views_user_sessions_status_by_day_by_line
CREATE VIEW views_user_sessions_status_by_day_by_line AS

SELECT us.employee_id,
TO_CHAR(us.time_in::DATE, 'yyyymmdd') as day_session,
CASE WHEN count(vuibdl) <> 0 THEN 'in_break' WHEN vuodl.employee_id IS NULL THEN 'offline' ELSE 'online' END as session_status,
MIN(us.time_in) as time_first_login,
CASE WHEN MAX(COALESCE(us.time_out, now()::DATE)) = now()::DATE THEN NULL ELSE MAX(us.time_out) END AS time_last_logout,
CASE WHEN MAX(COALESCE(us.time_out, now()::DATE)) = now()::DATE THEN NULL ELSE SUM(date_part('epoch'::text, us.time_out) - date_part('epoch'::text, us.time_in)) END as total_time_passed,
SUM(date_part('epoch'::text, (CASE WHEN us.time_out IS NULL THEN CURRENT_TIMESTAMP ELSE us.time_out END)) - date_part('epoch'::text, us.time_in))::integer as  total_time_passed_from_now,

bx.line_id as line_id,
array_agg(DISTINCT concat(bx.box_id, '__')::character varying) AS boxs_ids

FROM usersessions as us

LEFT JOIN boxes as bx on bx.box_id = us.box_id

LEFT JOIN views_user_online_by_day_by_line as vuodl on vuodl.employee_id = us.employee_id and vuodl.day_session = TO_CHAR(us.time_in::DATE, 'yyyymmdd') and bx.line_id = vuodl.line_id

LEFT JOIN views_user_in_break_by_day_by_line as vuibdl on vuibdl.employee_id = us.employee_id and vuibdl.day_break = TO_CHAR(us.time_in::DATE, 'yyyymmdd') and bx.line_id = vuibdl.line_id

WHERE us.employee_id IS NOT NULL and us.time_in IS NOT NULL and us.active = 'Y' and ( (us.time_in <= us.time_out) OR (us.time_in IS NOT NULL AND us.time_out IS NULL) )

GROUP BY us.employee_id, TO_CHAR(us.time_in:: DATE, 'yyyymmdd'), bx.line_id, vuodl.employee_id

ORDER BY TO_CHAR(us.time_in:: DATE, 'yyyymmdd') DESC;








-- views_employee_stats_by_day
CREATE VIEW views_employee_stats_by_day AS


SELECT

vussd.*,
vebd.total_time_break,
vebd.time_first_break,
vebd.time_last_break,
vebd.total_breaks,
vcpsded.total_quantity,
vcpsded.total_time_passed as operation_total_time_passed,
vcpsded.total_time_needed as operation_total_time_needed,
vcpsded.total_efficiency,
(vcpsded.total_time_needed / ((CASE WHEN vussd.time_last_logout IS NULL THEN vussd.total_time_passed_from_now ELSE vussd.total_time_passed END) -  (CASE WHEN vebd.total_time_break IS NULL THEN 0 ELSE vebd.total_time_break END) ) * 100) as productivity,
vussd.lines_ids as list_lines_ids,
vussd.boxs_ids as list_boxs_ids

FROM views_user_sessions_status_by_day as vussd
LEFT JOIN views_cps_data_by_employee_by_day as vcpsded on vcpsded.employee_id = vussd.employee_id and vcpsded.date_operation = vussd.day_session
LEFT JOIN views_employee_breaks_by_day as vebd on vebd.employee_id = vussd.employee_id and vebd.day_break = vussd.day_session and total_time_break > 0
ORDER BY day_session DESC;








-- views_employee_stats_by_day_by_line
CREATE VIEW views_employee_stats_by_day_by_line AS


SELECT vussdl.*,
vebdl.total_time_break,
vebdl.time_first_break,
vebdl.time_last_break,
vebdl.total_breaks,
vcpsdedl.total_quantity,
vcpsdedl.total_time_passed as operation_total_time_passed,
vcpsdedl.total_time_needed as operation_total_time_needed,
vcpsdedl.total_efficiency,
(vcpsdedl.total_time_needed / ((CASE WHEN vussdl.time_last_logout IS NULL THEN vussdl.total_time_passed_from_now ELSE vussdl.total_time_passed END) - vebdl.total_time_break) * 100) as productivity,
vussdl.line_id as employee_line_id

FROM views_user_sessions_status_by_day_by_line as vussdl
LEFT JOIN views_cps_data_by_employee_by_day_by_line as vcpsdedl on vcpsdedl.employee_id = vussdl.employee_id and vcpsdedl.date_operation = vussdl.day_session
LEFT JOIN views_employee_breaks_by_day_by_line as vebdl on vebdl.employee_id = vussdl.employee_id and vebdl.day_break = vussdl.day_session and total_time_break > 0
ORDER BY day_session DESC;


