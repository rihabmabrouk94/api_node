--break_employee_by_day
SELECT * FROM breaks as b
LEFT JOIN usersessions as us on us.usersession_id=b.usersession_id
LEFT JOIN break_types as bt on b.breaktype_id= bt.break_type_id

WHERE b.start_time >= '2019-04-27 00:00:00' and b.start_time <= '2019-04-27 23:59:59' and b.active = 'Y'
and b.start_time IS NOT NULL
and b.end_time IS NOT NULL
and b.end_time >= b.start_time






-- get global productivity

SELECT count(vesd.*) as total_employees,
SUM(vesd.productivity)/count(vesd.*) as global_productivity

FROM views_employee_stats_by_day as vesd

WHERE vesd.day_session = '20190510'

GROUP BY vesd.day_session




-- get user logged in current day
SELECT count(t01.*) as total_employees_logged
FROM views_user_sessions_status_by_day as t01
WHERE day_session = '20190510'



-- get user employees operators
SELECT count(t02.*) as total_employees
FROM employees as t02
WHERE t02.job_id = 1 and t02.active ='Y'





-- get total employees and logged employees
SELECT * FROM (SELECT count(t02.emp_id) total_employees, tO3.total_employees_logged
FROM employees t02
LEFT JOIN (SELECT count(t01.*) as total_employees_logged FROM views_user_sessions_status_by_day as t01 WHERE day_session = '20190510') as tO3 ON 1=1
WHERE t02.job_id = 1 and t02.active ='Y' GROUP BY tO3.total_employees_logged) as tg LIMIT 1






-- stats per hours
SELECT
vcd.date_operation,
vcd.date_hour_operation::int,
SUM(vcd.quantity) as quantity,
SUM(total_time_needed) as total_time_needed,
count(*) as count_operations,
SUM(total_time_needed) / (t_attendance.total_employees_logged * 3600) * 100 as productivity

FROM views_cps_data as vcd
LEFT JOIN (SELECT * FROM (SELECT count(t02.emp_id) total_employees, tO3.total_employees_logged
FROM employees t02
LEFT JOIN (SELECT count(t01.*) as total_employees_logged FROM views_user_sessions_status_by_day as t01 WHERE day_session = '20190510') as tO3 ON 1=1
WHERE t02.job_id = 1 and t02.active ='Y' GROUP BY tO3.total_employees_logged) as tg LIMIT 1) as t_attendance on 1 = 1
WHERE vcd.date_operation = '20190510'

GROUP BY vcd.date_operation, vcd.date_hour_operation, t_attendance.total_employees_logged









---- other queries:
-- total maintenance all by day
SELECT SUM(t01.offline_duration) as total_duration_mtsk_system
FROM views_maintenance_task_data as t01
WHERE t01.day_maintenance_task = '20190510';

-- total maintenance system by day
SELECT SUM(t02.offline_duration) as total_duration_mtsk_system
FROM views_maintenance_task_data as t02
WHERE t02.day_maintenance_task = '20190515' and t02.source = 'system';

-- total maintenance manuel by day
SELECT SUM(t03.offline_duration) as total_duration_mtsk_manuel
FROM views_maintenance_task_data as t03
WHERE t03.day_maintenance_task = '20190515' and t03.source = 'manuel';


-- total time break by day
SELECT SUM(t04.total_time_break) as total_time_break, t04.day_break as day_break
FROM views_employee_breaks_by_day as t04
WHERE t04.day_break = '20190506'
GROUP BY t04.day_break


-- total time work by day
SELECT SUM(t05.time_passed) as total_time_passed, t05.date_operation as date_operation
FROM views_cps_data as t05
WHERE t05.date_operation = '20190513'
GROUP BY t05.date_operation






--- query maintenance available
SELECT TG.total_machines,
TG.total_runned_time_needed,
TG.total_duration_mtsk_manuel,
TG.total_duration_mtsk_system,
TG.total_time_break,
TG.total_time_work,
TG.total_runned_time_needed - (TG.total_duration_mtsk_manuel + TG.total_duration_mtsk_system + TG.total_time_break + TG.total_time_work) as total_time_no_work,
TG.total_time_work as total_run_time,
TG.total_runned_time_needed - TG.total_time_work as total_down_time,
100 -((TG.total_duration_mtsk_manuel + TG.total_duration_mtsk_system) / TG.total_runned_time_needed * 100) as machines_disponibility

FROM(
	SELECT
count(mch.*) as total_machines,
CASE WHEN (TO_CHAR(now()::date, 'yyyymmdd') = '20190515') THEN ((date_part('epoch'::text, CURRENT_TIMESTAMP) - (date_part('epoch'::text, now()::date) + (8 * 3600))) * count(mch.*)) ELSE (count(mch.*) * 10 * 3600) END as total_runned_time_needed,
CASE WHEN TG_mtsk_manuel.total_duration_mtsk_manuel IS NOT NULL THEN TG_mtsk_manuel.total_duration_mtsk_manuel ELSE 0 END as total_duration_mtsk_manuel,
CASE WHEN TG_mtsk_system.total_duration_mtsk_system IS NOT NULL THEN TG_mtsk_system.total_duration_mtsk_system ELSE 0 END as total_duration_mtsk_system,
CASE WHEN TG_breaks.total_time_break IS NOT NULL THEN TG_breaks.total_time_break ELSE 0 END as total_time_break,
CASE WHEN TG_work.total_time_passed IS NOT NULL THEN TG_work.total_time_passed ELSE 0 END as total_time_work


FROM machines as mch

LEFT JOIN (SELECT SUM(t03.offline_duration) as total_duration_mtsk_manuel FROM views_maintenance_task_data as t03 WHERE t03.day_maintenance_task = '20190515' and t03.source = 'manuel') as TG_mtsk_manuel on  1 = 1
LEFT JOIN (SELECT SUM(t03.offline_duration) as total_duration_mtsk_system FROM views_maintenance_task_data as t03 WHERE t03.day_maintenance_task = '20190515' and t03.source = 'system') as TG_mtsk_system on  1 = 1
LEFT JOIN (SELECT SUM(t04.total_time_break) as total_time_break, t04.day_break as day_break FROM views_employee_breaks_by_day as t04 WHERE t04.day_break = '20190515'GROUP BY t04.day_break) as TG_breaks on 1 = 1
LEFT JOIN (SELECT SUM(t05.time_passed) as total_time_passed, t05.date_operation as date_operation FROM views_cps_data as t05 WHERE t05.date_operation = '20190515' GROUP BY t05.date_operation) as TG_work on 1 = 1
WHERE mch.active = 'Y'

GROUP BY TG_mtsk_manuel.total_duration_mtsk_manuel, TG_mtsk_system.total_duration_mtsk_system, TG_breaks.total_time_break, TG_work.total_time_passed) as TG





