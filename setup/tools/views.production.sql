DROP VIEW IF EXISTS views_production_data;


-- views views_production_data

CREATE VIEW views_production_data AS

SELECT b.bundle_id,
b.bundle_qte as bundle_qte,
SUM(op.quantity) as operations_quantity,
count(op.operation_id) as operations_count,
MIN(cpo.quantity) as min_quantity_produced,
MAX(cpo.quantity) as max_quantity_produced,
max(cpo2.quantity) AS quantity_in_production,
SUM(cpo.finished) as total_finished,
CASE WHEN SUM(cpo.finished) = count(op.operation_id) THEN 1 ELSE 0 END as operations_finished

FROM bundles as b
LEFT JOIN operations as op on op.bundle_id = b.bundle_id and op.active = 'Y'
LEFT JOIN cart_pending_operations as cpo on op.operation_id = cpo.operation_id and cpo.active = 'Y'
LEFT JOIN cart_pending_operations cpo2 ON op.operation_id = cpo2.operation_id AND cpo2.active = 'Y'::text AND cpo2.finished = 0

WHERE b.active = 'Y'
GROUP BY b.bundle_id, b.bundle_qte

















SELECT vcpsd.cart_pendingoperation_id,
SUM(vcpsd.quantity) as total_op_quantity,
vcpsd.date_operation,
vcpsd.date_hour_operation,
cpo.bundle_id

FROM views_cps_data as vcpsd

LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = 'Y'

WHERE vcpsd.date_operation = '20190516'

GROUP BY vcpsd.date_operation,
vcpsd.cart_pendingoperation_id,
vcpsd.date_hour_operation,
cpo.bundle_id

ORDER BY  vcpsd.date_hour_operation ASC, vcpsd.cart_pendingoperation_id ASC

















-- query productivity by bundle by operation
SELECT vcpsd.cart_pendingoperation_id,
SUM(vcpsd.quantity) as total_op_quantity,
vcpsd.date_operation,
vcpsd.date_hour_operation,
cpo.bundle_id,
cpo.operation_id


FROM views_cps_data as vcpsd

LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = 'Y'

WHERE vcpsd.date_operation = '20190516'

GROUP BY vcpsd.date_operation,
vcpsd.cart_pendingoperation_id,
vcpsd.date_hour_operation,
cpo.bundle_id,
cpo.operation_id

ORDER BY  vcpsd.date_hour_operation ASC, cpo.operation_id ASC



--- get operators by cpo_id
SELECT distinct(emp.*)
FROM cart_pending_sessions as cps
INNER JOIN usersessions as us ON cps.cart_pending_session_id = us.usersession_id
INNER JOIN employees as emp ON emp.emp_id = us.employee_id
where cps.cart_pendingoperation_id=73
