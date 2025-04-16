from src.handlers.airate_incorrect_profits_handler import AirateIncorrectProfitsHandler


def test_get_changes(mocked_airate_report_dataframe):
    order_numbers = ["123", "456", "567"]
    handler = AirateIncorrectProfitsHandler()

    result = handler._get_changes(mocked_airate_report_dataframe, order_numbers)
    expected_result = [
        {"order_number": "123", "price": 10000.00, "profit": 100.0, "state": "paid"},
        {"order_number": "456", "price": 40000.00, "profit": 400, "state": "paid"},
        {"order_number": "567", "price": 50000.00, "profit": 0.0, "state": "cancelled"},
    ]

    assert result == expected_result
