


-- mechanical_unplanned_maintenance_tasks with line label
SELECT vmtsku.*, lin.line_label, mch.machine_label,
owner_empl.emp_name as owner_empl_name,
repairer_empl.emp_name as repairer_empl_name,
status_maintenance.label as status_maintenance_label

FROM views_mtsk_unplanned as vmtsku
LEFT JOIN lines as lin on lin.line_id = vmtsku.line_id
LEFT JOIN machines as mch on mch.machine_id = vmtsku.machine_id
LEFT JOIN employees as owner_empl on owner_empl.emp_id = vmtsku.owner_id
LEFT JOIN employees as repairer_empl on repairer_empl.emp_id = vmtsku.repared_by
LEFT JOIN status_maintenances as status_maintenance on status_maintenance.status_maintenance_id = vmtsku.maintenance_status_id


WHERE department_id = 3


-- total_mechanical_unplanned_maintenance_task
SELECT count(*) as total_mechanical_unplanned_maintenance_task
FROM views_mtsk_unplanned
WHERE department_id = 3




-- mechanical_unplanned_maintenance_tasks with line label
SELECT vmtsku.*, lin.line_label, mch.machine_label,
owner_empl.emp_name as owner_empl_name,
repairer_empl.emp_name as repairer_empl_name,
status_maintenance.label as status_maintenance_label


FROM views_mtsk_unplanned as vmtsku
LEFT JOIN lines as lin on lin.line_id = vmtsku.line_id
LEFT JOIN machines as mch on mch.machine_id = vmtsku.machine_id
LEFT JOIN employees as owner_empl on owner_empl.emp_id = vmtsku.owner_id
LEFT JOIN employees as repairer_empl on repairer_empl.emp_id = vmtsku.repared_by
LEFT JOIN status_maintenances as status_maintenance on status_maintenance.status_maintenance_id = vmtsku.maintenance_status_id

WHERE department_id = 4




-- total_electronic_unplanned_maintenance_task
SELECT count(*) as total_electronic_unplanned_maintenance_task
FROM views_mtsk_unplanned
WHERE department_id = 4



-- stats_break_down_per_maintenance_template
SELECT mt.*, count(mt.maintenance_template_id) as total_opened_maintenance_tasks
FROM maintenance_templates as mt
LEFT JOIN views_maintenance_task_data as vmtskd on vmtskd.maintenance_template_id = mt.maintenance_template_id
WHERE mt.active = 'Y'
GROUP BY mt.maintenance_template_id
ORDER BY mt.departement_id




-- views_stats_break_down_per_maintenance_template
SELECT mt.*, count(mt.maintenance_template_id) as total_opened_maintenance_tasks, SUM(vmtskd.offline_duration) as total_break_down_time
FROM maintenance_templates as mt
LEFT JOIN views_maintenance_task_data as vmtskd on vmtskd.maintenance_template_id = mt.maintenance_template_id
WHERE mt.active = 'Y'
GROUP BY mt.maintenance_template_id
ORDER BY count(mt.maintenance_template_id) DESC


-- views_stats_break_down_per_machine_type
SELECT mtp.*, count(vmtskd.*) as total_tickets_opened, SUM(vmtskd.offline_duration) as total_break_down_time
FROM machines as mch
LEFT JOIN views_maintenance_task_data as vmtskd on mch.machine_id = vmtskd.machine_id
LEFT JOIN machine_types as mtp on mtp.machine_type_id = mch.machine_type_id
WHERE mch.active = 'Y'
GROUP BY mtp.machine_type_id
ORDER BY count(vmtskd.*) DESC




-- stats_top_machine_failure
SELECT mch.*, count(vmtskd.*) as total_tickets_opened, SUM(vmtskd.offline_duration) as total_break_down_time, lin.line_label
FROM machines as mch
JOIN views_maintenance_task_data as vmtskd on mch.machine_id = vmtskd.machine_id
LEFT JOIN lines as lin on lin.line_id = mch.line_id
WHERE mch.active = 'Y'
GROUP BY mch.machine_id, lin.line_id
ORDER BY (CASE WHEN SUM(vmtskd.offline_duration) IS NULL THEN 0 ELSE 1 END) DESC, SUM(vmtskd.offline_duration) DESC, count(vmtskd.*) DESC








---- stats produce quantity
SELECT
SUM(min_quantity_produced) as quantity_produced,
SUM(quantity_in_production) - SUM(min_quantity_produced) as quantity_in_production,
SUM(bundle_qte) as all_quantities

FROM views_production_data





---- state uplanned_brakedown_records by day
SELECT vubr.*
FROM views_uplanned_brakedown_records as vubr
WHERE vubr.day_maintenance_task = '20190509'
ORDER BY vubr.date_hour_maintenance_task ASC







SELECT SUM(vmtskd.total_time_maintenance) as total_time_maintenance,
SUM(vmtskd.offline_duration) as offline_duration,
COUNT(vmtskd.*) as total_tickets,
SUM(vmtskd.offline_duration) - SUM(vmtskd.total_time_maintenance) as on_hold_duration,
vmtskd.day_maintenance_task

FROM views_maintenance_task_data as vmtskd

WHERE vmtskd.day_maintenance_task = '20190510'

GROUP BY vmtskd.day_maintenance_task





---- stats mtsk_onhold_under_repair
SELECT SUM(vmtskd.total_time_maintenance) as total_time_maintenance,
SUM(vmtskd.offline_duration) as offline_duration,
COUNT(vmtskd.*) as total_tickets,
SUM(vmtskd.offline_duration) - SUM(vmtskd.total_time_maintenance) as on_hold_duration,
vmtskd.day_maintenance_task,
vmtskd.source

FROM views_maintenance_task_data as vmtskd

WHERE vmtskd.day_maintenance_task = '20190510'

GROUP BY vmtskd.day_maintenance_task, vmtskd.source


---- stats mtsk_unplanned
SELECT mtsk.*, sm.label as label_status
	FROM public.views_mtsk_unplanned as mtsk
LEFT JOIN status_maintenances as sm on sm.status_maintenance_id = mtsk.maintenance_status_id
where mtsk.date_hour_maintenance_task = '2019051008' and line_id =1



----get planned/unplanned by source
SELECT t01.source as source,t01.day_maintenance_task, count(t01.*) as total_tickets
FROM views_mtsk_by_machine_by_day_by_group_status_by_source as t01
WHERE t01.day_maintenance_task = '20190510'
GROUP BY t01.source, t01.day_maintenance_task






--get total_break_down and tolal_run_time
SELECT T_G.offline_duration as total_break_down_duration, (T_G.total_time_login * T_G.total_machines) as total_run_time
FROM (SELECT SUM(t01.offline_duration) as offline_duration,
date_part('epoch'::text, CURRENT_TIMESTAMP) - (date_part('epoch'::text, now()::date) + (8 * 3600)) as total_time_login,
count(mch.*) as total_machines


FROM views_maintenance_task_data as t01
LEFT JOIN machines as mch on mch.active = 'Y' and 1=1

WHERE t01.day_maintenance_task = '20190510') AS T_G




-----get views_uplanned_brakedown_records
SELECT count(t01.*), t01.day_maintenance_task, t01.date_hour_maintenance_task

FROM views_mtsk_unplanned as t01
WHERE t01.day_maintenance_task = '20190510'

GROUP BY t01.day_maintenance_task, t01.date_hour_maintenance_task

ORDER BY t01.date_hour_maintenance_task ASC
