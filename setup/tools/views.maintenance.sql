DROP VIEW IF EXISTS views_uplanned_brakedown_records;
DROP VIEW IF EXISTS views_maintenance_duration_total_by_day_by_source;
DROP VIEW IF EXISTS views_maintenance_duration_total_by_day;
DROP VIEW IF EXISTS views_mtsk_by_machine_by_day_by_group_status_by_source;
DROP VIEW IF EXISTS views_mtsk_by_machine_by_day_by_group_status;
DROP VIEW IF EXISTS views_mtsk_unplanned;
DROP VIEW IF EXISTS views_maintenance_task_data;







-- views_maintenance_task_data

CREATE VIEW views_maintenance_task_data AS

SELECT
mtsk.*,
m.line_id,
TO_CHAR(mtsk.created_at::DATE, 'yyyymmdd') as day_maintenance_task,
TO_CHAR(MAX(mfd.started_at)::DATE, 'yyyymmdd') as day_last_maintenance_feed,
concat(to_char(mtsk.created_at::date::timestamp with time zone, 'yyyymmdd'::text), to_char(mtsk.created_at::time, 'HH24'::text)) date_hour_maintenance_task,
count(mfd.maintenance_feed_id) as count_feeds,
MIN(mfd.started_at) as first_maintenance_feed_start,
MAX(mfd.finished_at) as last_maintenance_feed_end,
SUM((date_part('epoch'::text, mfd.finished_at) - date_part('epoch'::text, mfd.started_at))::real::integer) as total_time_maintenance,
CASE WHEN (mtsk.maintenance_status_id = 1) THEN date_part('epoch'::text, MAX(mfd.finished_at)) - date_part('epoch'::text, mtsk.created_at)  ELSE date_part('epoch'::text, CURRENT_TIMESTAMP) - date_part('epoch'::text, mtsk.created_at) END as offline_duration

FROM maintenance_tasks as mtsk

LEFT JOIN machines as m on m.machine_id = mtsk.machine_id and m.active = 'Y'

LEFT JOIN maintenance_feeds as mfd on mfd.maintenance_task_id = mtsk.maintenance_task_id and mfd.active = 'Y' and mfd.started_at IS NOT NULL and mfd.finished_at IS NOT NULL

WHERE mtsk.active = 'Y'

GROUP BY  mtsk.maintenance_task_id, m.line_id;







-- views_mtsk_by_machine_by_day_by_group_status
CREATE VIEW views_mtsk_by_machine_by_day_by_group_status AS

SELECT vmtskd.machine_id, vmtskd.day_maintenance_task, MAX(vmtskd.offline_duration) as max_offline_duration,
MIN(vmtskd.offline_duration) as min_offline_duration,
SUM(vmtskd.total_time_maintenance) as total_time_maintenance,
CASE WHEN maintenance_status_id = 1 THEN 'repared' ELSE 'not_repared' END as maintenance_group_status

FROM views_maintenance_task_data as vmtskd

GROUP BY vmtskd.machine_id, vmtskd.day_maintenance_task, (CASE WHEN maintenance_status_id = 1 THEN 'repared' ELSE 'not_repared' END );







-- views_mtsk_by_machine_by_day_by_group_status_by_source
CREATE VIEW views_mtsk_by_machine_by_day_by_group_status_by_source AS

SELECT vmtskd.machine_id, vmtskd.day_maintenance_task,
vmtskd.source,
MAX(vmtskd.offline_duration) as max_offline_duration,
MIN(vmtskd.offline_duration) as min_offline_duration,
SUM(vmtskd.total_time_maintenance) as total_time_maintenance,
CASE WHEN maintenance_status_id = 1 THEN 'repared' ELSE 'not_repared' END as maintenance_group_status

FROM views_maintenance_task_data as vmtskd

GROUP BY vmtskd.machine_id, vmtskd.day_maintenance_task, vmtskd.source, (CASE WHEN maintenance_status_id = 1 THEN 'repared' ELSE 'not_repared' END );








-- views_maintenance_duration_total_by_day
CREATE VIEW views_maintenance_duration_total_by_day AS

SELECT vmtskmdgs.day_maintenance_task,
SUM(vmtskmdgs.max_offline_duration) as total_offline_duration,
SUM(vmtskmdgs.total_time_maintenance) as total_time_maintenance,
SUM(vmtskmdgs.max_offline_duration) - SUM(vmtskmdgs.total_time_maintenance) as total_time_on_hold

FROM views_mtsk_by_machine_by_day_by_group_status as vmtskmdgs


GROUP BY vmtskmdgs.day_maintenance_task;







-- views_maintenance_duration_total_by_day_by_source
CREATE VIEW views_maintenance_duration_total_by_day_by_source AS

SELECT vmtskmdgss.day_maintenance_task,
vmtskmdgss.source,
SUM(vmtskmdgss.max_offline_duration) as total_offline_duration,
SUM(vmtskmdgss.total_time_maintenance) as total_time_maintenance,
SUM(vmtskmdgss.max_offline_duration) - SUM(vmtskmdgss.total_time_maintenance) as total_time_on_hold

FROM views_mtsk_by_machine_by_day_by_group_status_by_source as vmtskmdgss


GROUP BY vmtskmdgss.day_maintenance_task, vmtskmdgss.source;








-- views_mtsk_unplanned
CREATE VIEW views_mtsk_unplanned AS

SELECT vmtskd.*
FROM views_maintenance_task_data as vmtskd
WHERE vmtskd.maintenance_status_id IN (2,3,4)
AND lower(vmtskd.source) = 'manuel'
ORDER BY vmtskd.created_at ASC;








--- views_uplanned_brakedown_records
CREATE VIEW views_uplanned_brakedown_records as

SELECT mtsk.day_maintenance_task, mtsk.date_hour_maintenance_task, count(mtsk.*) as total_unplanned_tickets
FROM views_uplanned_brakedown_records as mtsk

GROUP BY mtsk.day_maintenance_task,
mtsk.date_hour_maintenance_task

ORDER BY mtsk.day_maintenance_task DESC,
mtsk.date_hour_maintenance_task ASC;