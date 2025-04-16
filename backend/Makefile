black:
	poetry run python -m black -t py313 -l 120 --check .

black-fix:
	poetry run python -m black -t py313 -l 120 .

isort:
	poetry run python -m isort -l 120 -c .

isort-fix:
	poetry run python -m isort -l 120 .

lint:
	poetry run ruff check src

lint-fix:
	poetry run ruff format src

test:
	poetry run pytest . -vv --cov=. --cov-report=term

all-prep:
	clear && make black-fix && make isort-fix && make lint && make test

all-sheets:
	poetry run python ./src/core/sheet_generators/raw_aviasales_hotels_sales_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_b2b_sales_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_flight_percentages_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_flight_sales_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_hotellook_sales_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_new_markets_sales_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_ota_sales_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_tp_flight_sales_sheet_generator.py
	poetry run python ./src/core/sheet_generators/raw_tp_hotellook_sales_sheet_generator.py
