from src.handlers.basic_handler import BasicHandler


def test_convert_order_numbers_to_list():
    handler = BasicHandler()
    order_numbers = "123,456,789"
    result = handler._convert_order_numbers_to_list(order_numbers)
    expected_result = ["123", "456", "789"]

    assert result == expected_result
