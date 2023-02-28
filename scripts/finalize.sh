if [ -n "${MYSQL_ID}" ] && [ -n "${MYSQL_PASSWORD}" ]
then
	mysql -u${MYSQL_ID} -p${MYSQL_PASSWORD} < scripts/drop.sql
fi