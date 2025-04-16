import io

import pandas as pd
from fastapi import APIRouter, File, Form, UploadFile
from fastapi_utils.cbv import cbv

from src.handlers.basic_handler import BasicHandler

router = APIRouter()


@cbv(router)
class AirateIncorrectProfitsHandler(BasicHandler):

    @router.post("/")
    def handle(
        self,
        order_numbers: str = Form(...),
        sheet_number: str = Form(...),
        skip_rows: str = Form(...),
        file: UploadFile = File(...),
    ) -> None:

        sheet_number = int(sheet_number) - 1
        skip_rows = int(skip_rows)
        converters = {"ID заказа": str}

        df = self._get_dataframe(io.BytesIO(file.file.read()), sheet_number, skip_rows, converters)
        order_numbers = self._convert_order_numbers_to_list(order_numbers)

        changes = self._get_changes(df, order_numbers)

        filename = "stats-admin-airate-fixed-profits.csv"
        file = self._put_changes_to_output_file(changes)

        return self._return_csv_file(file, filename)

    @staticmethod
    def _get_changes(df: pd.DataFrame, order_numbers: list) -> list[dict]:
        changes = []

        for _, row in df.iterrows():
            order_number = row["ID заказа"]

            if order_number not in order_numbers:
                continue

            price = round(row["Оплаченная стоимость"], 2)
            profit = round(row["КОМИССИЯ"], 2)

            if profit == 0.0:
                state = "cancelled"

            else:
                state = "paid"

            changes.append({"order_number": order_number, "price": price, "profit": profit, "state": state})

        return changes
