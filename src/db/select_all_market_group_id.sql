WITH target_id  AS (
	SELECT market_group_id 
	FROM items 
	WHERE name = 'Carbon Compounds'
)
SELECT 
	name,
	average_price 
FROM items 
WHERE market_group_id = (
	SELECT market_group_id 
	FROM target_id
)